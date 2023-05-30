// Components
import ChoiceFillElement from "../Common/ChoiceFillElement";

interface PropsTypes {
  name: string;
  attributes: { options: string[]; isAnotherAnswerEnabled: boolean };
}

const SingleChoiceFillElement = (props: PropsTypes): JSX.Element => {
  return (
    <ChoiceFillElement
      name={props.name}
      inputType="SingleChoice"
      attributes={props.attributes}
    />
  );
};

export default SingleChoiceFillElement;
