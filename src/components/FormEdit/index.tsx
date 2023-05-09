// Functions & Hooks
import { get, push, ref, remove, set } from "firebase/database";
import { useLoaderData, useParams } from "react-router";
import { useFetcher } from "react-router-dom";
import { useState } from "react";

// Types
import { FormLoaderType } from "../../types/types";

// Components
import FormHeader from "./FormHeader";
import FieldEditWrapper from "./FieldEditWrapper";
import Card from "../UI/Card";

// Data
import { database } from "../../../firebase";

const FormEdit = () => {
  const { formDetails, formFields } = useLoaderData() as FormLoaderType;
  const params = useParams();
  const fetcher = useFetcher();
  const [currentlyEditedField, setCurrentlyEditedField] = useState();

  const addFieldHandler = () => {
    fetcher.submit({}, { method: "POST", action: `/${params.formId}` });
  };

  return (
    <>
      <Card className="mb-6 p-6">
        <h2>{formDetails.title}</h2>
        <span>{formDetails.description}</span>
      </Card>

      <ul className="flex flex-col gap-6">
        {formFields &&
          Object.values(formFields).map((field) => {
            return (
              <li key={field.id}>
                <Card>
                  <fetcher.Form method="PATCH" action={`/${params.formId}`}>
                    <input
                      name="fieldId"
                      type="hidden"
                      value={field.id}
                    ></input>
                    <FieldEditWrapper data={field} />
                    <button type="submit">Save changes</button>
                  </fetcher.Form>
                </Card>
              </li>
            );
          })}
        <button
          className="w-fit border-2 border-stone-500 px-8 py-2 font-semibold tracking-wider text-stone-500"
          onClick={addFieldHandler}
        >
          Add Field
        </button>
      </ul>
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
        // Updateing field
        set(
          ref(database, `formsFields/${params.formId}/${formDataObj.fieldId}`),
          {
            fieldType: formDataObj.fieldType,
            id: formDataObj.fieldId,
            title: formDataObj.title,
            ...(formDataObj.required
              ? { required: true }
              : { required: false }),
          }
        );
        break;
    }

    console.log("Succes!");
    return { ok: true };
  } catch (error) {
    console.error(error);
  }

  return null;
};
