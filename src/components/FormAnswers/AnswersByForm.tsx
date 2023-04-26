// Functions & Hooks
import toPascalCase from "../../helpers/toPascalCase";

// Types
import { AnswerComponentPropsType } from "../../types/types";

const AnswersByForm = ({
  formFields,
  formAnswers,
  components,
}: AnswerComponentPropsType) => {
  return (
    <>
      <h3>Answers - by form</h3>

      {Object.values(formAnswers).map((answers, i) => {
        return (
          <>
            <h4>Form number {i + 1}</h4>
            {Object.entries(answers).map((field) => {
              // Get current field details (by matching fieldId in answers to fieldId in from details)
              const fieldDetails = Object.values(formFields).filter(
                (fieldDetail) => fieldDetail.id === field[0]
              )[0];

              // Select answer component according to field type
              const FieldComponentName =
                components[
                  toPascalCase(fieldDetails.fieldType) + "AnswerElement"
                ];

              return (
                <FieldComponentName
                  key={fieldDetails.id}
                  title={fieldDetails.title}
                  answers={[field[1]]}
                />
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default AnswersByForm;
