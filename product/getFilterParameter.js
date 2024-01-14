const getFilterParameter = async (req) => {
  const { productName, minPrice, maxPrice, category, star } = req.query;

  const query = {};
  if (productName && productName !== "undefined" && productName.trim() !== "")
    query.productName = { $regex: new RegExp(productName, "i") };
  if (category && category !== "undefined" && category.trim() !== "")
    query.category = { $regex: new RegExp(category, "i") };
  if (star && star !== "undefined" && star.trim() !== "")
    query.star = { $gte: star };

  if (minPrice && minPrice !== "undefined" && minPrice.trim() !== "")
    query.price = { $gte: minPrice };
  if (maxPrice && maxPrice !== "undefined" && maxPrice.trim() !== "")
    query.price = { $lte: maxPrice };

  if (
    maxPrice &&
    maxPrice !== "undefined" &&
    minPrice !== "undefined" &&
    maxPrice.trim() !== "" &&
    minPrice &&
    minPrice.trim() !== ""
  ) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  return query;
};

module.exports = getFilterParameter;
