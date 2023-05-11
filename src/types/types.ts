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
  options?: string[];
  attributes?: { [key: string]: null | string | number };
};

export type FormType = {
  id: string;
  title: string;
  description?: string;
  tagColor: string;
};

export type AnswerValueType = null | string | number | string[];

export type ComponentListType = { [key: string]: React.FC };

// Combined type aliases

export type AnswerType = { [key: string]: AnswerValueType };

export type FormLoaderType = {
  formDetails: FormType;
  formFields: { [key: string]: FormFieldType };
  formAnswers?: { [key: string]: AnswerType };
};

export type AnswerComponentPropsType = {
  formDetails: FormType;
  formFields: { [key: string]: FormFieldType };
  formAnswers: { [key: string]: AnswerType };
  components: ComponentListType;
};
