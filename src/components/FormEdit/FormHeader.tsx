// Functions & Hooks

import { useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import useFormSaveOnChange from "../../hooks/useFormSaveOnChange";
import generateColorClass from "../../helpers/generateColorClass";

// Data & config
import { FORMS_COLORS } from "../../../config";

// TS Interfaces declaration
interface PropsTypes {
  title: string;
  description?: string;
  id: string;
  tagColor: string;
  changeColor: (color: string) => void;
}

const FormHeader = (props: PropsTypes): JSX.Element => {
  const fetcher = useFetcher();
  const formElement = useRef() as React.MutableRefObject<HTMLFormElement>;
  const saveOnChangeHandler = useFormSaveOnChange(formElement, "/");
  const [isColorOptions, setIsColorOptions] = useState<boolean>(false);

  const toggleColorOptions = (): void => {
    setIsColorOptions((state) => {
      return !state;
    });
  };

  const changeColorHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.changeColor(event.target.value);
    toggleColorOptions();
  };

  return (
    <fetcher.Form onChange={saveOnChangeHandler} ref={formElement}>
      <input name="formId" type="hidden" value={props.id} />
      <input
        name="formTitle"
        className="input-text peer relative -ml-3 border-b-0 bg-transparent text-3xl font-bold  text-white placeholder-stone-200 hover:bg-stone-100/20 focus-visible:bg-stone-100/10"
        type="text"
        placeholder="Type form title here..."
        autoComplete="off"
        defaultValue={props.title}
        required
      />
      <div className="input-text__underline -ml-3 bg-white" />
      <textarea
        name="formDescription"
        autoComplete="off"
        className="input-text peer relative -ml-3 h-24 resize-none overflow-x-auto border-b-0 bg-transparent text-white placeholder-stone-200 hover:bg-stone-100/20 focus-visible:bg-stone-100/10"
        placeholder="Type form description here..."
        {...(props.description && { defaultValue: props.description })}
      />
      <div className="inline-flex justify-end gap-2">
        <div
          className={
            "relative inline-flex items-center gap-2 rounded bg-white px-4 py-3" +
            (isColorOptions ? "" : " invisible")
          }
          onChange={changeColorHandler}
        >
          {FORMS_COLORS.map((option: string): JSX.Element => {
            return (
              <label className="cursor-pointer" key={option}>
                <input
                  className="peer sr-only"
                  type="radio"
                  id={option}
                  value={option}
                  {...(props.tagColor === option && { defaultChecked: true })}
                />
                <div
                  className={
                    "h-4 w-4 ring-2 ring-transparent peer-checked:ring-sky-500 " +
                    generateColorClass("bg", option)
                  }
                />
              </label>
            );
          })}
        </div>
        <button
          className="btn--light relative text-white"
          onClick={toggleColorOptions}
        >
          <span className="material-symbols-outlined">brush</span>
          Color
        </button>
      </div>
    </fetcher.Form>
  );
};

export default FormHeader;
