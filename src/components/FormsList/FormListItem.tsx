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
      <div className="h-40 bg-emerald-500"></div>
      <div className="p-6">
        <Link to={`/${props.id}`}>
          <h3 className="text-xl font-bold hover:text-emerald-500">
            {props.title}
          </h3>{" "}
        </Link>

        <div>{props.description}</div>
        <span className="text-xs">ID: {props.id}</span>
        <button className="p-2" onClick={deleteFormHandler}>
          Delete
        </button>
      </div>
    </>
  );
};

export default FormListItem;
