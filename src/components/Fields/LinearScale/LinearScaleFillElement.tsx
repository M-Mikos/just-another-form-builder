// Functions & hooks
import { useEffect, useRef, useState } from "react";

// TS Interfaces declaration
interface PropsTypes {
  name: string;
  attributes: {
    minValue: string;
    maxValue: string;
    minValueLabel: string;
    maxValueLabel: string;
  };
  required: boolean;
  validate: (isValid: boolean) => void;
}

const LinearScaleFillElement = (props: PropsTypes): JSX.Element => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // Ref to block validation on initial render
  const hasPageBeenRendered = useRef(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedAnswer(event.target.value);
  };

  useEffect((): void => {
    props.required &&
      hasPageBeenRendered.current &&
      (selectedAnswer.length === 0
        ? props.validate(false)
        : props.validate(true));
    hasPageBeenRendered.current = true;
  }, [selectedAnswer]);

  return (
    <>
      <input name={props.name} type="hidden" value={selectedAnswer}></input>

      {/* Fields below are excluded from direct form submission by removing input names. Data obtained from this inputs is controlled by React state. On submit, it is passed to server via hidden input above*/}

      <fieldset>
        <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div className="w-20 break-words text-[12px] text-stone-400 sm:text-right">
            {props.attributes.minValueLabel && props.attributes.minValueLabel}
          </div>
          {[
            ...Array(
              Number(props.attributes.maxValue) -
                Number(props.attributes.minValue) +
                1
            ).keys(),
          ].map((_, i) => {
            return (
              <fieldset key={i}>
                <label className=" flex items-center gap-2 sm:flex-col">
                  <input
                    type="radio"
                    onChange={changeHandler}
                    className="h-4 w-4 border-2"
                    value={i}
                    checked={selectedAnswer === i.toString()}
                  />
                  <span className="pointer-events-none text-[12px] text-stone-400">
                    {i + Number(props.attributes.minValue)}
                  </span>
                </label>
              </fieldset>
            );
          })}
          <div className="w-20 break-words text-[12px] text-stone-400">
            {props.attributes.maxValueLabel && props.attributes.maxValueLabel}
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default LinearScaleFillElement;
