// Functions & Hooks
import { useState } from "react";
import { useLoaderData } from "react-router";
import generateColorClass from "../../helpers/generateColorClass";

// TS Types
import { AnswerType, FormLoaderType } from "../../types/types";

// Components
import AnswersByField from "./AnswersByField";
import AnswersByForm from "./AnswersByForm";
import ShortAnswerElement from "../Fields/Short/ShortAnswersElement";
import ParagraphAnswerElement from "../Fields/Paragraph/ParagraphAnswersElement";
import Card from "../UI/Card";
import NoiseTexture from "../Decorative/NoiseTexture";

const components: {
  [key: string]: React.ComponentType<{ answers: AnswerType[] }>;
} = {
  ShortAnswerElement,
  ParagraphAnswerElement,
};

const FormAnswers = (): JSX.Element => {
  const [answersMode, setAnswersMode] = useState<string>("fields");

  const { formDetails, formFields, formAnswers } =
    useLoaderData() as FormLoaderType;

  const fieldsButtonHandler = (): void => {
    setAnswersMode("fields");
  };
  const formsButtonHandler = (): void => {
    setAnswersMode("forms");
  };

  return (
    <div className="flex flex-col gap-6">
      <Card
        className={
          "relative p-6 text-white " +
          generateColorClass("gradient", formDetails.tagColor)
        }
      >
        <NoiseTexture />
        <h2 className="relative">Answers</h2>
        <div className="relative">
          {formAnswers && (
            <div className="flex justify-center gap-4 text-sm ">
              <button
                className={
                  "border-b-2 border-transparent px-4 py-2 opacity-80 hover:bg-white/30" +
                  (answersMode === "fields" && " border-white opacity-100")
                }
                onClick={fieldsButtonHandler}
              >
                Fields
              </button>
              <button
                className={
                  "border-b-2 border-transparent px-4 py-2 opacity-80 hover:bg-white/30" +
                  (answersMode === "forms" && " border-white opacity-100")
                }
                onClick={formsButtonHandler}
              >
                Forms
              </button>
            </div>
          )}
        </div>
      </Card>
      {formAnswers && (
        <div className="flex flex-col gap-6">
          {answersMode === "fields" && (
            <AnswersByField
              formDetails={formDetails}
              formFields={formFields}
              formAnswers={formAnswers}
            />
          )}
          {answersMode === "forms" && (
            <AnswersByForm
              formDetails={formDetails}
              formFields={formFields}
              formAnswers={formAnswers}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FormAnswers;
