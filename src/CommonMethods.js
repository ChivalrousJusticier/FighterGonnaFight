export function getDecorator (x) {
  if (x > 0) {
    return '+'
  }
}

export function getModifier (x) {
  x = (Math.floor((x - 10) / 2))
  return x
}
