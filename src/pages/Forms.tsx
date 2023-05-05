// Functions & hooks
import { get, ref } from "firebase/database";

// Components
import FormList from "../components/FormsList";

// Data
import { database } from "../../firebase";

const Forms = () => {
  return (
    <>
      <h2>Your forms</h2>
      <FormList />
    </>
  );
};

export default Forms;

export const loader = async () => {
  const forms = await get(ref(database, "forms"));
  return forms.val();
};
