// Functions & Hooks
import { useState } from "react";
import { useLoaderData } from "react-router";

// Types
import { FormType } from "../../types/types";
import { AnswerType } from "../../types/types";

// Components
import AnswersByField from "./AnswersByField";
import AnswersByForm from "./AnswersByForm";

import ShortAnswerElement from "../Fields/Short/ShortAnswersElement";

const components: { [key: string]: React.FC } = {
  ShortAnswerElement,
};

const FormAnswers = () => {
  const [answersType, setAnswersType] = useState("fields");
  const { formDetails, answers } = useLoaderData();

  const fieldsButtonHandler = () => {
    setAnswersType("fields");
  };
  const formsButtonHandler = () => {
    setAnswersType("forms");
  };

  return (
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
  );
};

export default FormAnswers;
