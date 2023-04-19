// Functions
import { get, ref } from "firebase/database";

// Components
import FormListItem from "./FormListItem";

// Data
import { database } from "../../firebase";
import { useEffect } from "react";

const FormList = () => {
  const getData = async () => {
    const data = await get(ref(database, "forms"));
    console.log(data.val());
  };

  useEffect(() => {
    console.log(database);
    getData();
  }, []);

  return (
    <ul>
      {/* {INITIAL_FORMS.map((form) => (
        <FormListItem
          title={form.title}
          description={form.description}
          id={form.id}
        />
      ))} */}
    </ul>
  );
};

export default FormList;

export const loader = async () => {};
