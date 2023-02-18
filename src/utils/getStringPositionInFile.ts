export const getStringPositionInFile = (
  file: string,
  textToFind: string
): [number, number] | undefined => {
  const arrayOfLines = file.split("\n");
  const lineIndex = arrayOfLines.findIndex((line) => line.includes(textToFind));

  if (lineIndex > -1) {
    const line = lineIndex + 1;
    const regex = new RegExp(textToFind);
    const character = arrayOfLines[lineIndex].search(regex) + 1;

    return [line, character] as [number, number];
  }

  return undefined;
};
