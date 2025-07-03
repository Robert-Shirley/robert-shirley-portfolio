import classNames from "@/functions/classNames";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Card from "../shared/Card";

const RockPaperScissors = ({ isComponent }: { isComponent: boolean }) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const { toast } = useToast();
  const fake = "fake";
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const test = true;
  const [result, setResult] = useState("");

  const choices = ["rock", "paper", "scissors"];

  const handleClick = (choice: string) => {
    setPlayerChoice(choice);
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerChoice);

    const toastOptions = !isComponent
      ? {
          className:
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        }
      : {
          className:
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        };

    if (choice === computerChoice) {
      // toast("Tie", {
      //   position: toastOptions.position as any,
      //   className: toastOptions.className,
      // });
      toast({
        title: "Tie",
        description: "It's a tie",
        className: toastOptions.className,
      });
      setResult("Tie");
    } else if (
      (choice === "rock" && computerChoice === "scissors") ||
      (choice === "paper" && computerChoice === "rock") ||
      (choice === "scissors" && computerChoice === "paper")
    ) {
      // toast.success("Win", {
      //   position: toastOptions.position as any,
      //   className: toastOptions.className,
      // });
      toast({
        title: "Win",
        description: "You win!",
        className: toastOptions.className,
      });
      setResult("Win");
      setWins(wins + 1);
    } else {
      // toast.error("Lose", {
      //   position: toastOptions.position as any,
      //   className: toastOptions.className,
      // });
      toast({
        title: "Lose",
        description: "You lose!",
        className: toastOptions.className,
      });
      setResult("Lose");
      setLosses(losses + 1);
    }
  };

  return (
    <Card className="w-fit">
      <div className="flex justify-center flex-col items-center">
        <div>
          {!isComponent && (
            <h1
              className={classNames(
                isComponent ? "text-xl" : "text-3xl",
                "font-bold text-center mb-8"
              )}
            >
              Rock Paper Scissors
            </h1>
          )}
          <div className="flex justify-center gap-6 ">
            <button
              className={classNames(
                " bg-blue-500 text-white rounded-lg ",
                isComponent ? "py-2 px-4 text-md" : "py-4 px-8 text-2xl"
              )}
              onClick={() => handleClick("rock")}
            >
              Rock
            </button>
            <button
              className={classNames(
                " bg-orange-500 text-white rounded-lg ",
                isComponent ? "py-2 px-4 text-md" : "py-4 px-8 text-2xl"
              )}
              onClick={() => handleClick("paper")}
            >
              Paper
            </button>
            <button
              className={classNames(
                " bg-purple-500 text-white rounded-lg ",
                isComponent ? "py-2 px-4 text-md" : "py-4 px-8 text-2xl"
              )}
              onClick={() => handleClick("scissors")}
            >
              Scissors
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-6 items-center my-3">
              <h1 className="text-xl font-bold text-center tracking-tight">
                You:
              </h1>
              <span
                className={classNames(
                  "py-2 px-4  text-white rounded-lg capitalize cursor-not-allowed",
                  playerChoice === "rock" && "bg-blue-500",
                  playerChoice === "paper" && "bg-orange-500",
                  playerChoice === "scissors" && "bg-purple-500"
                )}
              >
                {playerChoice}
              </span>
            </div>
            <div className="flex gap-6 items-center my-3">
              <h1 className="text-xl font-bold text-center tracking-tight">
                Computer:
              </h1>
              <span
                className={classNames(
                  "py-2 px-4  text-white rounded-lg capitalize cursor-not-allowed",
                  computerChoice === "rock" && "bg-blue-500",
                  computerChoice === "paper" && "bg-orange-500",
                  computerChoice === "scissors" && "bg-purple-500"
                )}
              >
                {computerChoice}
              </span>
            </div>
            <div className="border border-gray-300 rounded-lg px-12">
              <div className="flex flex-col justify-start w-fit">
                <div className="flex gap-6 items-center my-3 justify-start">
                  <h1 className="text-xl font-bold text-center tracking-tight">
                    Result:
                  </h1>
                  <span
                    className={classNames(
                      "py-2 px-4  text-white rounded-lg capitalize",
                      result === "Win" && "bg-green-500",
                      result === "Lose" && "bg-red-500",
                      result === "Tie" && "bg-yellow-500"
                    )}
                  >
                    {result === "Lose" ? "Loss" : result}
                  </span>
                </div>
                <div className="flex gap-6 items-center my-3 justify-start">
                  <div className="text-xl font-bold tracking-tight">
                    Wins: {wins}
                  </div>
                </div>
                <div className="flex gap-6 items-center my-3 justify-start">
                  <div className="text-xl font-bold tracking-tight">
                    Losses: {losses}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RockPaperScissors;
