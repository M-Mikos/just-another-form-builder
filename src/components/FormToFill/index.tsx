// Functions & Hooks
import { ActionFunction, useLoaderData, useParams } from "react-router";
import { push, ref, set } from "firebase/database";
import generateColorClass from "../../helpers/generateColorClass";

// Types
import { FormFieldType, FormLoaderType } from "../../types/types";

// Components
import { Form } from "react-router-dom";
import Card from "../UI/Card";
import FieldFillWrapper from "./FieldFillWrapper";
import NoiseTexture from "../Decorative/NoiseTexture";

// Data
import { database } from "../../../firebase";

const FormToFill = (): JSX.Element => {
  const { formDetails, formFields } = useLoaderData() as FormLoaderType;
  const params = useParams();

  return (
    <>
      <Card
        className={
          "relative mb-6 p-6 text-white " +
          generateColorClass("gradient", formDetails.tagColor)
        }
      >
        <NoiseTexture className="" />
        <h2 className="relative z-20 text-5xl">{formDetails.title}</h2>
        <p className="relative z-20">{formDetails.description}</p>
      </Card>
      {formFields && (
        <Form method="put" action={`/${params.formId}/fill`}>
          <ul className="mb-6 flex flex-col gap-6">
            {Object.values(formFields).map((field: FormFieldType) => {
              return (
                <li key={field.id}>
                  <Card className="p-6">
                    <FieldFillWrapper data={field} />
                  </Card>
                </li>
              );
            })}
          </ul>

          <button className="btn--strong" type="submit">
            Send
          </button>
        </Form>
      )}
    </>
  );
};

export default FormToFill;

export const action: ActionFunction = async ({ params, request }) => {
  try {
    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    // Get key for database entry
    const newAnswerKey = push(ref(database, "formsAnswers/" + params.formId))
      .key as string;

    // Set new answer in database
    set(
      ref(database, `formsAnswers/${params.formId}/${newAnswerKey}`),
      formDataObj
    );
    console.log("Succes!");
    return { ok: true };
  } catch (error) {}

  return null;
};
