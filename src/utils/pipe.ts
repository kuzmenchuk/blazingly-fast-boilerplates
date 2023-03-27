export function pipe<F extends (...args: any[]) => any>(
  ...funcs: F[]
): (...args: Parameters<F>) => ReturnType<F>;

export function pipe(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      async (...args: any) =>
        await b(await a(...args))
  );
}
