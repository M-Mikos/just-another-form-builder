// Types
import { Form } from "../types/types";

// Functions & hooks
import { get, ref } from "firebase/database";
import { useLoaderData } from "react-router";

// Components
import FormListItem from "./FormListItem";

// Data
import { database } from "../../firebase";

const FormList = () => {
  const forms = useLoaderData<Form[]>();
  console.log(forms);

  return (
    <ul>
      {forms.map((form) => (
        <FormListItem
          title={form.title}
          description={form.description}
          id={form.id}
        />
      ))}
    </ul>
  );
};

export default FormList;

export const loader = async () => {
  const data = await get(ref(database, "forms"));
  return data.val();
};
