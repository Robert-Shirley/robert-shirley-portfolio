"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionsData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export function GitContributions({ username }: { username: string }) {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`/api/github-stats?username=${username}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch GitHub data: ${response.statusText}`
          );
        }
        const contributionsData = await response.json();
        setData(contributionsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load GitHub stats"
        );
        console.error("GitHub stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading GitHub activity...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-4 py-4">
      {/* Stats Summary */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Total Contributions in the last year
          </p>
          <p className="text-2xl font-bold text-green-700">
            {data.totalContributions.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="overflow-x-auto">
        <div className="relative py-2 min-w-[800px]">
          {/* Days of week labels */}

          {/* Contribution grid */}
          <div className="ml-8 inline-flex gap-1">
            {data.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = week.contributionDays[dayIndex];
                  if (!day) {
                    return (
                      <div
                        key={dayIndex}
                        className="w-3 h-3 rounded-sm bg-gray-100"
                      />
                    );
                  }

                  const level = getContributionLevel(day.contributionCount);
                  const date = new Date(day.date).toLocaleDateString(
                    undefined,
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  );

                  return (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getColorClass(
                        level
                      )} transition-colors duration-200 hover:ring-2 hover:ring-offset-1 hover:ring-blue-400`}
                      title={`${day.contributionCount} contribution${
                        day.contributionCount !== 1 ? "s" : ""
                      } on ${date}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Contribution Level Legend */}
          <div className="mt-12 flex items-center gap-2 text-xs text-gray-600">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function getColorClass(level: number): string {
  switch (level) {
    case 0:
      return "bg-gray-100";
    case 1:
      return "bg-green-200";
    case 2:
      return "bg-green-300";
    case 3:
      return "bg-green-400";
    case 4:
      return "bg-green-500";
    default:
      return "bg-gray-100";
  }
}
