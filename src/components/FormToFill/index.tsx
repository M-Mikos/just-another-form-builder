// Functions & Hooks
import { ActionFunction, useLoaderData, useParams } from "react-router";
import { Link, redirect } from "react-router-dom";
import { push, ref, set } from "firebase/database";
import generateColorClass from "../../helpers/generateColorClass";
import { useAuth } from "../../context/AuthContext";

// Types
import { FormLoaderType } from "../../types/types";

// Components
import { Form } from "react-router-dom";
import Card from "../UI/Card";
import FieldFillWrapper from "./FieldFillWrapper";
import NoiseTexture from "../Decorative/NoiseTexture";

// Data
import { database } from "../../../firebase";
import { useState } from "react";

const FormToFill = (): JSX.Element => {
  const { formDetails, formFields } = useLoaderData() as FormLoaderType;
  const params = useParams();
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  return (
    <>
      <Card
        className={
          "relative mb-6 p-6 text-white " +
          generateColorClass("gradient", formDetails.tagColor)
        }
      >
        <NoiseTexture className="" />
        <h2 className="relative z-20 text-3xl">{formDetails.title}</h2>
        <p className="relative z-20">{formDetails.description}</p>
      </Card>
      {formFields && (
        <Form method="put" action={`/${params.authorId}/${params.formId}/fill`}>
          <ul className="mb-6 flex flex-col gap-6">
            {formDetails.fieldsOrder &&
              formDetails.fieldsOrder.map((fieldId: string) => {
                return (
                  <li key={fieldId}>
                    <FieldFillWrapper data={formFields[fieldId]} />
                  </li>
                );
              })}
          </ul>

          <button className="btn--strong" type="submit">
            Send
          </button>
        </Form>
      )}
    </>
  );
};

export default FormToFill;
