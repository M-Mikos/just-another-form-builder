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

export const loader = async ({ params }: { params: { formId: string } }) => {
  const data = await get(ref(database, `formsDetails/${params.formId}`));
  return data.val();
};
