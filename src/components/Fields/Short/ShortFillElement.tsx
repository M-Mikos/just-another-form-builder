const ShortFillElement = (props: { inputName: string }) => {
  return (
    <div>
      <input
        placeholder="Your answer"
        className="peer relative w-full border-b border-stone-400 px-4  py-2 text-sm  hover:bg-stone-100 
        focus-visible:border-emerald-500 focus-visible:bg-stone-50 focus-visible:outline-none "
        autoComplete="off"
        name={props.inputName}
        type="text"
        {...(props.required && { required: "required" })}
      />
      <div className="invisible h-0.5 w-full bg-emerald-500 peer-focus-visible:visible" />
    </div>
  );
};

export default ShortFillElement;
