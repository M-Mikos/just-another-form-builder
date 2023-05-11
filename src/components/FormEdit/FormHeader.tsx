// Functions & Hooks
import { useFetcher } from "react-router-dom";

// TS Interfaces declaration
interface PropsTypes {
  title: string;
  description?: string;
}

const FormHeader = (props: PropsTypes): JSX.Element => {
  const fetcher = useFetcher();
  return (
    <>
      <input
        name="formTitle"
        className="input-text peer relative -ml-3 border-b-0 bg-transparent text-3xl font-bold  text-white placeholder-stone-200 hover:bg-stone-100/20 focus-visible:bg-stone-100/10"
        type="text"
        placeholder="Type form title here..."
        autoComplete="off"
        defaultValue={props.title}
        required
      />
      <div className="input-text__underline -ml-3 bg-white" />
      <textarea
        name="formDescription"
        autoComplete="off"
        className="input-text peer relative -ml-3 h-24 resize-none overflow-x-auto border-b-0 bg-transparent text-white placeholder-stone-200 hover:bg-stone-100/20 focus-visible:bg-stone-100/10"
        placeholder="Type form description here..."
        {...(props.description && { defaultValue: props.description })}
      />
    </>
  );
};

export default FormHeader;
