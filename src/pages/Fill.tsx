// Functions & hooks
import { get, ref } from "firebase/database";

// Components
import FormToFill from "../components/FormToFill";

// Data &config
import { database } from "../../firebase";
import { LoaderFunction } from "react-router";

const Fill = (): JSX.Element => {
  return (
    <>
      <FormToFill />
    </>
  );
};

export default Fill;

export const loader: LoaderFunction = async ({ params }) => {
  const formDetails = await get(ref(database, `forms/${params.formId}`));
  const formFields = await get(ref(database, `formsFields/${params.formId}`));
  return {
    formDetails: formDetails.val(),
    formFields: formFields.val(),
  };
};
