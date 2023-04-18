// Router
import { Link } from "react-router-dom";

const FormListItem = (props: {
  title: string;
  description: string;
  id: string;
}) => {
  return (
    <>
      <Link to={`/${props.title}`}>
        {" "}
        <h3>{props.title}</h3>{" "}
      </Link>

      <span>{props.description}</span>
      <span>ID: {props.id}</span>
    </>
  );
};

export default FormListItem;
