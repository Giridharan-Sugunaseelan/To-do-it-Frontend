export function groupByDate(array, key) {
  const outputObject = {};
  array?.forEach((item) => {
    const valueOfKey = item[key];
    if (outputObject[valueOfKey]) {
      outputObject[valueOfKey] = [...outputObject[valueOfKey], item];
    } else {
      outputObject[valueOfKey] = [item];
    }
  });
  return outputObject;
}
