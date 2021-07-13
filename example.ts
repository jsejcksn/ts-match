import {match} from './mod.ts';

function doubleOddHalfEven (n: number): number {
  const result = match(n, [
    [n => n % 2 === 0, n => n / 2],
  ], n => n * 2);

  return result;
}

console.log(doubleOddHalfEven(2)); //=> 1
console.log(doubleOddHalfEven(1)); //=> 2
console.log(doubleOddHalfEven(12)); //=> 6
console.log(doubleOddHalfEven(5)); //=> 10
console.log(doubleOddHalfEven(3)); //=> 6
