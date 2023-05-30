// Basic type aliases

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
  // Attributes should be saved in JSON format
  attributes?: string;
};

export type FormType = {
  id: string;
  title: string;
  description?: string;
  tagColor: string;
};

export type AnswerValueType = string | number | string[];

// Combined type aliases
// "key" is field id
export type AnswerType = { [key: string]: AnswerValueType };

export type FormLoaderType = {
  formDetails: FormType;
  formFields: { [key: string]: FormFieldType };
  // "key" is answer set id
  formAnswers?: { [key: string]: AnswerType };
};
