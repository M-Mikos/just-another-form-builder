// Functions & Hooks
import toPascalCase from "../../helpers/toPascalCase";

// TS Types
import {
  AnswerType,
  ComponentListType,
  FormFieldType,
  FormType,
} from "../../types/types";

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
  components: ComponentListType;
}

const AnswersByField = (props: PropsTypes): JSX.Element => {
  return (
    <>
      <h3 className="text-xl">Answers - by field</h3>
      <ul className="flex flex-col gap-6">
        {Object.values(props.formFields).map((field) => {
          // Get answers array
          const answersList = Object.values(props.formAnswers).map(
            (fieldAnswers) => fieldAnswers[field.id]
          );

          // Select answer component according to field type
          const FieldComponentName =
            props.components[toPascalCase(field.fieldType) + "AnswerElement"];
          return (
            <li>
              <Card>
                <div className="p-6">
                  <h4 className="mb-6  text-stone-800">{field.title}</h4>
                  <FieldComponentName key={field.id} answers={answersList} />
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
