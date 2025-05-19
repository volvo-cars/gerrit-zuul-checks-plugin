export function compareDates(
  a: Date | undefined,
  b: Date | undefined,
  nullIsInf: boolean
) {
  if (!a && !b) {
    return 0;
  } else if (!a) {
    return nullIsInf ? 1 : -1;
  } else if (!b) {
    return nullIsInf ? -1 : 1;
  } else if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
