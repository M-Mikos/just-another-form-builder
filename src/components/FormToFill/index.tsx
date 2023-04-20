// Functions & Hooks
import React from "react";
import { useLoaderData } from "react-router";
import toPascalCase from "../../helpers.ts/toPascalCase";

// Types
import { FormType, FormFieldType } from "../../types/types";

// Components
import ShortFillElement from "../Fields/Short/ShortFillElement";
import { Form } from "react-router-dom";

const components: { [key: string]: React.FC } = {
  ShortFillElement,
};

const FormToFill = () => {
  const data = useLoaderData() as FormType;
  return (
    <>
      <h3>Fields</h3>
      <Form action="/projects/new" method="post">
        {data.fields.map((field: FormFieldType) => {
          // Select component based on form field type
          const formattedFieldName =
            toPascalCase(field.fieldType) + "FillElement";

          const FieldComponentName = components[formattedFieldName];

          return <FieldComponentName key={field.id} />;
        })}
        <button type="submit">Send</button>
      </Form>
    </>
  );
};

export default FormToFill;

export const action = async () => {
  const data = await get(ref(database, "formsList"));
  return data.val();
};
