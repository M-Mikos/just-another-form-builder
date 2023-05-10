// Function & hooks
import { useFetcher, useParams } from "react-router-dom";
import { useState } from "react";
import toPascalCase from "../../helpers/toPascalCase";

//  Components
import ShortEditElement from "../Fields/Short/ShortEditElement";
import ParagraphEditElement from "../Fields/Paragraph/ParagraphEditElement";

// Data
import { AVAILABLE_FIELDS_TYPES } from "../../../config";

const components: ComponentListType = {
  ShortEditElement,
  ParagraphEditElement,
};

const FieldEditWrapper = ({ data }) => {
  const fetcher = useFetcher();
  const params = useParams();
  const [fieldType, setFieldType] = useState(data.fieldType);

  const moveUpHandler = () => {};

  const moveDownHandler = () => {};

  const deleteHandler = () => {
    fetcher.submit(
      { fieldId: data.id },
      {
        method: "delete",
        action: `/${params.formId}`,
      }
    );
  };

  const changleFieldTypeHandler = (event) => {
    setFieldType(event.target.value);
  };

  // Select component based on form field type

  const formattedFieldName = toPascalCase(fieldType) + "EditElement";

  const FieldComponentName = components[formattedFieldName];

  const questionInputAttributes = {
    name: "title",
    type: "text",
    ...(data.title && { defaultValue: data.title }),
    ...(!data.title && { placeholder: "Write question..." }),
  };

  return (
    <>
      <div className="flex justify-between border-b-2 border-stone-300 px-6 py-4">
        <label htmlFor="fieldType" className="text-stone-800">
          Field type:
          <select
            className="ml-3 px-3 py-2"
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
          <div className="h-6 w-9 rounded-full bg-stone-300 after:absolute after:left-1 after:top-[9.5px] after:h-4 after:w-4 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-3 peer-focus:ring-2 peer-focus:ring-emerald-200"></div>
          <span className="ml-2 text-sm text-stone-800">Required?</span>
        </label>
      </div>
      <div className="p-6">
        <input
          className="-ml-2 px-2 py-1 text-2xl"
          {...questionInputAttributes}
        />
        <FieldComponentName />
      </div>

      <div className="flex justify-between border-t-2 border-stone-300 px-6 py-4 align-middle">
        <div>
          {/* <button onClick={moveUpHandler}>Up</button>
          <button onClick={moveDownHandler}>Down</button> */}
        </div>
        <button className="btn--light" onClick={deleteHandler}>
          <span className="material-symbols-outlined ">delete</span>
          Delete
        </button>
      </div>
    </>
  );
};

export default FieldEditWrapper;
