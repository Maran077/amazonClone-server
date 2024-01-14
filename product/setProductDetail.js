const fs = require("fs");

const setProductDetail = (req) => {
  const { files } = req;
  const { productName, description, price, stocks, category } = req.body;
  const seller = req.user._id;
  const productImages = [];

  files?.forEach((file) => {
    const path = `${file.destination}\\${file.filename}`;
    const image = {
      data: fs.readFileSync(path),
      contentType: "image/jpg",
    };
    productImages.push(image);
    fs.unlinkSync(path);
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
