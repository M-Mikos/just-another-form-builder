export type FormField = {
  id: string;
  name: string;
  required: boolean;
  formElement: "input" | "textarea";
  attributes: {
    type?: null | "text" | "checkbox" | "radio" | "range";
    value?: null | string | number;
    min?: null | number;
    max?: null | number;
    step?: null | number;
    rows?: null | number;
  };
  answers: (null | string | number)[];
};

export type Form = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
};
