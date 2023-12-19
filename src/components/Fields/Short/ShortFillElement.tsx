interface PropsTypes {
  name: string;
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
  required: boolean;
  validate: (isValid: boolean) => void;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const ShortFillElement = (props: PropsTypes): JSX.Element => {
  const requiredAttributes = {
    required: props.required,
    onChange: props.onChange,
    onBlur: props.onBlur,
  };
  return (
    <div>
      <input
        name={props.name}
        placeholder="Your answer"
        className="input-text peer"
        autoComplete="off"
        type="text"
        {...requiredAttributes}
      />
      <div className="input-text__underline" />
    </div>
  );
};

export default ShortFillElement;
