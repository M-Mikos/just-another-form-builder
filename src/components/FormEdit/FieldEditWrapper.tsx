// Function & hooks
import React from "react";
import { useFetcher, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import toPascalCase from "../../helpers/toPascalCase";
import useModalConfirmation from "../../hooks/useModalConfirmation";
import generateColorClass from "../../helpers/generateColorClass";
import renderReactComponentByName from "../../helpers/renderReactComponentByName";

// TS types
import { FormFieldType } from "../../types/types";

//  Components
import ShortEditElement from "../Fields/Short/ShortEditElement";
import ParagraphEditElement from "../Fields/Paragraph/ParagraphEditElement";
import LinearScaleEditElement from "../Fields/LinearScale/LinearScaleEditElement";
import SingleChoiceEditElement from "../Fields/Choice/SingleChoice/SingleChoiceEditElement";
import MultipleChoiceEditElement from "../Fields/Choice/MultipleChoice/MultipleChoiceEditElement";

// Data & config
import { AVAILABLE_FIELDS_TYPES } from "../../../config";
import useFormSaveOnChange from "../../hooks/useFormSaveOnChange";

const components: {
  [key: string]: React.ComponentType<{
    attributes: {
      options: string[];
      isAnotherAnswerEnabled: boolean;
      minValue: string;
      maxValue: string;
      minValueLabel: string;
      maxValueLabel: string;
    };
  }>;
} = {
  ShortEditElement,
  ParagraphEditElement,
  SingleChoiceEditElement,
  MultipleChoiceEditElement,
  LinearScaleEditElement,
};

const FieldEditWrapper = (props: {
  data: FormFieldType;
  isBeingEdited: boolean;
  isFirst: boolean;
  isLast: boolean;
  tagColor: string;
  moveFieldHandler: (fieldId: string, direction: "up" | "down") => void;
}) => {
  const fetcher = useFetcher();
  const params = useParams();
  const [fieldType, setFieldType] = useState<string>(props.data.fieldType);
  const formElement = useRef() as React.MutableRefObject<HTMLFormElement>;
  const saveOnChangeHandler = useFormSaveOnChange(
    formElement,
    `/${params.formId}`
  );

  const moveUpHandler = (): void => props.moveFieldHandler(props.data.id, "up");

  const moveDownHandler = (): void =>
    props.moveFieldHandler(props.data.id, "down");

  const deleteHandler = (): void => {
    fetcher.submit(
      { fieldId: props.data.id },
      {
        method: "DELETE",
        action: `/${params.formId}`,
      }
    );
  };

  const {
    isConfirmationModal,
    toggleConfirmationModal,
    confirmationModalElement,
  } = useModalConfirmation(
    deleteHandler,
    "Are you sure?",
    "If you delete this field, you will also delete all its existing answers."
  );

  const changleFieldTypeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFieldType(event.target.value);
  };

  return (
    <fetcher.Form onChange={saveOnChangeHandler} ref={formElement}>
      <input name="fieldId" type="hidden" value={props.data.id}></input>
      <div
        className={
          "flex h-32 flex-col items-start justify-between overflow-hidden border-b-2 border-dotted px-6 py-4 transition-all duration-500  sm:flex-row sm:items-center sm:py-0 " +
          (props.isBeingEdited
            ? "border-stone-300 sm:h-16 "
            : "h-[0px] border-transparent py-0 ")
        }
      >
        <label htmlFor="fieldType" className="text-sm text-stone-800">
          Field type:
          <select
            className="bg-stone-100 px-3 py-2 hover:bg-stone-200 sm:ml-3"
            onChange={changleFieldTypeHandler}
            name="fieldType"
            defaultValue={props.data.fieldType}
          >
            {AVAILABLE_FIELDS_TYPES.map((option) => (
              <option key={option} value={toPascalCase(option)}>
                {option}
              </option>
            ))}
          </select>
        </label>

        {/* <label className="relative inline-flex cursor-pointer items-center ">
          <input
            name="required"
            type="checkbox"
            value="true"
            className="peer sr-only"
            {...(props.data.required && { defaultChecked: true })}
          />
          <div className="h-6 w-9 rounded-full bg-stone-300 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-600 peer-checked:after:translate-x-3 peer-focus:ring-2 peer-focus:ring-sky-200"></div>
          <span className="ml-2 text-sm text-stone-800">Required?</span>
        </label> */}
      </div>
      <div
        className={
          "relative transition duration-300 before:absolute before:-z-10  before:block before:h-full before:w-2 before:rounded-l before:transition-all before:duration-300 before:content-[''] " +
          generateColorClass("before-bg", props.tagColor) +
          (props.isBeingEdited ? " before:-left-2" : " before:left-1")
        }
      >
        <div className="-left-5 p-6 ">
          <input
            className="input-text peer border-b-0 px-2 py-1 text-2xl sm:-ml-2"
            name="title"
            type="text"
            autoComplete="off"
            {...(props.data.title && { defaultValue: props.data.title })}
            placeholder="Write question..."
            required={true}
          />
          <div className="input-text__underline sm:-ml-2" />

          {renderReactComponentByName(fieldType, "Edit", components, {
            ...(props.data.attributes && {
              attributes: JSON.parse(props.data.attributes),
            }),
          })}
        </div>
      </div>

      <div
        className={
          "flex justify-between overflow-hidden border-t-2 border-dotted  px-6 align-middle transition-all duration-500 " +
          (props.isBeingEdited
            ? "h-16 border-stone-300 "
            : "h-0 border-transparent ")
        }
      >
        <div className="flex ">
          <button
            className={`btn--light${
              props.isFirst ? " opacity-20 hover:opacity-20" : ""
            }`}
            onClick={moveUpHandler}
            {...(props.isFirst && { disabled: true })}
          >
            <span className="material-symbols-outlined">expand_less</span>
          </button>
          <button
            className={`btn--light${
              props.isLast ? " opacity-20 hover:opacity-20" : ""
            }`}
            onClick={moveDownHandler}
            {...(props.isLast && { disabled: true })}
          >
            <span className="material-symbols-outlined ">expand_more</span>
          </button>
        </div>
        <button className="btn--light" onClick={toggleConfirmationModal}>
          <span className="material-symbols-outlined">delete</span>
          Delete
        </button>
      </div>
      {isConfirmationModal && confirmationModalElement}
    </fetcher.Form>
  );
};

export default FieldEditWrapper;
