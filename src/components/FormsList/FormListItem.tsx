// Router
import { Link, useFetcher } from "react-router-dom";

const FormListItem = (props: {
  title: string;
  description: string;
  id: string;
}) => {
  const fetcher = useFetcher();

  const deleteFormHandler = (): void => {
    fetcher.submit({ formId: props.id }, { method: "DELETE", action: `/` });
  };

  return (
    <>
      <Link to={`/${props.id}`}>
        <h3>{props.title}</h3>{" "}
      </Link>

      <div>{props.description}</div>
      <span>ID: {props.id}</span>
      <button onClick={deleteFormHandler}>Delete</button>
    </>
  );
};

export default FormListItem;
