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
}

const AnswersByField = (props: PropsTypes): JSX.Element => {
  return (
    <>
      <h3 className="text-xl">Answers - by field</h3>
      <ul className="flex flex-col gap-6">
        {props.formDetails.fieldsOrder &&
          props.formDetails.fieldsOrder.map((fieldId: string) => {
            // Get answers array
            const answersList = Object.values(props.formAnswers).map(
              (fieldAnswers) => fieldAnswers[fieldId]
            );
            return (
              <li key={fieldId}>
                <Card>
                  <div className="p-6">
                    <h4 className="mb-6  text-stone-800">
                      {props.formFields[fieldId].title}
                    </h4>
                    {answersList.map((answer) => (
                      <p>{answer}</p>
                    ))}
                    {answersList.length === 0 && (
                      <span className="text-xs">
                        This question has not yet been answered
                      </span>
                    )}
                  </div>
                </Card>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default AnswersByField;
