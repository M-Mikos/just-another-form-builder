// Functions & hooks
import { get, ref } from "firebase/database";

// Components
import FormList from "../components/FormsList";

// Data
import { database } from "../../firebase";

const Forms = () => {
  return (
    <>
      <h2>Forms</h2>
      <FormList />
    </>
  );
};

export default Forms;

export const loader = async () => {
  const data = await get(ref(database, "formsList"));
  return data.val();
};
