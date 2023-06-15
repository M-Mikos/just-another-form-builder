// TS Types
import { AnswerValueType } from "../../types/types";

const AnswersSetDisplay = (props: { answers: string[] }): JSX.Element => {
  const tryParseData = (answer: AnswerValueType): string[] | string => {
    if (answer.charAt(0) === "[") {
      return JSON.parse(answer);
    }
    return answer;
  };

  const answersList = props.answers
    .map((answer: string) => tryParseData(answer))
    .flat();

  const countedAnswers: { [key: string]: number } = answersList.reduce(
    (sum: { [key: string]: number }, answer: string) => {
      sum[answer] ? sum[answer]++ : (sum[answer] = 1);
      return sum;
    },
    {}
  );

  const isAnswerRepetition: boolean =
    Object.values(countedAnswers).filter((el) => el > 1).length !== 0;

  const answersListElement: JSX.Element = (
    <>
      {Object.keys(countedAnswers).map((answer) => (
        <p key={answer}>{answer}</p>
      ))}
    </>
  );

  const answersBarChartElement = (countedAnswers: {
    [key: string]: number;
  }): JSX.Element => {
    return (
      <>
        {Object.keys(countedAnswers).map((answer) => (
          <p key={answer}>
            <span>{answer}: </span>
            <span>{countedAnswers[answer]}</span>
          </p>
        ))}
      </>
    );
  };

  return (
    <>
      {isAnswerRepetition
        ? answersBarChartElement(countedAnswers)
        : answersListElement}
    </>
  );
};

export default AnswersSetDisplay;
