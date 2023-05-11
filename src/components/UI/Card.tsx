// TS Interfaces declaration
interface PropsTypes {
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

const Card = (props: PropsTypes): JSX.Element => {
  return (
    <div className={`card ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
};

export default Card;
