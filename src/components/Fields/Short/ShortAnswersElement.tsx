const ShortAnswerElement = (props) => {
  return (
    <div>
      <p>{props.title}</p>
      <p>
        {props.answers.map((answer) => {
          return <span>{answer}, </span>;
        })}
      </p>
    </div>
  );
};

export default ShortAnswerElement;
