// Functions & Hooks
import { get, ref } from "firebase/database";

// Data
import { database } from "../../firebase";
import FormAnswers from "../components/FormAnswers";

const Answers = () => {
  return (
    <>
      <h2>Answers</h2>
      <FormAnswers />
    </>
  );
};

export default Answers;

export const loader = async ({ params }: { params: { formId: string } }) => {
  const formDetails = await get(ref(database, `formsDetails/${params.formId}`));
  const answers = await get(ref(database, `formsAnswers/${params.formId}`));
  return { formDetails: formDetails.val(), answers: answers.val() };
};
