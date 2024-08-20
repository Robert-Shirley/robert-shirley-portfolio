import classNames from "@/functions/classNames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type EtchASketchProps = {
  isComponent: boolean;
};

const EtchASketch = ({ isComponent }: EtchASketchProps) => {
  const [size, setSize] = useState(16);
  const [newSize, setNewSize] = useState(16);
  const [color, setColor] = useState("black");
  const [click, setClick] = useState(false);
  const [modeText, setModeText] = useState(
    "Not Coloring, click to start coloring"
  );
  const [squares, setSquares] = useState(Array(16 * 16).fill("white"));

  // Update the board size and reset the colors when size changes
  useEffect(() => {
    setSquares(Array(size * size).fill("white"));
  }, [size]);

  const colorSquare = (index: number) => {
    if (click) {
      const newSquares = [...squares];
      newSquares[index] =
        color === "random" ? `hsl(${Math.random() * 360}, 100%, 50%)` : color;
      setSquares(newSquares);
    }
  };

  const changeSize = (input: string) => {
    const newSize = parseInt(input);
    if (newSize >= 2 && newSize <= 100) {
      setSize(newSize);
      toast.success("Board Size Changed!", {
        position: "top-center",
      });
    } else {
      toast.error("Input must be between 2 and 100", {
        position: "top-center",
      });
    }
  };

  const resetBoard = () => {
    setSquares(Array(size * size).fill("white"));
  };

  useEffect(() => {
    let text = "";

    if (color === "black") {
      text = text + "Coloring with Black";
    } else if (color === "white") {
      text = text + "Erasing";
    } else if (color === "gray") {
      text = text + "Coloring with Gray";
    } else if (color === "random") {
      text = text + "Coloring with Random";
    }
    if (!click) {
      if (color === "white") {
        text = "Not Erasing, click to start erasing";
      } else {
        text = "Not Coloring, click to start coloring";
      }
    }

    setModeText(text);
  }, [click, color]);

  return (
    <>
      <div className="block sm:hidden">
        Sorry, due to the nature of this component, it is not available on
        mobile devices.
      </div>
      <div
        className="hidden sm:flex border border-gray-300 rounded-lg flex-col items-center min-h-fit p-4"
        onClick={() => setClick(!click)}
      >
        <div className="text-lg text-gray-600 w-full text-center">
          <div>
            {size} x {size}
          </div>
          <div>{modeText}</div>
        </div>

        <div className="flex flex-col items-center w-72 h-72">
          <div
            className="w-full h-full grid bg-white shadow-sm border border-gray-300 "
            style={{
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              gridTemplateRows: `repeat(${size}, 1fr)`,
            }}
          >
            {squares.map((squareColor, index) => (
              <div
                key={index}
                className="border border-gray-100 border-opacity-40"
                style={{ backgroundColor: squareColor }}
                onMouseOver={() => colorSquare(index)}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex gap-6 flex-wrap px-6 my-6 w-full justify-center">
          <button
            className={classNames(
              " p-2 rounded-lg border border-black",
              color === "black" && "bg-black text-white"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setColor("black");
              setClick(true);
            }}
          >
            Black
          </button>
          <button
            className={classNames(
              " p-2 rounded-lg border ",
              color === "white"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setClick(true);
              setColor("white");
            }}
          >
            Eraser
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setColor("gray");
              setClick(true);
            }}
            className={classNames(
              " p-2 rounded-lg border ",
              color === "gray"
                ? "bg-gray-700 text-white"
                : "bg-gray-400 text-gray-700"
            )}
          >
            Gray
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setColor("random");
              setClick(true);
            }}
            className={classNames(
              "p-2 rounded-lg border ",
              color === "random"
                ? "bg-red-700 text-white"
                : "bg-sky-400 text-emerald-700"
            )}
          >
            Random
          </button>
          <button
            className="p-2 rounded-lg border border-gray-300 text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              resetBoard();
            }}
          >
            Reset Board
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="size" className="text-gray-600">
            Size of Board:
          </label>
          <input
            type="text"
            placeholder="Size of Board"
            className="border border-gray-300 rounded-lg placeholder:text-gray-700 text-gray-700 px-4 py-2"
            value={newSize}
            onChange={(e) => setNewSize(parseInt(e.target.value))}
          />
          <div className="w-full flex justify-center">
            <button
              className="p-2 w-fit mt-2 rounded-lg border border-gray-300 bg-emerald-700 text-white hover:bg-emerald-800"
              onClick={(e) => {
                e.stopPropagation();
                changeSize(newSize.toString());
              }}
            >
              Change Size
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EtchASketch;
