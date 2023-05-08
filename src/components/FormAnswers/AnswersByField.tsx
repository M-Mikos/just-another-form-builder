// Functions & Hooks
import toPascalCase from "../../helpers/toPascalCase";

// Types
import { AnswerComponentPropsType } from "../../types/types";
import Card from "../UI/Card";

const AnswersByField = ({
  formFields,
  formAnswers,
  components,
}: AnswerComponentPropsType) => {
  return (
    <>
      <h3>Answers - by field</h3>
      <ul className="flex flex-col gap-6">
        {Object.values(formFields).map((field) => {
          // Get answers array
          const answersList = Object.values(formAnswers).map(
            (fieldAnswers) => fieldAnswers[field.id]
          );

          // Select answer component according to field type
          const FieldComponentName =
            components[toPascalCase(field.fieldType) + "AnswerElement"];

          return (
            <li>
              <FieldComponentName
                key={field.id}
                title={field.title}
                answers={answersList}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AnswersByField;
