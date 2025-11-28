export function add(a, b) {
  return a + b;
}

export const addDescription = `
add(a, b):
- Adds two numbers and returns their sum.
- If a or b are strings, it concatenates them.
Parameters:
  a: Number or String — the first value.
  b: Number or String — the second value.
Returns:
  Number or String — the result of addition or concatenation.
`;