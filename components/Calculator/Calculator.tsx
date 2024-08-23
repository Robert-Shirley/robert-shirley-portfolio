import classNames from "@/functions/classNames";
import { useEffect, useState } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  type: string;
};

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "number flex w-12 h-12 justify-center items-center m-1 font-bold py-2 px-2 hover:border-transparent rounded text-white border-2 text-2xl cursor-pointer",
        type === "number" && "hover:bg-green-500 border-green-500",
        type === "clear" && "hover:bg-orange-500 border-orange-500",
        type === "operator" && "hover:bg-blue-500 border-blue-500",
        type === "decimal" && "hover:bg-yellow-500 border-yellow-500",
        type === "equal" && "hover:bg-red-500 border-red-500"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

type CalculatorProps = {
  isComponent: boolean;
};

const Calculator = ({ isComponent }: CalculatorProps) => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [prevNumber, setPrevNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [keypressEnabled, setKeypressEnabled] = useState(!isComponent);

  useEffect(() => {
    if (!keypressEnabled) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      if (/\d/.test(e.key)) {
        appendNumber(e.key);
      }
      if (e.key === "Enter" || e.key === "=") {
        compute();
      }
      if (["+", "-", "*", "/"].includes(e.key)) {
        chooseOperator(e.key === "*" ? "x" : e.key);
      }
      if (e.key === ".") {
        addDecimal();
      }
      if (e.key === "Backspace") {
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentNumber, prevNumber, operator, keypressEnabled]);

  const roundNumber = (num: number) => Math.round(num * 100000) / 100000;

  const compute = () => {
    let computation;
    const prev = parseFloat(prevNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    setCurrentNumber(roundNumber(computation).toString());
    setPrevNumber("");
    setOperator("");
  };

  const clear = () => {
    setCurrentNumber("0");
    setPrevNumber("");
    setOperator("");
  };

  const appendNumber = (number: string) => {
    if (currentNumber === "0" && number !== ".") {
      setCurrentNumber(number);
    } else {
      setCurrentNumber(currentNumber + number);
    }
  };

  const chooseOperator = (op: string) => {
    if (currentNumber === "" && prevNumber === "") return; // Prevents action if no number is entered
    if (currentNumber === "" && prevNumber !== "") {
      setOperator(op); // Allows changing the operator without resetting the number
      return;
    }

    if (prevNumber !== "") {
      compute(); // Compute the previous operation before setting a new operator
    }
    setOperator(op);
    setPrevNumber(currentNumber);
    setCurrentNumber(""); // Keep current number empty until a new number is entered
  };

  const addDecimal = () => {
    if (!currentNumber.includes(".")) {
      setCurrentNumber(currentNumber + ".");
    }
  };

  const handleDelete = () => {
    setCurrentNumber(currentNumber.slice(0, -1) || "0");
  };

  return (
    <div>
      {isComponent && (
        <div className="w-full flex justify-center my-2">
          <button
            className={classNames(
              " text-white font-bold py-2 px-4 rounded",
              keypressEnabled ? "bg-red-800" : "bg-green-500"
            )}
            onClick={() => setKeypressEnabled(!keypressEnabled)}
          >
            {keypressEnabled ? "Disable" : "Enable"} Keypress
          </button>
        </div>
      )}
      <div className="max-w-lg rounded overflow-hidden shadow-2xl bg-pink-700 bg-opacity-75 bg-gradient-to-tr from-gray-800 flex">
        <div className="px-8 py-8">
          <div className="flex mb-1 justify-end">
            <div className="flex flex-col w-3/4 h-12 justify-center items-end m-1 bg-gray-300 text-gray-900 font-semibold px-2 border border-black hover:border-gray-500 rounded">
              <div className="flex max-w-lg h-1/3 pb-5 pt-1 text-gray-600 text-xs">
                {prevNumber} {operator}
              </div>
              <div className="flex max-w-lg h-2/3 pb-2 text-xl">
                {currentNumber}
              </div>
            </div>
            <Button
              type="clear"
              onClick={() => {
                clear();
              }}
            >
              AC
            </Button>
          </div>
          <div className="flex mb-1">
            <Button
              type="number"
              onClick={() => {
                appendNumber("7");
              }}
            >
              7
            </Button>
            <Button
              type="number"
              onClick={() => {
                appendNumber("8");
              }}
            >
              8
            </Button>
            <Button
              type="number"
              onClick={() => {
                appendNumber("9");
              }}
            >
              9
            </Button>
            <Button
              type="operator"
              onClick={() => {
                chooseOperator("/");
              }}
            >
              /
            </Button>
          </div>
          <div className="flex mb-1">
            <Button
              type="number"
              onClick={() => {
                appendNumber("4");
              }}
            >
              4
            </Button>
            <Button
              type="number"
              onClick={() => {
                appendNumber("5");
              }}
            >
              5
            </Button>
            <Button
              type="number"
              onClick={() => {
                appendNumber("6");
              }}
            >
              6
            </Button>

            <Button
              type="operator"
              onClick={() => {
                +chooseOperator("x");
              }}
            >
              x
            </Button>
          </div>
          <div className="flex mb-1">
            <Button
              type="number"
              onClick={() => {
                appendNumber("1");
              }}
            >
              1
            </Button>
            <Button
              type="number"
              onClick={() => {
                appendNumber("2");
              }}
            >
              2
            </Button>
            <Button
              type="number"
              onClick={() => {
                +appendNumber("3");
              }}
            >
              3
            </Button>
            <Button
              type="operator"
              onClick={() => {
                chooseOperator("-");
              }}
            >
              -
            </Button>
          </div>
          <div className="flex mb-1">
            <Button
              type="decimal"
              onClick={() => {
                addDecimal();
              }}
            >
              .
            </Button>
            <Button
              type="number"
              onClick={() => {
                appendNumber("0");
              }}
            >
              0
            </Button>
            <Button
              type="equal"
              onClick={() => {
                compute();
              }}
            >
              =
            </Button>
            <Button
              type="operator"
              onClick={() => {
                chooseOperator("+");
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
