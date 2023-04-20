export type FormFieldType = {
  id: string;
  title: string;
  required: boolean;
  fieldType:
    | "short"
    | "paragraph"
    | "multiple choice"
    | "checkboxes"
    | "linear scale";
  options?: string[];
  attributes?: { [key: string]: null | string | number };
};

export type FormListItemType = {
  id: string;
  title: string;
  description: string;
  tagColor: string;
};

export type FormType = FormListItemType & {
  fields: FormFieldType[];
};

export type AnswerType = (null | string | number | string[])[];
