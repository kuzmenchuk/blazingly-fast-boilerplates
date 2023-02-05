export const replaceWithValues = (
  string: string,
  keysToValuesPairs: { [key: string]: string }
) => {
  const values = Object.keys(keysToValuesPairs)
    .join("|")
    .replace(/\$/g, `\\\$`);

  const regex = new RegExp(`(${values})`, "g");

  return string.replace(
    regex,
    // @ts-ignore
    (v: string) => keysToValuesPairs[v]
  );
};
