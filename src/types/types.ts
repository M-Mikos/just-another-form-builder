export type FormField = {
  id: string;
  title: string;
  required: boolean;
  fieldType:
    | "short"
    | "paragraph"
    | "multiple_choice"
    | "checkboxes"
    | "linear_scale";
  options?: string[];
  attributes?: { [key: string]: null | string | number };
};

export type Form = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
};

export type Answer = (null | string | number | string[])[];
