// TS Interfaces declaration
interface PropsTypes {
  children: JSX.Element[] | JSX.Element;
}

const Card = (props: PropsTypes): JSX.Element => {
  return <div className="card">{props.children}</div>;
};

export default Card;
