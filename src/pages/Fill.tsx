// Functions & hooks
import { get, ref } from "firebase/database";

// Components
import FormToFill from "../components/FormToFill";

// Data
import { database } from "../../firebase";

const Fill = () => {
  return (
    <>
      <h2>Fill</h2>
      <FormToFill />
    </>
  );
};

export default Fill;

export const loader = async ({ params }) => {
  console.log(params.formId);
  const data = await get(ref(database, `forms/0`));
  console.log(data.val());
  return data.val();
};
