function match1(value, arms, getDefaultResult) {
    for (const [valueMatches, getResult] of arms){
        if (valueMatches(value)) return getResult(value);
    }
    if (getDefaultResult) return getDefaultResult(value);
    throw new TypeError('No match found, and a default callback function was not provided.');
}
export { match1 as match };
