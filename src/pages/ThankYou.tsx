import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ThankYou = (): JSX.Element => {
  const { formId } = useParams();
  const { authorId } = useParams();

  return (
    <div className=" flex h-96 w-full flex-col items-center justify-center">
      <h2>Thank you for submitting the form!</h2>
      <Link to={`/${authorId}/${formId}/fill`}>
        <p className="text-sky-500 hover:text-sky-700">Submit another reply</p>
      </Link>
    </div>
  );
};

export default ThankYou;
