// Types
import { AnswerType } from "../../../types/types";

const ShortAnswerElement = ({
  title,
  answers,
}: {
  title: string;
  answers: AnswerType[];
}) => {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {answers.map((answer) => {
          return <li className="text-sm text-stone-700">{answer} </li>;
        })}
      </ul>
    </div>
  );
};

export default ShortAnswerElement;
