// Functions & Hooks
import toPascalCase from "../../helpers/toPascalCase";

// Types
import { AnswerComponentPropsType } from "../../types/types";

const AnswersByField = ({
  formFields,
  formAnswers,
  components,
}: AnswerComponentPropsType) => {
  return (
    <>
      <h3>Answers - by field</h3>

      {Object.values(formFields).map((field) => {
        // Get answers array
        const answersList = Object.values(formAnswers).map(
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
