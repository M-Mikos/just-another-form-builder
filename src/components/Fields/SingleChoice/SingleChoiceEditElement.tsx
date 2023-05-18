import { useState } from "react";

const SingleChoiceEditElement = (): JSX.Element => {
  const [options, setOptions] = useState<string[]>(["Option 1"]);
  const [isAnotherEnabled, setIsAnotherEnabled] = useState<boolean>(false);

  const addOptionHandler = (): void => {
    setOptions((state) => {
      return state.concat(`Option ${state.length + 1}`);
    });
  };

  const toggleAnother = (): void => {
    setIsAnotherEnabled((state) => {
      return !state;
    });
  };

  const onInputChange = (event, option) => {
    if (options.includes(event.target.value))
      console.log("wyświetl komunikat (nie może być tak samo)");
  };

  const onInputBlur = (event, option) => {
    if (event.target.value === "" || options.includes(event.target.value)) {
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
      <ul>
        {options.map((option) => {
          return (
            <div className="flex gap-2" key={option}>
              <input
                className="input-text"
                defaultValue={option}
                onChange={(event) => {
                  onInputChange(event, option);
                }}
                onBlur={(event) => {
                  onInputBlur(event, option);
                }}
              />
              {options.length > 1 && (
                <button className="btn--light">
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>
          );
        })}
      </ul>
      {isAnotherEnabled && (
        <div className="flex gap-2">
          <div className="input-text pointer-events-none text-stone-400 hover:bg-white">
            Another answer...
          </div>

          <button className="btn--light" onClick={toggleAnother}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}
      <div>
        <button className="btn--light" onClick={addOptionHandler}>
          Add next option
        </button>
        {!isAnotherEnabled && (
          <>
            <span> or </span>
            <button className="btn--light" onClick={toggleAnother}>
              Add "another"
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SingleChoiceEditElement;
