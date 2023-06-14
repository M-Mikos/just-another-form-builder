// Functions & Hooks
import { get, push, ref, remove, set, update } from "firebase/database";
import { ActionFunction, useLoaderData, useParams } from "react-router";
import { useFetcher } from "react-router-dom";
import { useEffect, useState } from "react";

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

export const action: ActionFunction = async ({ params, request }) => {
  try {
    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    console.log(formDataObj);

    // Select action method
    switch (request.method) {
      case "POST": {
        // Adding new field
        // Get key for new field database entry
        const newFieldKey = push(
          ref(database, `formsFields/${params.formId}/fields`)
        ).key as string;

        // Set new default field in database
        set(ref(database, `formsFields/${params.formId}/${newFieldKey}`), {
          fieldType: "Short",
          id: newFieldKey,
          required: false,
          title: "Question",
        });

        // Add new field id to fields order array

        const fieldsOrderSnapshot = await get(
          ref(database, `forms/${params.formId}/fieldsOrder`)
        );

        let fieldsOrderArr: string[] = [];

        if (fieldsOrderSnapshot.exists()) {
          fieldsOrderArr = [...fieldsOrderSnapshot.val()];
          fieldsOrderArr.push(newFieldKey);
        } else fieldsOrderArr = [newFieldKey];

        update(ref(database), {
          [`forms/${params.formId}/fieldsOrder`]: fieldsOrderArr,
        });

        break;
      }
      case "DELETE": {
        // Deleting field answers in each form answers set

        const answers = await get(
          ref(database, `formsAnswers/${params.formId}`)
        );

        answers.forEach((child) => {
          const answersSetId: string = child.val().slice(-1)[0];

          remove(
            ref(
              database,
              `formsAnswers/${params.formId}/${answersSetId}/${formDataObj.fieldId}`
            )
          );
        });

        // Deleting form field
        remove(
          ref(database, `formsFields/${params.formId}/${formDataObj.fieldId}`)
        );

        // Deleting field id in fields order array

        const fieldsOrderSnapshot = await get(
          ref(database, `forms/${params.formId}/fieldsOrder`)
        );

        let fieldsOrderArr: string[] = fieldsOrderSnapshot
          .val()
          .filter((id: string) => id !== formDataObj.fieldId);

        update(ref(database), {
          [`forms/${params.formId}/fieldsOrder`]: fieldsOrderArr,
        });

        break;
      }

      case "PATCH": {
        // Updating field

        set(
          ref(database, `formsFields/${params.formId}/${formDataObj.fieldId}`),
          {
            fieldType: formDataObj.fieldType,
            id: formDataObj.fieldId,
            title: formDataObj.title,
            ...(formDataObj.required
              ? { required: true }
              : { required: false }),
            ...(formDataObj.attributes && {
              attributes: formDataObj.attributes,
            }),
          }
        );
        break;
      }
    }

    console.log("Succes!");
    return { ok: true };
  } catch (error) {
    console.error(error);
  }
  return null;
};
