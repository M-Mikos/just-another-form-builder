// Types
import { Form } from "../types/types";

// Functions & hooks
import { useLoaderData } from "react-router";

// Components
import FormListItem from "./FormListItem";

const FormList = () => {
  const forms = useLoaderData() as { [key: string]: Form };

  return (
    <ul>
      {Object.entries(forms).map((form) => (
        <FormListItem
          key={form[1].id}
          title={form[1].title}
          description={form[1].description}
          id={form[1].id}
        />
      ))}
    </ul>
  );
};

export default FormList;
