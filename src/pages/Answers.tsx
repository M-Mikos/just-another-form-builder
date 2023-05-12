// Functions & Hooks
import { get, ref } from "firebase/database";

// Components
import FormAnswers from "../components/FormAnswers";

// Data & config
import { database } from "../../firebase";
import { LoaderFunction } from "react-router";

const Answers = (): JSX.Element => {
  return <FormAnswers />;
};

export default Answers;

export const loader: LoaderFunction = async ({ params }) => {
  const formDetails = await get(ref(database, `forms/${params.formId}`));
  const formFields = await get(ref(database, `formsFields/${params.formId}`));
  const formAnswers = await get(ref(database, `formsAnswers/${params.formId}`));
  return {
    formDetails: formDetails.val(),
    formFields: formFields.val(),
    formAnswers: formAnswers.val(),
  };
};
