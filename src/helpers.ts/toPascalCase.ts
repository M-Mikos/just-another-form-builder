const toPascalCase = (text: string): string => {
  //   Steps:
  //   1) Search all words, uppercase first letter in each,
  //   2) Lowercase all leter except word first letter
  //   3) Search and remove all whitespaces

  const str: string = text.replace(/\w+/g, function (w: string): string {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  });
  return str.replace(/\s/g, "");
};

export default toPascalCase;
