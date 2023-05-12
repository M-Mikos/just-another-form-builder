// Functions & hooks
import toPascalCase from "./toPascalCase";

const renderReactComponentByName = (
  fieldType: string,
  mode: "Edit" | "Fill" | "Answer",
  components: { [key: string]: React.ComponentType }
) => {
  // Select component constructor based on form field type
  const formattedFieldName: string = toPascalCase(fieldType) + mode + "Element";
  const FieldComponent: React.ComponentType = components[formattedFieldName];

  // Rendering function for proper types of dynamically choosen react component. Type of property is constructor of react component, not its instace (with type JSX.Element). More details: https://stackoverflow.com/questions/31815633/what-does-the-error-jsx-element-type-does-not-have-any-construct-or-call
  const renderFieldComponent = (
    FieldComponent: React.ComponentType
  ): JSX.Element => {
    return <FieldComponent />;
  };

  return renderFieldComponent(FieldComponent);
};

export default renderReactComponentByName;
