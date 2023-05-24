import { useState } from "react";
import Option from "./Option";

const SingleChoiceEditElement = (): JSX.Element => {
  const [options, setOptions] = useState<string[]>(["Option 1"]);
  const [isAnotherAnswerEnabled, setIsAnotherAnswerEnabled] =
    useState<boolean>(false);

  const addOptionHandler = (): void => {
    setOptions((state) => {
      let optionNumber = 1;

      // Loop iterates to prevent default option name repetition
      while (options.includes(`Option ${optionNumber}`)) {
        optionNumber++;
      }

      return state.concat(`Option ${optionNumber}`);
    });
  };

  const toggleAnotherAnswer = (): void => {
    setIsAnotherAnswerEnabled((state) => {
      return !state;
    });
  };

  return (
    <>
      <div className="-ml-2 mb-4">
        <ul>
          {options.map((option) => {
            return (
              <Option
                key={option}
                option={option}
                allOptions={options}
                setOptions={setOptions}
              />
            );
          })}
        </ul>
        {isAnotherAnswerEnabled && (
          <div className="flex gap-2">
            <div className="input-text pointer-events-none text-stone-400 hover:bg-white">
              Another answer...
            </div>

            <button className="btn--light" onClick={toggleAnotherAnswer}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-stone-500">
        <button className="btn--light text-sky-700" onClick={addOptionHandler}>
          Add next option
        </button>
        {!isAnotherAnswerEnabled && (
          <>
            <span> or </span>
            <button
              className="btn--light text-sky-700"
              onClick={toggleAnotherAnswer}
            >
              Add "Another answer..."
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SingleChoiceEditElement;
