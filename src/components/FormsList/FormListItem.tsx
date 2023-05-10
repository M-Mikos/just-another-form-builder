// Functions & hooks
import { Link, useFetcher } from "react-router-dom";

const FormListItem = (props: {
  title: string;
  description: string;
  id: string;
  tagColor: string;
}) => {
  const fetcher = useFetcher();

  const deleteFormHandler = (): void => {
    fetcher.submit({ formId: props.id }, { method: "DELETE", action: `/` });
  };

  const color: string = "bg-" + props.tagColor + "-500";

  return (
    <>
      <div
        className={
          "flex h-40 items-center  justify-center overflow-hidden rounded-t-[6px] " +
          color
        }
      >
        <span className="material-symbols-outlined  text-[6rem] text-white opacity-70">
          list_alt
        </span>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <Link to={`/${props.id}`}>
          <h3 className="text-lg font-bold hover:text-emerald-500">
            {props.title}
          </h3>
        </Link>
        <div className="group flex w-fit items-center self-end overflow-hidden">
          <span className="material-symbols-outlined flex cursor-default py-2 opacity-50">
            more_vert
          </span>
          <div className="flex w-0 items-center gap-6 transition-all duration-300 group-hover:w-20 ">
            <button className="btn--light" onClick={deleteFormHandler}>
              <span className="material-symbols-outlined ">delete</span>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormListItem;
