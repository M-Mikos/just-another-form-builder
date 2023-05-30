// Components
import ChoiceEditElement from "../Common/ChoiceEditElement";

interface PropsTypes {
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
}

const MultipleChoiceEditElement = (props: PropsTypes): JSX.Element => {
  return (
    <ChoiceEditElement
      inputType="MultipleChoice"
      attributes={props.attributes}
    />
  );
};

export default MultipleChoiceEditElement;
