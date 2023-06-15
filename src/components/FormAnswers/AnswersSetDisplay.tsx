// TS Types
import { AnswerValueType } from "../../types/types";

const AnswersSetDisplay = (props: { answers: string[] }): JSX.Element => {
  const tryParseData = (answer: AnswerValueType) => {
    if (answer.charAt(0) === "[") {
      return JSON.parse(answer);
    }
    return answer;
  };

  const answersList = props.answers
    .map((answer) => tryParseData(answer))
    .flat();

  const countedAnswers = answersList.reduce((sum, answer) => {
    console.log("reducer:", sum);
    const answers;
    const answers = answers[answer] ? answers[answer]++ : (answers[answer] = 1);
    return answers;
  }, {});

  console.log(answersList, countedAnswers);

  return (
    <>
      <p>{props.answers}</p>
    </>
  );
};

export default AnswersSetDisplay;
