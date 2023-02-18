export const getStringPositionInFile = (
  file: string,
  regex: RegExp
): [number, number] | undefined => {
  const arrayOfLines = file.split("\n");
  const line = arrayOfLines.findIndex((str) => regex.test(str));

  if (line > -1) {
    const character = arrayOfLines[line].search(regex);

    return [line, character] as [number, number];
  }

  return undefined;
};
