export const chartLabel = (item, filterResolution) => {
  let label = "";

  if (filterResolution.value === "monthly") {
    label = `${item.month}/${item.year}`;
  } else if (filterResolution.value === "quarterly") {
    label = `Q${item.quarter} / ${item.year}`;
  }

  return label;
};
