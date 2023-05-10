// Functions & hooks
import ReactDOM from "react-dom";

// TS Interfaces declaration
interface PropsTypes {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  toggleModal: () => void;
}

function Modal(props: PropsTypes): JSX.Element {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center overflow-hidden">
          <div
            onClick={props.toggleModal}
            className="bg-transpare fixed left-0 top-0 z-40 h-full w-full overflow-hidden bg-black/80"
          ></div>

          <div className="relative z-50 m-6 flex flex-col items-center justify-center gap-6 rounded-lg bg-white">
            <button
              onClick={props.toggleModal}
              className="btn--light m-2 mb-0 self-end p-0"
            >
              <span className="material-symbols-outlined ">close</span>
            </button>
            <div className="p-6 pt-0">{props.children}</div>
          </div>
        </div>,
        document.getElementById("modal-root") as Element
      )}
    </>
  );
}
export default Modal;
