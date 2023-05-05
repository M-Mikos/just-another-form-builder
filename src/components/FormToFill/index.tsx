// Functions & Hooks
import { useLoaderData, useParams } from "react-router";
import toPascalCase from "../../helpers/toPascalCase";
import { push, ref, set } from "firebase/database";

// Types
import {
  FormFieldType,
  ComponentListType,
  FormLoaderType,
} from "../../types/types";

// Components
import ShortFillElement from "../Fields/Short/ShortFillElement";
import ParagraphFillElement from "../Fields/Paragraph/ParagraphFillElement";
import { Form } from "react-router-dom";
import FormHeader from "../FormEdit/FormHeader";

// Data
import { database } from "../../../firebase";

const components: ComponentListType = {
  ShortFillElement,
  ParagraphFillElement,
};

const FormToFill = () => {
  const { formFields } = useLoaderData() as FormLoaderType;
  const params = useParams();

  return (
    <>
      <FormHeader
        title={formDetails.title}
        description={formDetails.description}
      />
      <h3>Fields</h3>
      {formFields && (
        <Form method="put" action={`/${params.formId}/fill`}>
          {Object.values(formFields).map((field: FormFieldType) => {
            // Select component based on form field type
            const formattedFieldName =
              toPascalCase(field.fieldType) + "FillElement";

            const FieldComponentName = components[formattedFieldName];

            return <FieldComponentName inputName={field.id} key={field.id} />;
          })}
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
