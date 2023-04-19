import { database } from "../../../../firebase";

const FormElement = () => {
  console.log(database);
  return (
    <div>
      <code>Tu będzie obiekt formularza</code>
    </div>
  );
};

export default FormElement;
