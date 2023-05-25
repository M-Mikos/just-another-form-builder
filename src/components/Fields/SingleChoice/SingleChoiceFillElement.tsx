// Functions & hooks
import { useState } from "react";

// TS Interfaces declaration
interface PropsTypes {
  name: string;
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
}

const SingleChoiceFillElement = (props: PropsTypes): JSX.Element => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [anotherAnswerValue, setAnotherAnswerValue] = useState<string>("");

  const changeHandler = (event): void => setSelectedAnswer(event.target.id);

  const AnotherAnswerChangeHandler = (event): void => {
    setAnotherAnswerValue(event.target.value);
  };

  return (
    <fieldset>
      {props.attributes.options.map((option: string) => {
        return (
          <div key={option} className="mb-2 flex gap-3 text-sm">
            <input
              type="radio"
              id={option}
              name={props.name}
              value={option}
              onChange={changeHandler}
              checked={selectedAnswer === option}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        );
      })}
      {props.attributes.isAnotherAnswerEnabled && (
        <div key="anotherAnswer" className="mb-2 flex gap-3 text-sm">
          <input
            type="radio"
            id="Another answer"
            name={props.name}
            onChange={changeHandler}
            checked={selectedAnswer === "Another answer"}
            {...(anotherAnswerValue && {
              value: anotherAnswerValue,
            })}
          />
          <label htmlFor="Another answer">Another answer</label>
        </div>
      )}
      {selectedAnswer === "Another answer" && (
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
  );
};

export default SingleChoiceFillElement;
