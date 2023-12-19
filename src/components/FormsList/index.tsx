// Functions & hooks
import { useLoaderData } from "react-router";
import { useState } from "react";
import generateColorClass from "../../helpers/generateColorClass";

// Components
import FormListItem from "./FormListItem";
import AddNewForm from "./AddNewForm";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

// Types
import { FormType } from "../../types/types";

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
      <ul className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {forms &&
          Object.entries(forms).map((form, i) => (
            <li key={i}>
              <Card
                className={
                  "flex h-full flex-col " +
                  generateColorClass("hover-border", form[1].tagColor)
                }
              >
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
