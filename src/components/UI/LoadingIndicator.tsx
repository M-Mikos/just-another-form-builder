const LoadingIndicator = (): JSX.Element => {
  return (
    <div
      className="flex h-10 w-full items-center
    justify-center"
    >
      <div className="loader-pulse flex gap-1">
        <div className="loader-pulse h-2 w-2 animate-loader-pulse rounded-full bg-sky-500" />
        <div className="animation-delay-200 h-2 w-2 animate-loader-pulse rounded-full bg-sky-500" />
        <div className="animation-delay-400 h-2 w-2 animate-loader-pulse rounded-full bg-sky-500" />
      </div>
    </div>
  );
};
export default LoadingIndicator;
