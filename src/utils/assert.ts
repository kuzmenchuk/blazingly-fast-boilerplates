export const assert = <T>(value?: T, mssg?: string) => {
  if (!value) {
    throw new Error(mssg);
  }
  return value;
};
