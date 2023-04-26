// Functions & Hooks
import { useState } from "react";
import { useLoaderData } from "react-router";

// Types
import { AnswerLoaderType, ComponentListType } from "../../types/types";

// Components
import AnswersByField from "./AnswersByField";
import AnswersByForm from "./AnswersByForm";

import ShortAnswerElement from "../Fields/Short/ShortAnswersElement";

const components: ComponentListType = {
  ShortAnswerElement,
};

const FormAnswers = () => {
  const [answersType, setAnswersType] = useState("fields");
  const { formDetails, answers } = useLoaderData() as AnswerLoaderType;

  const fieldsButtonHandler = () => {
    setAnswersType("fields");
  };
  const formsButtonHandler = () => {
    setAnswersType("forms");
  };

  return (
    <>
      {answers && (
        <>
          <button onClick={fieldsButtonHandler}>Fields</button>
          <button onClick={formsButtonHandler}>Forms</button>
          {answersType === "fields" && (
            <AnswersByField
              formDetails={formDetails}
              answers={answers}
              components={components}
            />
          )}
          {answersType === "forms" && (
            <AnswersByForm
              formDetails={formDetails}
              answers={answers}
              components={components}
            />
          )}
        </>
      )}
    </>
  );
};

export default FormAnswers;
