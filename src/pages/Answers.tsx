// Functions & Hooks
import { get, ref } from "firebase/database";

// Data
import { database } from "../../firebase";
import FormAnswers from "../components/FormAnswers";

const Answers = () => {
  return (
    <>
      <FormAnswers />
    </>
  );
};

export default Answers;

export const loader = async ({ params }: { params: { formId: string } }) => {
  const formDetails = await get(ref(database, `forms/${params.formId}`));
  const formFields = await get(ref(database, `formsFields/${params.formId}`));
  const formAnswers = await get(ref(database, `formsAnswers/${params.formId}`));
  return {
    formDetails: formDetails.val(),
    formFields: formFields.val(),
    formAnswers: formAnswers.val(),
  };
};
