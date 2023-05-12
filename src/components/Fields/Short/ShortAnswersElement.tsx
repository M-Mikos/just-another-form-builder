// TS Types
import { AnswerType } from "../../../types/types";

const ShortAnswerElement = (props: { answers: AnswerType[] }): JSX.Element => {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {props.answers.map((answer) => {
          return <li className="text-sm text-stone-700">{answer}</li>;
        })}
      </ul>
    </div>
  );
};

export default ShortAnswerElement;
