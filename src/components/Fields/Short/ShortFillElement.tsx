const ShortFillElement = (props: {
  inputName: string;
  required: boolean;
  validateOnEventHandler: () => {};
}): JSX.Element => {
  return (
    <div>
      <input
        placeholder="Your answer"
        className="input-text peer"
        autoComplete="off"
        name={props.inputName}
        type="text"
        {...(props.required && {
          required: true,
          onChange: props.validateOnEventHandler,
          onBlur: props.validateOnEventHandler,
        })}
      />
      <div className="input-text__underline" />
    </div>
  );
};

export default ShortFillElement;
