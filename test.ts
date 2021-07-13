import {assertEquals, assertThrows} from './test-deps.ts';
import {match} from './mod.ts';

for (const [index, {action, expected}] of [
  {
    action: {type: 'foo', value: 42},
    expected: 42,
  },
  {
    action: {type: 'bar', value: 42},
    expected: 44,
  },
  {
    action: {type: 'baz', value: 42},
    expected: 0,
  },
  {
    action: {type: 'baz', value: 5},
    expected: -1,
  },
].entries()) {
  Deno.test(`basic test ${index + 1}`, () => {
    const actual = match(action, [
      [action => action.type === 'foo', action => action.value],
      [({type}) => type === 'bar', ({value}) => value + 2],
      [({value}) => value < 10, () => -1],
    ], () => 0);
    assertEquals(actual, expected);
  });
}

Deno.test(`thows TypeError when no match and no callback fn`, () => {
  const action = {type: 'baz', value: 42};
  assertThrows(() => {
    match(action, [
      [action => action.type === 'foo', action => action.value],
      [({type}) => type === 'bar', ({value}) => value + 2],
      [({value}) => value < 10, () => -1],
    ]);
  }, TypeError);
});

for (const [index, {n, expected}] of [
  {
    n: 2,
    expected: 1,
  },
  {
    n: 5,
    expected: 10,
  },
  {
    n: 2.2,
    expected: 4.4,
  },
].entries()) {
  Deno.test(`odd/even ${index + 1}`, () => {
    const actual = match(n, [
      [n => n % 2 === 0, n => n / 2],
    ], n => n * 2);
    assertEquals(actual, expected);
  });
}
