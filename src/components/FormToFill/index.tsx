// Functions & Hooks
import { useLoaderData, useParams } from "react-router";
import { push, ref, set } from "firebase/database";

// Types
import { FormFieldType, FormLoaderType } from "../../types/types";

// Components
import { Form } from "react-router-dom";
import FormHeader from "../FormEdit/FormHeader";
import Card from "../UI/Card";

// Data
import { database } from "../../../firebase";
import FieldFillWrapper from "./FieldFillWrapper";

const FormToFill = () => {
  const { formDetails, formFields } = useLoaderData() as FormLoaderType;
  const params = useParams();

  return (
    <>
      <Card className="mb-6 p-6">
        <FormHeader
          title={formDetails.title}
          description={formDetails.description}
        />
      </Card>
      {formFields && (
        <Form method="put" action={`/${params.formId}/fill`}>
          <ul className="flex flex-col gap-6">
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

          <button type="submit">Send</button>
        </Form>
      )}
    </>
  );
};

export default FormToFill;

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

    // Get key for database entry
    const newAnswerKey = push(
      ref(database, "formsAnswers/" + params.formId)
    ).key;

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
