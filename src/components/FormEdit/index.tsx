// Functions & Hooks
import { get, push, ref, remove, set, update } from "firebase/database";
import { ActionFunction, useLoaderData, useParams } from "react-router";
import { useFetcher } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

// Types
import { FormLoaderType } from "../../types/types";

// Components
import FormHeader from "./FormHeader";
import FieldEditWrapper from "./FieldEditWrapper";
import Card from "../UI/Card";
import NoiseTexture from "../Decorative/NoiseTexture";

// Data
import { database } from "../../../firebase";
import generateColorClass from "../../helpers/generateColorClass";

const FormEdit = (): JSX.Element => {
  const { formDetails, formFields } = useLoaderData() as FormLoaderType;
  const params = useParams<{ [key: string]: string }>();
  const fetcher = useFetcher();

  const [currentColor, setCurrentColor] = useState<string>(
    formDetails.tagColor
  );

  // State for selecting currently edited field
  const [currentlyEditedField, setCurrentlyEditedField] = useState<string>("");
  // Adding new field
  const addFieldHandler = (): void => {
    fetcher.submit({}, { method: "POST", action: `/${params.formId}` });
  };

  // Selecting edited field for style change
  const setEditedFieldHandler = (id: string): void => {
    setCurrentlyEditedField(id);
  };

  // State for controlling fields Order
  const [fieldsOrder, setFieldsOrder] = useState<string[]>(
    formDetails.fieldsOrder
  );

  // Render new field order after updating field order in database
  useEffect(
    (): void => setFieldsOrder(formDetails.fieldsOrder),
    [formDetails.fieldsOrder]
  );

  // Set new field order on click event
  const moveFieldHandler = (
    fieldId: string,
    direction: "up" | "down"
  ): void => {
    const index: number = fieldsOrder.indexOf(fieldId);
    const newFieldsOrder: string[] = [...fieldsOrder];
    const positionShift: number = direction === "down" ? 1 : -1;

    [newFieldsOrder[index], newFieldsOrder[index + positionShift]] = [
      newFieldsOrder[index + positionShift],
      newFieldsOrder[index],
    ];
    setFieldsOrder(newFieldsOrder);

    update(ref(database, `forms/${formDetails.id}`), {
      fieldsOrder: newFieldsOrder,
    });
  };

  const changeColorHandler = (color: string): void => {
    setCurrentColor(color);
    update(ref(database, `forms/${formDetails.id}`), {
      tagColor: color,
    });
  };

  return (
    <>
      <Card
        className={
          "relative mb-6 p-6 " + generateColorClass("gradient", currentColor)
        }
      >
        <NoiseTexture />
        <FormHeader
          title={formDetails.title}
          description={formDetails.description}
          id={formDetails.id}
          tagColor={currentColor}
          changeColor={changeColorHandler}
        />
      </Card>

      <ul className="flex flex-col gap-6">
        {fieldsOrder &&
          fieldsOrder.map((fieldId) => {
            if (formFields && formFields[fieldId])
              return (
                <li
                  key={fieldId}
                  onClick={() => setEditedFieldHandler(fieldId)}
                >
                  <Card>
                    <FieldEditWrapper
                      data={formFields[fieldId]}
                      tagColor={currentColor}
                      isBeingEdited={currentlyEditedField === fieldId}
                      isFirst={fieldsOrder[0] === fieldId}
                      isLast={fieldsOrder.at(-1) === fieldId}
                      moveFieldHandler={moveFieldHandler}
                    />
                  </Card>
                </li>
              );
          })}
        <button className="btn--light text-base" onClick={addFieldHandler}>
          <span className="material-symbols-outlined ">add_circle</span>
          Add field
        </button>
      </ul>
    </>
  );
};

export default FormEdit;

