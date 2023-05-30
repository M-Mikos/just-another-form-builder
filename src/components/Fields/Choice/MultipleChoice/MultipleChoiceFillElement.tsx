// Components
import ChoiceFillElement from "../Common/ChoiceFillElement";

interface PropsTypes {
  name: string;
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
}

const MultipleChoiceFillElement = (props: PropsTypes): JSX.Element => {
  return (
    <ChoiceFillElement
      name={props.name}
      inputType="MultipleChoice"
      attributes={props.attributes}
    />
  );
};

export default MultipleChoiceFillElement;
