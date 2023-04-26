// Function & hooks
import { useFetcher, useParams } from "react-router-dom";

const ShortEditElement = ({ data }) => {
  const fetcher = useFetcher();
  const params = useParams();

  const deleteHandler = () => {
    fetcher.submit(
      { fieldId: data.id },
      {
        method: "delete",
        action: `/${params.formId}`,
      }
    );
  };
  return (
    <div>
      <p>{data.title}</p>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default ShortEditElement;
