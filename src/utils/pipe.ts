type Func<T extends any[], R> = (...a: T) => Promise<R>;

/**
 * pipes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param funcs The functions to pipe.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `pipe(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export function pipe(): <R>(a: R) => Promise<R>;

export function pipe<F extends Function>(f: F): F;

/* two functions */
export function pipe<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>;

/* three functions */
export function pipe<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>;

/* four functions */
export function pipe<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>;

/* rest */
export function pipe<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => Promise<R>;

export function pipe<R>(...funcs: Function[]): (...args: any[]) => Promise<R>;

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
