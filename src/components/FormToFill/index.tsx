// Functions & Hooks
import { Params, useLoaderData, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import generateColorClass from "../../helpers/generateColorClass";
import { useState } from "react";

// Components
import { Form } from "react-router-dom";
import Card from "../UI/Card";
import FieldFillWrapper from "./FieldFillWrapper";
import NoiseTexture from "../Decorative/NoiseTexture";
import FormNavigation from "../FormNavigation";

// Types
import { FormLoaderType } from "../../types/types";

const FormToFill = (): JSX.Element => {
  const { formDetails, formFields } = useLoaderData() as FormLoaderType;
  const params = useParams() as Params<string>;
  const { user } = useAuth() as { user: any };
  const [isShared, setIsShared] = useState<boolean>(false);

  const shareHandler = () => {
    // Copy URL to clipboard
    const url = location.href;
    navigator.clipboard.writeText(url);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 3000);
  };

  return (
    <>
      {user && <FormNavigation />}
      {user && (
        <Card className="mb-6 p-6">
          <div className=" flex justify-center" onClick={shareHandler}>
            {isShared ? (
              <p className="flex items-center gap-4 text-stone-500">
                <span className="material-symbols-outlined ">done</span>Link
                copied!
              </p>
            ) : (
              <p className="flex cursor-pointer items-center gap-4 text-stone-500 hover:text-sky-500">
                <span className="material-symbols-outlined ">share</span>Share
                this form to collect responses
              </p>
            )}
          </div>
        </Card>
      )}

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
