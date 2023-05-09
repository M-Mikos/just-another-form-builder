// Functions & Hooks
import { useState } from "react";
import { useLoaderData } from "react-router";

// Types
import { ComponentListType, FormLoaderType } from "../../types/types";

// Components
import AnswersByField from "./AnswersByField";
import AnswersByForm from "./AnswersByForm";

import ShortAnswerElement from "../Fields/Short/ShortAnswersElement";
import ParagraphAnswerElement from "../Fields/Paragraph/ParagraphAnswersElement";
import Card from "../UI/Card";

const components: ComponentListType = {
  ShortAnswerElement,
  ParagraphAnswerElement,
};

const FormAnswers = () => {
  const [answersMode, setAnswersMode] = useState("fields");
  const { formDetails, formFields, formAnswers } =
    useLoaderData() as FormLoaderType;

  const fieldsButtonHandler = () => {
    setAnswersMode("fields");
  };
  const formsButtonHandler = () => {
    setAnswersMode("forms");
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="p-6">
          <h2>answers</h2>
          <div>
            {formAnswers && (
              <div className="flex justify-center gap-4">
                <button onClick={fieldsButtonHandler}>Fields</button>
                <button onClick={formsButtonHandler}>Forms</button>
              </div>
            )}
          </div>
        </div>
      </Card>
      {formAnswers && (
        <div className="flex flex-col gap-6">
          {answersMode === "fields" && (
            <AnswersByField
              formFields={formFields}
              formAnswers={formAnswers}
              components={components}
            />
          )}
          {answersMode === "forms" && (
            <AnswersByForm
              formFields={formFields}
              formAnswers={formAnswers}
              components={components}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FormAnswers;
