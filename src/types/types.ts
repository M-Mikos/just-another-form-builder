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

export type FormListItemType = {
  id: string;
  title: string;
  description?: string;
  tagColor: string;
};

export type AnswerValueType = null | string | number | string[];

export type ComponentListType = { [key: string]: React.FC };

// Combined type aliases

export type AnswerType = { [key: string]: AnswerValueType };

export type FormType = FormListItemType & {
  fields?: FormFieldType[];
};

export type AnswerLoaderType = {
  formDetails: FormType;
  answers: { [key: string]: AnswerType };
};
export type AnswerComponentPropsType = {
  formDetails: FormType;
  answers: { [key: string]: AnswerType };
  components: ComponentListType;
};
