// Functions & hooks
import toPascalCase from "../../helpers/toPascalCase";

// Components
import ParagraphFillElement from "../Fields/Paragraph/ParagraphFillElement";
import ShortFillElement from "../Fields/Short/ShortFillElement";

const components: ComponentListType = {
  ShortFillElement,
  ParagraphFillElement,
};

const FieldFillWrapper = (props) => {
  // Select component based on form field type
  const formattedFieldName = toPascalCase(props.data.fieldType) + "FillElement";

  const FieldComponentName = components[formattedFieldName];

  console.log(props);

  return (
    <>
      <h4 className="mb-3">
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

      <FieldComponentName
        inputName={props.data.id}
        required={props.data.required}
      />
    </>
  );
};

export default FieldFillWrapper;
