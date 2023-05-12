// Functions & hooks
import { get, ref } from "firebase/database";

// Components
import FormList from "../components/FormsList";

// Data & config
import { database } from "../../firebase";
import { LoaderFunction } from "react-router";

const Forms = (): JSX.Element => {
  return (
    <>
      <h2>Your forms</h2>
      <FormList />
    </>
  );
};

export default Forms;

export const loader: LoaderFunction = async () => {
  const forms = await get(ref(database, "forms"));
  return forms.val();
};
