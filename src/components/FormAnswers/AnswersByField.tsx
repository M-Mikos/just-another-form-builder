// Functions & Hooks
import toPascalCase from "../../helpers.ts/toPascalCase";

// Types
import { AnswerComponentPropsType } from "../../types/types";

const AnswersByField = ({
  formDetails,
  answers,
  components,
}: AnswerComponentPropsType) => {
  return (
    <>
      <h3>Answers - by field</h3>

      {Object.values(formDetails.fields).map((field) => {
        // Get answers array
        const answersList = Object.values(answers).map(
          (fieldAnswers) => fieldAnswers[field.id]
        );

        // Select answer component according to field type
        const FieldComponentName =
          components[toPascalCase(field.fieldType) + "AnswerElement"];

        return (
          <FieldComponentName
            key={field.id}
            title={field.title}
            answers={answersList}
          />
        );
      })}
    </>
  );
};

export default AnswersByField;
