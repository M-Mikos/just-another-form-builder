// Components
import ChoiceEditElement from "../Common/ChoiceEditElement";

interface PropsTypes {
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
}

const SingleChoiceEditElement = (props: PropsTypes): JSX.Element => {
  return (
    <ChoiceEditElement
      inputType="SingleChoice"
      attributes={props.attributes}
    />
  );
};

export default SingleChoiceEditElement;
