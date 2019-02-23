export function convertRelation(value: number, max: number, min: number = 0) {
  return ((max - min) * value) / 127 + min;
}
