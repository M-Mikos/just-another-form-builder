// Functions & hooks
import toPascalCase from "./toPascalCase";

/**
 *
 * This function is used to dynamically select and return React Component Type from components list, based on field type and field type mode. Function passes props down to component.
 *
 * @param fieldType - form element type from available component types
 * @param mode - component version for editing, filling, or displaying answer
 * @param components - list of form elemenst (react component types)
 * @param componentProps - props for form element component
 */

const renderReactComponentByName = (
  fieldType: string,
  mode: "Edit" | "Fill" | "Answer",
  components: { [key: string]: React.ComponentType<any> },
  componentProps: { [key: string]: any } = {}
) => {
  // Create properly formatted component name
  const formattedFieldName: string = toPascalCase(fieldType) + mode + "Element";

  // Select component constructor based on form field type
  const FieldComponent: React.ComponentType = components[formattedFieldName];

  // Rendering function for proper types of dynamically choosen react component. Type of property is constructor of react component, not its instace (with type JSX.Element). More details: https://stackoverflow.com/questions/31815633/what-does-the-error-jsx-element-type-does-not-have-any-construct-or-call
  const renderFieldComponent = (
    FieldComponent: React.ComponentType
  ): JSX.Element => {
    return <FieldComponent {...componentProps} />;
  };

  return renderFieldComponent(FieldComponent);
};

export default renderReactComponentByName;
