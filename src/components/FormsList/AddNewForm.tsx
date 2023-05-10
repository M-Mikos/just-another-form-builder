import { Form } from "react-router-dom";

const AddNewForm = (props: { toggleModal: () => void }): JSX.Element => {
  return (
    <>
      <h3 className="mb-6 text-xl font-bold">Add new form</h3>
      <Form
        className="flex w-72 flex-col gap-3"
        method="POST"
        action="/"
        onSubmit={props.toggleModal}
      >
        <div>
          <input
            className="input-text peer"
            name="formTitle"
            type="text"
            autoComplete="off"
            placeholder="Form name"
            required
          />
          <div className="input-text__underline" />
        </div>
        <div>
          <textarea
            className="input-text peer h-24 resize-none overflow-x-auto"
            name="formDescription"
            placeholder="Form description"
            autoComplete="off"
          />
          <div className="input-text__underline -mt-1" />
        </div>

        <button className="btn--strong" type="submit">
          <span className="material-symbols-outlined ">add</span>
          Create
        </button>
      </Form>
    </>
  );
};

export default AddNewForm;
