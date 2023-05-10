const ShortFillElement = (props: { inputName: string; required: boolean }) => {
  return (
    <div>
      <input
        placeholder="Your answer"
        className="input-text peer"
        autoComplete="off"
        name={props.inputName}
        type="text"
        {...(props.required && { required: "required" })}
      />
      <div className="input-text__underline" />
    </div>
  );
};

export default ShortFillElement;
