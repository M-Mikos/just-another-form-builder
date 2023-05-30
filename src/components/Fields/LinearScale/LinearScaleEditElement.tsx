// Functions & hooks
import { useState } from "react";

// TS Interfaces declaration
interface PropsTypes {
  attributes: {
    minValue: string;
    maxValue: string;
    minValueLabel: string;
    maxValueLabel: string;
  };
}

const LinearScaleEditElement = (props: PropsTypes): JSX.Element => {
  const [minValue, setMinValue] = useState<string>(
    props.attributes?.minValue ? props.attributes.minValue : "1"
  );
  const [maxValue, setMaxValue] = useState<string>(
    props.attributes?.maxValue ? props.attributes.maxValue : "5"
  );
  const [minValueLabel, setMinValueLabel] = useState<string>(
    props.attributes?.minValueLabel ? props.attributes.minValueLabel : "Label 1"
  );
  const [maxValueLabel, setMaxValueLabel] = useState<string>(
    props.attributes?.maxValueLabel ? props.attributes.maxValueLabel : "Label 1"
  );

  const minValueChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setMinValue(event.target.value);
  };

  const maxValueChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setMaxValue(event.target.value);
  };

  const minValueLabelChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMinValueLabel(event.target.value);
  };

  const maxValueLabelChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMaxValueLabel(event.target.value);
  };

  return (
    <>
      <input
        name="attributes"
        type="hidden"
        value={JSON.stringify({
          minValue,
          maxValue,
          minValueLabel,
          maxValueLabel,
        })}
      ></input>

      {/* Fields below are excluded from direct form submission by removing input names. Data obtained from this inputs is controlled by React state. On submit, it is passed to server as JSON via hidden input above*/}
      <div className="my-2 flex flex-col items-start gap-4 text-sm">
        <div>
          <select
            className=" bg-stone-100 px-3 py-2 hover:bg-stone-200"
            onChange={minValueChangeHandler}
            value={minValue}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
          <span className="mx-4">-</span>
          <select
            className=" bg-stone-100 px-3 py-2 hover:bg-stone-200"
            onChange={maxValueChangeHandler}
            value={maxValue}
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(
              (number: number): JSX.Element => (
                <option key={number} value={number}>
                  {number}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-5 text-stone-500">{minValue}</div>
            <input
              className="input-text border-b-2 border-transparent"
              id="minValueLabel"
              placeholder="Label (optional)"
              onChange={minValueLabelChangeHandler}
              value={minValueLabel}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 text-stone-500">{maxValue}</div>
            <input
              className="input-text border-b-2 border-transparent"
              placeholder="Label (optional)"
              onChange={maxValueLabelChangeHandler}
              id="maxValueLabel"
              value={maxValueLabel}
            />
          </div>
        </div>
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
      </div>
    </>
  );
};

export default LinearScaleEditElement;
