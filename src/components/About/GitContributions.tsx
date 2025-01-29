// app/about/GitContributions.tsx
"use client";

import { useEffect, useState } from "react";

interface ContributionsData {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
    }[];
  }[];
}

export function GitContributions({ username }: { username: string }) {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`/api/github-stats?username=${username}`);
        if (!response.ok) throw new Error("Failed to fetch GitHub data");
        const contributionsData = await response.json();
        setData(contributionsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load GitHub stats"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) return <div>Loading GitHub activity...</div>;
  if (error) return <div>Failed to load GitHub activity</div>;
  if (!data) return null;

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Total Contributions in the last year
          </p>
          <p className="text-2xl font-bold text-green-700">
            {data.totalContributions}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="relative py-2">
          {/* Days of week labels */}

          {/* Contribution grid */}
          <div className="ml-6 inline-flex gap-1">
            {data.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = week.contributionDays[dayIndex];
                  if (!day)
                    return (
                      <div
                        key={dayIndex}
                        className="w-3 h-3 rounded-sm bg-gray-100"
                      />
                    );

                  const level = getContributionLevel(day.contributionCount);
                  return (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
                      title={`${
                        day.contributionCount
                      } contributions on ${new Date(
                        day.date
                      ).toLocaleDateString()}`}
                    />
                  );
                })}
              </div>
            ))}
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
