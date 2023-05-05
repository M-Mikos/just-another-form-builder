// Types
import { AnswerType } from "../../../types/types";

const ParagraphAnswerElement = ({
  title,
  answers,
}: {
  title: string;
  answers: AnswerType[];
}) => {
  return (
    <div>
      <p>{title}</p>
      <p>
        {answers.map((answer) => {
          return <span>{answer}, </span>;
        })}
      </p>
    </div>
  );
};

export default ParagraphAnswerElement;
