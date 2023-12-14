// Components
import ChoiceFillElement from "../Common/ChoiceFillElement";

interface PropsTypes {
  name: string;
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
  required: boolean;
  validate: (isValid: boolean) => void;
}

const MultipleChoiceFillElement = (props: PropsTypes): JSX.Element => {
  return <ChoiceFillElement inputType="MultipleChoice" {...props} />;
};

export default MultipleChoiceFillElement;
