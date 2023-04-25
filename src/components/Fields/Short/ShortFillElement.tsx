const ShortFillElement = (props: { inputName: string }) => {
  return (
    <div>
      <h3>Label</h3>
      <span>Required</span>
      <input name={props.inputName} type="text"></input>
      <span>Error message</span>
    </div>
  );
};

export default ShortFillElement;
