export const titleCase = string => {
  return string
    .split(' ')
    .map(x => x[0].toUpperCase() + x.slice(1, x.length).toLowerCase())
    .join(' ')
}
