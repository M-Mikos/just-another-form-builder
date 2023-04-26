// Functions & Hooks
import { push, ref, remove, set } from "firebase/database";
import toPascalCase from "../../helpers.ts/toPascalCase";
import { useLoaderData, useParams } from "react-router";
import { useFetcher } from "react-router-dom";

// Types
import { ComponentListType, FormType } from "../../types/types";

// Components
import FormHeader from "./FormHeader";
import ShortEditElement from "../Fields/Short/ShortEditingElement";

// Data
import { database } from "../../../firebase";

const components: ComponentListType = {
  ShortEditElement,
};

const FormEdit = () => {
  const data = useLoaderData() as FormType;
  const params = useParams();
  const fetcher = useFetcher();

  const addFieldHandler = () => {
    fetcher.submit({}, { method: "post", action: `/${params.formId}` });
  };

  return (
    <>
      <FormHeader
        title={data.title}
        description={data.description}
        isBeingEdited={false}
      />
      {data.fields &&
        Object.values(data.fields).map((field) => {
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
          ref(database, `formsDetails/${params.formId}/fields`)
        ).key;

        // Set new default field in database
        set(
          ref(database, `formsDetails/${params.formId}/fields/${newFieldKey}`),
          {
            fieldType: "short",
            id: newFieldKey,
            required: false,
            title: "Question",
          }
        );
        break;
      case "DELETE":
        // Deleting form field
        remove(
          ref(
            database,
            `formsDetails/${params.formId}/fields/${formDataObj.fieldId}`
          )
        );
        // Deleting answers
        remove(
          ref(
            database,
            `formsAnswers/${params.formId}/fields/${formDataObj.fieldId}`
          )
        );
        // TODO usuwanie odpowiedzi do danego pola ze wszystkich zestawów, wyświetlanie stron "answers" i "fill" kiedy listy są puste
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
