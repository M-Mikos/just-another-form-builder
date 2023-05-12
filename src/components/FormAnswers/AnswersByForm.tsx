// Functions & Hooks
import renderReactComponentByName from "../../helpers/renderReactComponentByName";
import toPascalCase from "../../helpers/toPascalCase";

// TS Types
import { AnswerType, FormFieldType, FormType } from "../../types/types";

// Components
import Card from "../UI/Card";

// TS Interfaces declaration
interface PropsTypes {
  formDetails: FormType;
  formFields: {
    [key: string]: FormFieldType;
  };
  formAnswers: {
    [key: string]: AnswerType;
  };
  components: { [key: string]: React.ComponentType<{ answers: AnswerType[] }> };
}

const AnswersByForm = (props: PropsTypes) => {
  return (
    <>
      <h3 className="text-xl">Answers - by form</h3>

      {Object.values(props.formAnswers).map((answers, i) => {
        return (
          <Card>
            <div className="p-6">
              <h4 className="mb-6  text-stone-800">Form number {i + 1}</h4>
              <ul className="flex flex-col gap-6">
                {Object.entries(answers).map((field) => {
                  // Get current field details (by matching fieldId in answers to fieldId in from details)
                  const fieldDetails = Object.values(props.formFields).filter(
                    (fieldDetail) => fieldDetail.id === field[0]
                  )[0];

                  return (
                    <li key={fieldDetails.id}>
                      {renderReactComponentByName(
                        fieldDetails.fieldType,
                        "Answer",
                        props.components,
                        { answers: [field[1]] }
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default AnswersByForm;
