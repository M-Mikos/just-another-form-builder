import { useState } from "react";

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

  const deleteOptionHandler = (option: string): void => {
    setOptions((state) => {
      return state.filter((item) => item !== option);
    });
  };

  const toggleAnotherAnswer = (): void => {
    setIsAnotherAnswerEnabled((state) => {
      return !state;
    });
  };

  const onInputChangeHandler = (event, option: string): void => {
    if (options.includes(event.target.value))
      console.log("wyświetl komunikat (nie może być tak samo)");
  };

  const onInputBlurHandler = (event, option: string): void => {
    console.log("blur");
    if (event.target.value === "") {
      console.log("źle");
      return;
    }
    setOptions((state) => {
      const i = options.indexOf(option);
      const newState = [...state];
      newState[i] = event.target.value;
      return newState;
    });
  };

  return (
    <>
      <div className="-ml-2 mb-4">
        <ul>
          {options.map((option) => {
            return (
              <div className="flex h-10 gap-2" key={option}>
                <input
                  className="input-text border-b-0"
                  defaultValue={option}
                  onChange={(event) => {
                    onInputChangeHandler(event, option);
                  }}
                  onBlur={(event) => {
                    onInputBlurHandler(event, option);
                  }}
                />
                {options.length > 1 && (
                  <button
                    className="btn--light"
                    onClick={() => {
                      deleteOptionHandler(option);
                    }}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
              </div>
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
