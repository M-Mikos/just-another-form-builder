const LoadingIndicator = (): JSX.Element => {
  return (
    <div
      className="flex h-10 w-full items-center justify-center
    "
    >
      <svg className="h-full animate-spin" viewBox="0 0 50 50">
        <path
          transform="translate(5, 5)"
          fill="none"
          stroke="rgb(2 132 199)"
          strokeWidth="6"
          d="M20,0 a20,20 0 0,1 20,20"
        />

        <path
          fill="none"
          transform="translate(5, 5)"
          stroke="rgb(231 229 228)"
          strokeWidth="6"
          d="M20,0 a20,20 0 1,0 20,20"
        />
      </svg>
    </div>
  );
};
export default LoadingIndicator;
