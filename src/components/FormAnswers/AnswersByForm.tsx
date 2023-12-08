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
  const formatAnswer = (answer: string): string | JSX.Element => {
    if (!answer || answer === "[]")
      return <span className="text-stone-400">No answer</span>;
    if (answer.charAt(0) === "[")
      return answer.substring(2, answer.length - 2).replace('","', ", ");
    return answer;
  };

  return (
    <>
      <h3 className="text-xl">Answers - by form</h3>

      {Object.entries(props.formAnswers).map((answers, i) => (
        <Card key={i}>
          <div className="p-6">
            <h4 className="mb-6  text-stone-800">Form number {i + 1}</h4>

            <ul className="flex flex-col gap-1">
              {Object.values(answers[1]).map((answer, i) => {
                return (
                  <li key={i} className="rounded bg-stone-50 p-2 text-sm">
                    <p className="mb-2 text-stone-500">
                      {Object.entries(props.formFields)[i][1].title}
                    </p>
                    {formatAnswer(answer)}
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      ))}
    </>
  );
};

export default AnswersByForm;
