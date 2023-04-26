// Functions & Hooks
import { useFetcher } from "react-router-dom";

const FormHeader = ({
  title,
  description,
  isBeingEdited,
}: {
  title: string;
  description: string;
  isBeingEdited: boolean;
}) => {
  const fetcher = useFetcher();
  return (
    <>
      {!isBeingEdited && (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      )}
      {isBeingEdited && <fetcher.Form></fetcher.Form>}
    </>
  );
};

export default FormHeader;
