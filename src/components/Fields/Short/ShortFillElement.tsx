const ShortFillElement = (props: { [key: string]: string }): JSX.Element => {
  return (
    <div>
      <input
        placeholder="Your answer"
        className="input-text peer"
        autoComplete="off"
        type="text"
        {...props}
      />
      <div className="input-text__underline" />
    </div>
  );
};

export default ShortFillElement;
