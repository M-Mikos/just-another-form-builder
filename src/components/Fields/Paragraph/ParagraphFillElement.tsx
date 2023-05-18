const ParagraphFillElement = (props: {
  [key: string]: string;
}): JSX.Element => {
  return (
    <div>
      <textarea
        name={props.inputName}
        placeholder="Your answer"
        className="input-text peer h-20 w-full"
        autoComplete="off"
        {...props}
      />
      <div className="input-text__underline" />
    </div>
  );
};

export default ParagraphFillElement;
