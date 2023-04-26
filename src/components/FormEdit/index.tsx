// Functions & Hooks
import { get, push, ref, remove, set } from "firebase/database";
import toPascalCase from "../../helpers/toPascalCase";
import { useLoaderData, useParams } from "react-router";
import { useFetcher } from "react-router-dom";
import { useState } from "react";

// Types
import { ComponentListType, FormType } from "../../types/types";

// Components
import FormHeader from "./FormHeader";
import ShortEditElement from "../Fields/Short/ShortEditElement";

// Data
import { database } from "../../../firebase";

const components: ComponentListType = {
  ShortEditElement,
};

const FormEdit = () => {
  const { formDetails, formFields } = useLoaderData();
  const params = useParams();
  const fetcher = useFetcher();
  const [currentlyEditedField, setCurrentlyEditedField] = useState();

  const addFieldHandler = () => {
    fetcher.submit({}, { method: "POST", action: `/${params.formId}` });
  };

  return (
    <>
      <FormHeader
        title={formDetails.title}
        description={formDetails.description}
      />
      {formFields &&
        Object.values(formFields).map((field) => {
          // Select component based on form field type
          const formattedFieldName =
            toPascalCase(field.fieldType) + "EditElement";

          const FieldComponentName = components[formattedFieldName];

          return <FieldComponentName data={field} key={field.id} />;
        })}
      <button onClick={addFieldHandler}>Add</button>
    </>
  );
};

export default FormEdit;

export const action = async ({
  params,
  request,
}: {
  params: { formId: string };
  request: Request;
}) => {
  try {
    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    // Select action method
    switch (request.method) {
      case "POST":
        // Adding new field
        // Get key for new field database entry
        const newFieldKey = push(
          ref(database, `formsFields/${params.formId}/fields`)
        ).key;

        // Set new default field in database
        set(ref(database, `formsFields/${params.formId}/${newFieldKey}`), {
          fieldType: "short",
          id: newFieldKey,
          required: false,
          title: "Question",
        });
        break;
      case "DELETE":
        // Deleting form field
        remove(
          ref(database, `formsFields/${params.formId}/${formDataObj.fieldId}`)
        );

        // Deleting field answers in each form answers set

        const answers = await get(
          ref(database, `formsAnswers/${params.formId}`)
        );

        answers.forEach((child) => {
          const answersSetId: string = child.ref._path.pieces_.slice(-1)[0];
          remove(
            ref(
              database,
              `formsAnswers/${params.formId}/${answersSetId}/${formDataObj.fieldId}`
            )
          );
        });
        break;

      case "PATCH":
        // Updating field
        break;
    }

    console.log("Succes!");
    return { ok: true };
  } catch (error) {
    console.error(error);
  }

  return null;
};
