const ParagraphFillElement = (props: { inputName: string }): JSX.Element => {
  return (
    <div>
      <textarea name={props.inputName} rows={4} cols={50} />
    </div>
  );
};

export default ParagraphFillElement;
