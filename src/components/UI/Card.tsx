// TS Interfaces declaration
interface PropsTypes {
  children: JSX.Element[] | JSX.Element;
}

const Card = (props: PropsTypes): JSX.Element => {
  return <div className="rounded-lg bg-white p-6 shadow">{props.children}</div>;
};

export default Card;
