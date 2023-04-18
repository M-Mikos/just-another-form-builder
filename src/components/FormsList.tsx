import FormListItem from "./FormListItem";

type FormField = {
  id: string;
  name: string;
  required: boolean;
  formElement: "input" | "textarea";
  type: null | "text" | "textarea" | "radio" | "range";
  value: null | string | number;
  min: null | number;
  max: null | number;
  step: null | number;
  rows: null | number;
};

type Form = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
};

const INITIAL_FORMS: Form[] = [
  {
    id: "sampleform1",
    title: "Sample Form 1",
    description: "This is sample description of Sample Form 1",
    fields: [],
  },
  {
    id: "sampleform2",
    title: "Sample Form 2",
    description: "This is sample description of Sample Form 2",
    fields: [],
  },
  {
    id: "sampleform3",
    title: "Sample Form 3",
    description: "This is sample description of Sample Form 3",
    fields: [],
  },
];

const FormList = () => {
  return (
    <ul>
      {INITIAL_FORMS.map((form) => (
        <FormListItem
          title={form.title}
          description={form.description}
          id={form.id}
        />
      ))}
    </ul>
  );
};

export default FormList;
