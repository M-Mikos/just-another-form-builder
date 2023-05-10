// Functions & hooks
import { Link, useFetcher } from "react-router-dom";
import generateColorClass from "../../helpers/generateColorClasses";

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

  const formBgGradient: string = ` bg-gradient-to-t ${generateColorClass(
    "from",
    props.tagColor
  )} ${generateColorClass("to", props.tagColor)} `;

  return (
    <>
      <div
        className={
          "relative flex h-40 items-center justify-center overflow-hidden rounded-t-[6px]" +
          " " +
          formBgGradient
        }
      >
        <span className="material-symbols-outlined  z-20 text-[6rem] text-white opacity-70">
          list_alt
        </span>
        <svg id="turbulence" className="absolute z-10 h-full w-full opacity-30">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              numOctaves="3"
              baseFrequency=".5"
              stitchTiles="stitch"
            ></feTurbulence>
            {/* <feColorMatrix
              values="0 0 0 8 -3.5
                      0 0 0 8 -3.5
                      0 0 0 8 -3.5
                      0 0 0 -1 1"
            /> */}
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"></rect>
        </svg>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <Link to={`/${props.id}`}>
          <h3 className="text-lg font-bold transition hover:text-sky-500">
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
