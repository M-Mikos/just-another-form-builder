// Functions & Hooks
import { get, push, ref, remove, set } from "firebase/database";
import { ActionFunction, useLoaderData, useParams } from "react-router";
import { useFetcher } from "react-router-dom";
import { useState } from "react";

// Types
import { FormLoaderType } from "../../types/types";

// Components
import FormHeader from "./FormHeader";
import FieldEditWrapper from "./FieldEditWrapper";
import Card from "../UI/Card";
import NoiseTexture from "../Decorative/NoiseTexture";

// Data
import { database } from "../../../firebase";
import generateColorClass from "../../helpers/generateColorClass";

const FormEdit = (): JSX.Element => {
  const { formDetails, formFields } = useLoaderData() as FormLoaderType;
  const params = useParams<{ [key: string]: string }>();
  const fetcher = useFetcher();
  const [currentlyEditedField, setCurrentlyEditedField] = useState<string>("");

  const addFieldHandler = (): void => {
    fetcher.submit({}, { method: "POST", action: `/${params.formId}` });
  };

  const setEditedFieldHandler = (id: string): void => {
    setCurrentlyEditedField(id);
  };

  return (
    <>
      <Card
        className={
          "relative mb-6 p-6 " +
          generateColorClass("gradient", formDetails.tagColor)
        }
      >
        <NoiseTexture />
        <FormHeader
          title={formDetails.title}
          description={formDetails.description}
          id={formDetails.id}
          tagColor={formDetails.tagColor}
        />
      </Card>

      <ul className="flex flex-col gap-6">
        {formFields &&
          Object.values(formFields).map((field) => {
            return (
              <li
                key={field.id}
                onClick={() => setEditedFieldHandler(field.id)}
              >
                <Card>
                  <FieldEditWrapper
                    data={field}
                    tagColor={formDetails.tagColor}
                    isBeingEdited={currentlyEditedField === field.id}
                  />
                </Card>
              </li>
            );
          })}
        <button className="btn--light text-base" onClick={addFieldHandler}>
          <span className="material-symbols-outlined ">add_circle</span>
          Add field
        </button>
      </ul>
    </>
  );
};

export default FormEdit;

export const action: ActionFunction = async ({ params, request }) => {
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
        ).key as string;

        // Set new default field in database
        set(ref(database, `formsFields/${params.formId}/${newFieldKey}`), {
          fieldType: "short",
          id: newFieldKey,
          required: false,
          title: "Question",
        });
        break;
      case "DELETE":
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

        // Deleting form field
        remove(
          ref(database, `formsFields/${params.formId}/${formDataObj.fieldId}`)
        );

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
