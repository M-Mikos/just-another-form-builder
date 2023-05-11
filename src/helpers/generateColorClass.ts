// As tailwind doesn't support dynamically generated classes, static class names must be detectable (https://tailwindcss.com/docs/content-configuration#dynamic-class-names). This function is needed to get full, hard-coded class named based on given color name and prefix.
// Funcion can be extended to use shades and more prefixes and colors.

const generateColorClass = (
  prefix: "gradient" | "bg",
  color: string
): string => {
  const gradientColor: { [key: string]: string } = {
    cyan: "bg-gradient-to-t from-cyan-500 to-cyan-700",
    emerald: "bg-gradient-to-t from-emerald-500 to-emerald-700",
    rose: "bg-gradient-to-t from-rose-500 to-rose-700",
    violet: "bg-gradient-to-t from-violet-500 to-violet-700",
    amber: "bg-gradient-to-t from-amber-500 to-amber-700",
    slate: "bg-gradient-to-t from-slate-500 to-slate-700",
    green: "bg-gradient-to-t from-green-500 to-green-700",
    blue: "bg-gradient-to-t from-blue-500 to-blue-700",
    orange: "bg-gradient-to-t from-orange-500 to-orange-700",
  };

  const bgColor: { [key: string]: string } = {
    cyan: "before:bg-cyan-600",
    emerald: "before:bg-emerald-600",
    rose: "before:bg-rose-600",
    violet: "before:bg-violet-600",
    amber: "before:bg-amber-600",
    slate: "before:bg-slate-600",
    green: "before:bg-green-600",
    blue: "before:bg-blue-600",
    orange: "before:bg-orange-600",
  };

  if (prefix === "gradient") return gradientColor[color];
  if (prefix === "bg") return bgColor[color];
  return "";
};

export default generateColorClass;
