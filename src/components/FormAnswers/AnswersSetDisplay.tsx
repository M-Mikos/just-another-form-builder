const AnswersSetDisplay = (props: { answers: string[] }): JSX.Element => {
  console.log(props.answers);
  const tryParseData = (answer: string): string[] | string => {
    if (answer.charAt(0) === "[") {
      return JSON.parse(answer);
    }
    return answer;
  };

  const answersList = props.answers
    .map((answer: string) => tryParseData(answer))
    .flat()
    .filter(Boolean);

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
    <ul className="flex flex-col gap-1">
      {Object.keys(countedAnswers).map((answer, i): JSX.Element | undefined => {
        if (!answer) return;
        return (
          <li key={i} className="rounded bg-stone-50 p-2 text-sm">
            {answer}
          </li>
        );
      })}
    </ul>
  );

  const answersBarChartElement = (countedAnswers: {
    [key: string]: number;
  }): JSX.Element => {
    const maxValue: number = Math.max(...Object.values(countedAnswers));
    const answersNumber: number = Object.values(countedAnswers).length;
    const allAnswersCount: number = Object.values(countedAnswers).reduce(
      (sum, num) => {
        return sum + num;
      },
      0
    );

    return (
      <div className="h-90 w-full overflow-y-auto overflow-x-hidden">
        <svg
          className="w-[100%]"
          viewBox={`0 0 600 ${answersNumber * 50 + 15}`}
        >
          <line
            x1="195"
            y1="0"
            x2="195"
            y2={answersNumber * 50}
            stroke="grey"
          />
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <line
                key={i}
                x1={32 * (i + 1) + 200}
                y1="0"
                x2={32 * (i + 1) + 200}
                y2={answersNumber * 50}
                stroke="#f0f0f0"
              />
            ))}
          <line x1="195" y1="0" x2="520" y2="0" stroke="#f0f0f0" />
          <line
            x1="195"
            y1={answersNumber * 50}
            x2="520"
            y2={answersNumber * 50}
            stroke="#f0f0f0"
          />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <text
                key={i}
                fontSize="10"
                fill="#7dd3fc"
                x={197 + (i + 1) * 64}
                y={answersNumber * 50 + 12}
              >
                {(maxValue * (i + 1)) / 5}
              </text>
            ))}
          {Object.keys(countedAnswers).map((answer, i) => (
            <g key={answer}>
              <rect
                width={(countedAnswers[answer] / maxValue) * 320}
                height="30"
                x={200}
                y={i * 50 + 12.5}
                fill="#0284c7"
                rx="4"
              />
              <rect
                width={(countedAnswers[answer] / maxValue) * 320}
                height="30"
                x={198}
                y={i * 50 + 10.5}
                fill="#0ea5e9"
                className="hover:fill-sky-300"
                rx="4"
              />
              <line
                x1="0"
                y1={42 + i * 50}
                x2="180"
                y2={42 + i * 50}
                stroke="#e0e0e0"
              />
              <text fontSize="10" x="0" y={20 + 12.5 + i * 50}>
                {answer.length > 30 ? `${answer.slice(0, 30)}...` : answer}
              </text>
              <text
                fontSize="10"
                x={210 + (countedAnswers[answer] / maxValue) * 320}
                y={30 + i * 50}
              >
                {countedAnswers[answer]} (
                {Math.round((countedAnswers[answer] / allAnswersCount) * 100)}
                %)
              </text>
              <title>
                {answer} (Count: {countedAnswers[answer]})
              </title>
            </g>
          ))}
        </svg>
      </div>
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
