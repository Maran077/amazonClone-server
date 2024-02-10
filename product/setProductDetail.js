const setProductDetail = (req) => {
  const { files } = req;
  const { productName, description, price, stocks, category } = req.body;
  const seller = req.user._id;
  const productImages = [];

  files?.forEach((file) => {
    const buffer = file.buffer;
    const image = {
      data: buffer,
      contentType: "image/jpg",
    };
    productImages.push(image);
  });

  return {
    productImages,
    productName,
    description,
    price,
    stocks,
    category,
    seller,
  };
};

module.exports = setProductDetail;
