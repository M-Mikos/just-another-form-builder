// Functions & hooks
import { Link, useFetcher } from "react-router-dom";
import generateColorClass from "../../helpers/generateColorClass";

// Components
import NoiseTexture from "../Decorative/NoiseTexture";

const FormListItem = (props: {
  title: string;
  description: string;
  id: string;
  tagColor: string;
}): JSX.Element => {
  const fetcher = useFetcher();

  const deleteFormHandler = (): void => {
    fetcher.submit({ formId: props.id }, { method: "DELETE", action: `/` });
  };

  return (
    <>
      <Link to={`/${props.id}`}>
        <div
          className={
            "relative flex h-40 items-center justify-center overflow-hidden rounded-t-[6px]" +
            " " +
            generateColorClass("gradient", props.tagColor)
          }
        >
          <span className="material-symbols-outlined  z-20 text-[6rem] text-white opacity-70">
            list_alt
          </span>
          <NoiseTexture />
        </div>
      </Link>
      <div className="flex h-full flex-col justify-between gap-2 p-4 pb-3">
        <div>
          <Link to={`/${props.id}`}>
            <h3 className="text-lg font-bold transition hover:text-sky-500">
              {props.title}
            </h3>
          </Link>
          <p className="text-xs text-stone-400">
            {props.description.slice(0, 80) +
              (props.description.length > 80 ? "..." : "")}
          </p>
        </div>

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
