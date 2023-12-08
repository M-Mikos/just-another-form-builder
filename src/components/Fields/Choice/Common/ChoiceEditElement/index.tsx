// Functions & hooks
import { useState } from "react";

// Components
import Option from "./Option";

// TS Interfaces declaration
interface PropsTypes {
  inputType: "SingleChoice" | "MultipleChoice";
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
}

const ChoiceEditElement = (props: PropsTypes): JSX.Element => {
  const [options, setOptions] = useState<string[]>(
    props.attributes?.options ? props.attributes.options : ["Option 1"]
  );
  const [isAnotherAnswerEnabled, setIsAnotherAnswerEnabled] = useState<boolean>(
    props.attributes?.isAnotherAnswerEnabled
      ? props.attributes.isAnotherAnswerEnabled
      : false
  );

  const addOptionHandler = (): void => {
    setOptions((state) => {
      let optionNumber = 1;

      // Loop generates name suffix to prevent default option name repetition
      while (options.includes(`Option ${optionNumber}`)) {
        optionNumber++;
      }

      return state.concat(`Option ${optionNumber}`);
    });
  };

  const toggleAnotherAnswer = (): void => {
    console.log("another anwer toggled");
    setIsAnotherAnswerEnabled((state) => {
      return !state;
    });
  };

  return (
    <>
      <input
        name="attributes"
        type="hidden"
        value={JSON.stringify({ options, isAnotherAnswerEnabled })}
      ></input>
      <div className="my-2 -ml-2">
        <ul className="flex flex-col gap-1">
          {options.map((option) => {
            return (
              <Option
                key={option}
                option={option}
                allOptions={options}
                setOptions={setOptions}
                inputType={props.inputType}
              />
            );
          })}
        </ul>
        {isAnotherAnswerEnabled && (
          <div className="mt-2 flex gap-2">
            <div className="input-text pointer-events-none text-stone-400 hover:bg-white">
              Another answer...
            </div>

            <button className="btn--light" onClick={toggleAnotherAnswer}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 text-sm text-stone-500 sm:flex-row">
        <button className="btn--light text-sky-700" onClick={addOptionHandler}>
          Add next option
        </button>
        {!isAnotherAnswerEnabled && (
          <div className="flex items-center gap-4">
            <span> or </span>
            <button
              className="btn--light text-sky-700"
              onClick={toggleAnotherAnswer}
            >
              Add "Another answer..."
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChoiceEditElement;
