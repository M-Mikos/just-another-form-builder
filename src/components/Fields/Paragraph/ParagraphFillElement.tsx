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

const ParagraphFillElement = (props: PropsTypes): JSX.Element => {
  const requiredAttributes = {
    required: props.required,
    onChange: props.onChange,
    onBlur: props.onBlur,
  };
  return (
    <div>
      <textarea
        name={props.name}
        placeholder="Your answer"
        className="input-text peer h-20 w-full"
        autoComplete="off"
        {...requiredAttributes}
      />
      <div className="input-text__underline" />
    </div>
  );
};

export default ParagraphFillElement;
