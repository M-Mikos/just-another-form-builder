// As tailwind don't support dynamically generated classes, static class names must detectable (https://tailwindcss.com/docs/content-configuration#dynamic-class-names). This function is needed to get full, static class named based on given color name, shade, and prefix.
// Funcion can be extended to use shades and more prefixes and colors.

const generateColorClass = (prefix: "from" | "to", color: string): string => {
  const fromColor: { [key: string]: string } = {
    cyan: "from-cyan-500",
    emerald: "from-emerald-500",
    rose: "from-rose-500",
    violet: "from-violet-500",
    amber: "from-amber-500",
    slate: "from-slate-500",
    green: "from-green-500",
    blue: "from-blue-500",
    orange: "from-orange-500",
  };

  const toColor: { [key: string]: string } = {
    cyan: "to-cyan-700",
    emerald: "to-emerald-700",
    rose: "to-rose-700",
    violet: "to-violet-700",
    amber: "to-amber-700",
    slate: "to-slate-700",
    green: "to-green-700",
    blue: "to-blue-700",
    orange: "to-orange-700",
  };

  if (prefix === "from") return fromColor[color];
  if (prefix === "to") return toColor[color];
  return "";
};

export default generateColorClass;
