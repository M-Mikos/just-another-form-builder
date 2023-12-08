// Functions & hooks
import { useRef, useState } from "react";

// TS Interfaces declaration
interface PropsTypes {
  option: string;
  allOptions: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
  inputType: "SingleChoice" | "MultipleChoice";
}

const Option = (props: PropsTypes): JSX.Element => {
  const inputValue = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isRepetition, setIsRepetition] = useState<boolean>(false);

  const anotherOptions: string[] = props.allOptions.filter(
    (option: string) => option !== props.option
  );

  const onInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    anotherOptions.includes(event.target.value.trim())
      ? setIsRepetition(true)
      : setIsRepetition(false);
  };

  const onInputBlurHandler = (
    event: React.FocusEvent<HTMLInputElement>,
    option: string
  ): void => {
    // Prevent save in case of empty option name
    if (event.target.value.trim() === "") {
      inputValue.current.value = option;
      return;
    }

    // Prevent save in case of option name repetition
    if (anotherOptions.includes(event.target.value.trim())) {
      inputValue.current.value = option;
      setIsRepetition(false);
      return;
    }
    props.setOptions((state) => {
      const i = props.allOptions.indexOf(option);
      const newState = [...state];
      newState[i] = event.target.value.trim();
      return newState;
    });
  };

  const deleteOptionHandler = (option: string): void => {
    props.setOptions((state) => {
      return state.filter((item) => item !== option);
    });
  };

  return (
    <div>
      <div className=" flex h-10 items-center gap-1" key={props.option}>
        <div
          className={
            "ml-2 h-4 w-4 flex-[0_0_16px] border-2 border-stone-300" +
            (props.inputType === "SingleChoice" ? " rounded-full" : "") +
            (props.inputType === "MultipleChoice" ? " rounded-sm" : "")
          }
        />
        <input
          className={
            "input-text border-b-2 border-transparent pl-2  " +
            (isRepetition && " focus-visible:border-red-500")
          }
          defaultValue={props.option}
          onChange={(event) => {
            onInputChangeHandler(event);
          }}
          onBlur={(event) => {
            onInputBlurHandler(event, props.option);
          }}
          ref={inputValue}
        />
        {props.allOptions.length > 1 && (
          <button
            className="btn--light"
            onClick={() => {
              deleteOptionHandler(props.option);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
      {isRepetition && (
        <div className="my-2 flex items-center gap-2 text-sm text-red-500">
          <span className="material-symbols-outlined text-[22px]">warning</span>
          <span>Option name cannot be repeated</span>
        </div>
      )}
    </div>
  );
};

export default Option;
