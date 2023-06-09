// Functions & hooks
import { useEffect, useState } from "react";

// TS Interfaces declaration
interface PropsTypes {
  name: string;
  inputType: "SingleChoice" | "MultipleChoice";
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
}

const ChoiceFillElement = (props: PropsTypes): JSX.Element => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [anotherAnswerValue, setAnotherAnswerValue] = useState<string>("");
  const [answerValuesArray, setAnswerValuesArray] = useState<string[]>([]);
  const inputElementType =
    props.inputType === "SingleChoice" ? "radio" : "checkbox";

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.inputType === "SingleChoice" && setSelectedAnswers([event.target.id]);

    props.inputType === "MultipleChoice" &&
      setSelectedAnswers((state: string[]): string[] => {
        const newState = [...state];
        const index = state.indexOf(event.target.id);
        if (index === -1) {
          newState.push(event.target.id);
        } else {
          newState.splice(index, 1);
        }
        return newState;
      });
  };

  const AnotherAnswerChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAnotherAnswerValue(event.target.value);
  };

  // Create answers array including another answer value
  useEffect((): void => {
    let answersValues: string[] = [];
    if (selectedAnswers.includes("Another answer")) {
      // add another answer value to the array
      answersValues = [...selectedAnswers, anotherAnswerValue];
      // remove "Another answer" string from the array
      const index: number = selectedAnswers.indexOf("Another answer");
      answersValues.splice(index, 1);
    } else {
      answersValues = [...selectedAnswers];
    }
    setAnswerValuesArray(answersValues);
  }, [selectedAnswers, anotherAnswerValue]);

  return (
    <>
      <input
        name={props.name}
        type="hidden"
        value={JSON.stringify(answerValuesArray)}
      ></input>

      {/* Fields below are excluded from direct form submission by removing input names. Data obtained from this inputs is controlled by React state. On submit, it is passed to server as JSON via hidden input above*/}

      <fieldset>
        {props.attributes.options.map((option: string) => {
          return (
            <label
              key={option}
              className="mb-2 flex items-center gap-3 text-sm"
            >
              <input
                className="h-4 w-4"
                type={inputElementType}
                id={option}
                value={option}
                onChange={changeHandler}
                checked={selectedAnswers.includes(option)}
              />
              {option}
            </label>
          );
        })}
        {props.attributes.isAnotherAnswerEnabled && (
          <label key="anotherAnswer" className="mb-2 flex gap-3 text-sm">
            <input
              type={inputElementType}
              id="Another answer"
              onChange={changeHandler}
              checked={selectedAnswers.includes("Another answer")}
              {...(anotherAnswerValue && {
                value: anotherAnswerValue,
              })}
            />
            Another answer
          </label>
        )}
        {selectedAnswers.includes("Another answer") && (
          <input
            placeholder="Type another answer here..."
            className="input-text"
            autoComplete="off"
            type="text"
            required={true}
            onChange={AnotherAnswerChangeHandler}
            value={anotherAnswerValue}
          />
        )}
      </fieldset>
    </>
  );
};

export default ChoiceFillElement;
