// Function & hooks
import { Form, useFetcher, useParams } from "react-router-dom";
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
      <div>
        <input name="required" type="checkbox" />
        <label htmlFor="required">Required?</label>
        <label htmlFor="fieldType">Field type:</label>
      </div>
      <select onChange={changleFieldTypeHandler} name="fieldType">
        {AVAILABLE_FIELDS_TYPES.map((option) => (
          <option value={toPascalCase(option)}>{option}</option>
        ))}
      </select>
      <input {...questionInputAttributes} />
      <FieldComponentName />
      <div>
        <button onClick={moveUpHandler}>Up</button>
        <button onClick={moveDownHandler}>Down</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </>
  );
};

export default FieldEditWrapper;
