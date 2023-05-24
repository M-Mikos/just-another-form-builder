import { useRef, useState } from "react";

const Option = (props) => {
  const inputValue = useRef();
  const anotherOptions: string[] = props.allOptions.filter(
    (option: string) => option !== props.option
  );
  const [isRepetition, setIsRepetition] = useState<boolean>(true);

  const onInputChangeHandler = (event, option: string): void => {
    if (anotherOptions.includes(event.target.value.trim()))
      console.log("wyświetl komunikat (nie może być tak samo)");
  };

  const onInputBlurHandler = (event, option: string): void => {
    // Prevent save in case of empty option name
    if (event.target.value.trim() === "") {
      inputValue.current.value = option;
      return;
    }

    // Prevent save in case of option name repetition
    if (anotherOptions.includes(event.target.value.trim())) {
      inputValue.current.value = option;
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
    <div className="flex h-10 gap-2" key={props.option}>
      <input
        className={
          "input-text border-b-0" + (isRepetition && " border-red-500")
        }
        defaultValue={props.option}
        onChange={(event) => {
          onInputChangeHandler(event, props.option);
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
  );
};

export default Option;
