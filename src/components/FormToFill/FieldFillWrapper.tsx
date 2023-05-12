// Functions & hooks
import renderReactComponentByName from "../../helpers/renderReactComponentByName";
import { FormFieldType } from "../../types/types";

// Components
import ParagraphFillElement from "../Fields/Paragraph/ParagraphFillElement";
import ShortFillElement from "../Fields/Short/ShortFillElement";

const components: {
  [key: string]: React.ComponentType<{ inputName: string; required: boolean }>;
} = {
  ShortFillElement,
  ParagraphFillElement,
};

const FieldFillWrapper = (props: { data: FormFieldType }): JSX.Element => {
  return (
    <>
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
        inputName: props.data.id,
        required: props.data.required,
      })}
    </>
  );
};

export default FieldFillWrapper;
