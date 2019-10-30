const interpolate = (value, lowerBound, upperBound) => {
  const distance = upperBound - lowerBound;
  const adjustedValue = value - lowerBound;
  const toReturn = adjustedValue / distance;
  if (toReturn > 1) return 1;
  if (toReturn < 0) return 0;
  return toReturn;
};

// const interpolateAndSquash = (
//   value,
//   lowerBound,
//   upperBound,
//   lowerSquash,
//   upperSquash
// ) => {
//   const interpolatedValue = interpolate(value, lowerBound, upperBound);
//   if (interpolatedValue > upperSquash) return 1;
//   if (interpolatedValue < lowerSquash) return 0;
//   return interpolatedValue;
// };

export default interpolate;
