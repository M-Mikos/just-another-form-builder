// This component returns a generated svg texture which is used as a background overlay

const NoiseTexture = (props: { className?: string }): JSX.Element => {
  return (
    <svg
      id="turbulence"
      className={
        "absolute left-0 top-0  h-full w-full opacity-50 mix-blend-overlay " +
        props.className
      }
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          numOctaves="3"
          baseFrequency=".5"
          stitchTiles="stitch"
        ></feTurbulence>

        {/* Matrix for optional color convertion */}
        {/* <feColorMatrix
              values="0 0 0 8 -3.5
                      0 0 0 8 -3.5
                      0 0 0 8 -3.5
                      0 0 0 -1 1"
            /> */}
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  );
};

export default NoiseTexture;
