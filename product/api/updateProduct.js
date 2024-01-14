const productModel = require("../../mongodb_database/productSchema");
const setProductDetail = require("../setProductDetail");

const updateProducts = async (req, res) => {
    const { productId } = req.body
    const { productImages, productName, description, price, stock, category, seller } = await setProductDetail(req);

    try {

        await productModel.findByIdAndUpdate(productId,
            { productImages, productName, description, price, stock, category, seller },
            { new: true, runValidators: true })
        res.status(200).json({ success: true, msg: "successfully product updated" })
    } catch (error) {
        res.status(422).json({ success: false, error: error.message })
    }

}

module.exports = updateProducts