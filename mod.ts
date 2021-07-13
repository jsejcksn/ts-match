export type Callback<T, U> = (value: T) => U;

export type Arm<T, U> = [
  valueMatches: Callback<T, boolean>,
  getResult: Callback<T, U>,
];

export function match <T, U>(
  value: T,
  arms: Arm<T, U>[],
  getDefaultResult?: Callback<T, U>,
): U {
  for (const [valueMatches, getResult] of arms) {
    if (valueMatches(value)) return getResult(value);
  }
  if (getDefaultResult) return getDefaultResult(value);
  throw new TypeError('No match found, and a default callback function was not provided.');
}
