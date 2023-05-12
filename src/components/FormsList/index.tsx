// Types
import { FormType } from "../../types/types";

// Functions & hooks
import { ActionFunction, useLoaderData } from "react-router";
import { useState } from "react";

// Components
import FormListItem from "./FormListItem";
import { push, ref, remove, set } from "firebase/database";
import { database } from "../../../firebase";
import AddNewForm from "./AddNewForm";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

// Data
import { FORMS_COLORS } from "../../../config";

const FormList = () => {
  const forms = useLoaderData() as { [key: string]: FormType };
  const [isModal, setIsModal] = useState(false);

  const toggleModalHandler = (): void => {
    setIsModal((state: boolean): boolean => {
      return !state;
    });
  };

  return (
    <>
      <ul className="mb-6 grid grid-cols-3 gap-6">
        {forms &&
          Object.entries(forms).map((form) => (
            <li key={form[1].id}>
              <Card className="flex h-full flex-col ">
                <FormListItem
                  title={form[1].title}
                  description={form[1].description ? form[1].description : ""}
                  id={form[1].id}
                  tagColor={form[1].tagColor}
                />
              </Card>
            </li>
          ))}
      </ul>

      <button onClick={toggleModalHandler} className="btn--light text-base">
        <span className="material-symbols-outlined ">add</span>Add new form
      </button>
      {isModal && (
        <Modal toggleModal={toggleModalHandler}>
          <AddNewForm toggleModal={toggleModalHandler} />
        </Modal>
      )}
    </>
  );
};

export default FormList;

export const action: ActionFunction = async ({ params, request }) => {
  try {
    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    // Select action method
    switch (request.method) {
      case "POST":
        // Add new form
        // Get key for new form database entry
        const newFormKey = push(ref(database, `forms`)).key as string;

        // Pick random color
        const color: string =
          FORMS_COLORS[Math.floor(Math.random() * FORMS_COLORS.length)];

        // Set new form in database
        set(ref(database, `forms/${newFormKey}`), {
          description: formDataObj.formDescription,
          id: newFormKey,
          tagColor: color,
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
