export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (products, term) => {
  // get unique values for provided string in array
  let uniqValuesForTerm = products.map((item) => item[term]);
  // for colors we need to flatten array, since colors in arrays
  if (term === "colors") {
    uniqValuesForTerm = uniqValuesForTerm.flat();
  }
  const uniqValues = ["all", ...new Set(uniqValuesForTerm)];
  return uniqValues;
};
