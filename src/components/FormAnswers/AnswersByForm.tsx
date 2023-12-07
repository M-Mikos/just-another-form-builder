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

const AnswersByForm = (props: PropsTypes): JSX.Element => {
  return (
    <>
      <h3 className="text-xl">Answers - by form</h3>

      {Object.entries(props.formAnswers).map((answers, i) => {
        return (
          <Card key={i}>
            <div className="p-6">
              <h4 className="mb-6  text-stone-800">Form number {i + 1}</h4>

              <ul className="flex flex-col gap-1">
                {Object.values(answers[1]).map((answer) => (
                  <li key={answer} className="rounded bg-stone-50 p-2 text-sm">
                    <span></span>
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default AnswersByForm;
