// Functions & hooks
import { useEffect, useState } from "react";

// TS Interfaces declaration
interface PropsTypes {
  name: string;
  attributes: {
    minValue: string;
    maxValue: string;
    minValueLabel: string;
    maxValueLabel: string;
  };
}

const LinearScaleFillElement = (props: PropsTypes): JSX.Element => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {};

  return (
    <>
      <input
        name={props.name}
        type="hidden"
        value={JSON.stringify(answerValuesArray)}
      ></input>

      {/* Fields below are excluded from direct form submission by removing input names. Data obtained from this inputs is controlled by React state. On submit, it is passed to server as JSON via hidden input above*/}

      <fieldset>
        <div className="flex w-full justify-between gap-2">
          {[...Array(Number(maxValue) - Number(minValue) + 1).keys()].map(
            (_, i) => {
              return (
                <>
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-[12px] text-stone-400">
                      {i + Number(minValue)}
                    </span>
                    <div className="h-4 w-4  rounded-full border-2 border-stone-300" />
                  </div>
                </>
              );
            }
          )}
        </div>
        <div className="flex w-full justify-between text-[12px] text-stone-400">
          <div>{minValueLabel}</div>
          <div>{maxValueLabel}</div>
        </div>
      </fieldset>
    </>
  );
};

export default LinearScaleFillElement;
