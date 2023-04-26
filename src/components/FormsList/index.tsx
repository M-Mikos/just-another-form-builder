// Types
import { FormListItemType } from "../../types/types";

// Functions & hooks
import { useLoaderData } from "react-router";
import { useFetcher } from "react-router-dom";

// Components
import FormListItem from "./FormListItem";
import { push, ref, remove, set } from "firebase/database";
import { database } from "../../../firebase";
import AddNewForm from "./AddNewForm";

const FormList = () => {
  const forms = useLoaderData() as { [key: string]: FormListItemType };

  return (
    <>
      <ul>
        {forms &&
          Object.entries(forms).map((form) => (
            <FormListItem
              key={form[1].id}
              title={form[1].title}
              description={form[1].description}
              id={form[1].id}
            />
          ))}
      </ul>
      <AddNewForm />
      {/* <button onClick={addFormHandler}>Add new form</button> */}
    </>
  );
};

export default FormList;

export const action = async ({
  params,
  request,
}: {
  params: { formId: string };
  request: Request;
}) => {
  try {
    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    // Select action method
    switch (request.method) {
      case "POST":
        // Adding new form
        // Get key for new form database entry
        const newFormKey = push(ref(database, `forms`)).key;

        // Set new form in database
        set(ref(database, `forms/${newFormKey}`), {
          description: formDataObj.formDescription,
          id: newFormKey,
          tagColor: "now that's the least important thing",
          title: formDataObj.formTitle,
        });
        break;
      case "DELETE":
        // Deleting form detail
        remove(ref(database, `forms/${formDataObj.formId}`));

        // Deleting form fields
        remove(ref(database, `formsFields/${formDataObj.formId}`));

        // Deleting form answers
        remove(ref(database, `formsAnswers/${formDataObj.formId}`));
        break;
    }

    console.log("Succes!");
    return { ok: true };
  } catch (error) {
    console.error(error);
  }

  return null;
};
