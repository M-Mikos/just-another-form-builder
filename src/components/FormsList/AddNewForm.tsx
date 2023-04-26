import { Form } from "react-router-dom";

const AddNewForm = () => {
  return (
    <Form method="POST" action="/">
      <input name="formTitle" type="text" />
      <textarea name="formDescription" />
      <button type="submit">Create</button>
    </Form>
  );
};

export default AddNewForm;
