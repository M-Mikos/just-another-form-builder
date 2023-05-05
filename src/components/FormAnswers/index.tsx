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
    <>
      {formAnswers && (
        <>
          <button onClick={fieldsButtonHandler}>Fields</button>
          <button onClick={formsButtonHandler}>Forms</button>
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
        </>
      )}
    </>
  );
};

export default FormAnswers;
