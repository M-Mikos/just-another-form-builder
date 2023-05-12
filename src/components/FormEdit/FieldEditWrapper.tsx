// Function & hooks
import { useFetcher, useParams } from "react-router-dom";
import { useState } from "react";
import toPascalCase from "../../helpers/toPascalCase";

// TS types
import { FormFieldType } from "../../types/types";
import React from "react";

//  Components
import ShortEditElement from "../Fields/Short/ShortEditElement";
import ParagraphEditElement from "../Fields/Paragraph/ParagraphEditElement";

// Data & config
import { AVAILABLE_FIELDS_TYPES } from "../../../config";
import generateColorClass from "../../helpers/generateColorClass";
import renderReactComponentByName from "../../helpers/renderReactComponentByName";

const components: {
  [key: string]: React.ComponentType;
} = {
  ShortEditElement,
  ParagraphEditElement,
};

const FieldEditWrapper = (props: {
  data: FormFieldType;
  isBeingEdited: boolean;
  tagColor: string;
}) => {
  const fetcher = useFetcher();
  const params = useParams();
  const [fieldType, setFieldType] = useState<string>(props.data.fieldType);

  const moveUpHandler = () => {};

  const moveDownHandler = () => {};

  const deleteHandler = () => {
    fetcher.submit(
      { fieldId: props.data.id },
      {
        method: "delete",
        action: `/${params.formId}`,
      }
    );
  };

  const changleFieldTypeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFieldType(event.target.value);
  };

  const questionInputAttributes = {
    name: "title",
    type: "text",
    autoComplete: "off",
    ...(props.data.title && { defaultValue: props.data.title }),
    ...(!props.data.title && { placeholder: "Write question..." }),
  };

  return (
    <div>
      <div
        className={
          "flex items-center justify-between overflow-hidden border-b-2  px-6 transition-all duration-500 " +
          (props.isBeingEdited
            ? "h-16 border-stone-300 "
            : "h-0 border-transparent ")
        }
      >
        <label htmlFor="fieldType" className="text-sm text-stone-800">
          Field type:
          <select
            className="ml-3 bg-stone-100 px-3 py-2 hover:bg-stone-200"
            onChange={changleFieldTypeHandler}
            name="fieldType"
          >
            {AVAILABLE_FIELDS_TYPES.map((option) => (
              <option value={toPascalCase(option)}>{option}</option>
            ))}
          </select>
        </label>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            name="required"
            type="checkbox"
            value="true"
            className="peer sr-only"
          />
          <div className="h-6 w-9 rounded-full bg-stone-300 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-600 peer-checked:after:translate-x-3 peer-focus:ring-2 peer-focus:ring-sky-200"></div>
          <span className="ml-2 text-sm text-stone-800">Required?</span>
        </label>
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
            className="input-text peer -ml-2 border-b-0 px-2 py-1 text-2xl"
            {...questionInputAttributes}
          />
          <div className="input-text__underline -ml-2" />
          {renderReactComponentByName(fieldType, "Edit", components)}
        </div>
      </div>

      <div
        className={
          "flex justify-between overflow-hidden border-t-2  px-6 align-middle transition-all duration-500 " +
          (props.isBeingEdited
            ? "h-16 border-stone-300 "
            : "h-0 border-transparent ")
        }
      >
        <div>
          {/* <button onClick={moveUpHandler}>Up</button>
          <button onClick={moveDownHandler}>Down</button> */}
        </div>
        <button className="btn--light" onClick={deleteHandler}>
          <span className="material-symbols-outlined ">delete</span>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FieldEditWrapper;
