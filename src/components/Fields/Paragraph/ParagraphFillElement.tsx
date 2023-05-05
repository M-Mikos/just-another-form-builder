const ShortFillElement = (props: { inputName: string }) => {
  return (
    <div>
      <h3>Label</h3>
      <span>Required</span>
      <textarea name={props.inputName} rows="4" cols="50" />
      <span>Error message</span>
    </div>
  );
};

export default ShortFillElement;
