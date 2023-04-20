// Router
import { Link } from "react-router-dom";

const FormListItem = (props: {
  title: string;
  description: string;
  id: string;
}) => {
  return (
    <>
      <Link to={`/${props.id}`}>
        <h3>{props.title}</h3>{" "}
      </Link>

      <div>{props.description}</div>
      <span>ID: {props.id}</span>
    </>
  );
};

export default FormListItem;
