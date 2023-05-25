// Functions & hooks
import { useState } from "react";
import renderReactComponentByName from "../../helpers/renderReactComponentByName";
import { FormFieldType } from "../../types/types";

// Components
import ParagraphFillElement from "../Fields/Paragraph/ParagraphFillElement";
import ShortFillElement from "../Fields/Short/ShortFillElement";
import SingleChoiceFillElement from "../Fields/SingleChoice/SingleChoiceFillElement";
import Card from "../UI/Card";

const components: {
  [key: string]: React.ComponentType<{
    inputName: string;
    required: boolean;
    validateOnEventHandler: () => {};
  }>;
} = {
  ShortFillElement,
  ParagraphFillElement,
  SingleChoiceFillElement,
};

const FieldFillWrapper = (props: { data: FormFieldType }): JSX.Element => {
  // State for validation of required elements
  const [isError, setIsError] = useState<boolean>(false);

  const validateOnEventHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    props.data.required && !event.target.value
      ? setIsError(true)
      : setIsError(false);
  };

  return (
    <Card className={"p-6 pb-1" + (isError ? " border-red-500 " : "")}>
      <h4 className="mb-3 text-lg">
        {props.data.title}
        {props.data.required && (
          <span className="group relative ml-1  cursor-help text-xl text-red-600">
            *
            <span className="invisible absolute -left-1/2 bottom-full mb-1 ml-2 w-fit -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-700 px-4 py-2 text-sm text-stone-100 opacity-80 after:absolute after:-bottom-1 after:left-1/2 after:block after:h-2 after:w-2 after:-translate-x-1/2 after:rotate-45 after:bg-stone-700 group-hover:visible">
              This field is required
            </span>
          </span>
        )}
      </h4>

      {renderReactComponentByName(props.data.fieldType, "Fill", components, {
        name: props.data.id,
        ...(props.data.attributes && {
          attributes: JSON.parse(props.data.attributes),
        }),
        ...(props.data.required && {
          required: true,
          onChange: validateOnEventHandler,
          onBlur: validateOnEventHandler,
        }),
      })}
      <div className="h-9">
        {isError && (
          <div className="flex h-full items-center gap-2 text-sm text-red-500">
            <span className="material-symbols-outlined">error</span>This field
            is equired.
          </div>
        )}
      </div>
    </Card>
  );
};

export default FieldFillWrapper;
