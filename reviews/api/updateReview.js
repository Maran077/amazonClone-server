const reviewModel = require("../../mongodb_database/reviewSchema");

const updateReview = async (req, res) => {
    const { product, rating, reviewText, reviewId } = req.body;

    try {

        await reviewModel.findByIdAndUpdate(reviewId,
            { product, rating, reviewText },
            { new: true, runValidators: true })
        res.status(200).json({ success: true, msg: "successfully review updated" })
    } catch (error) {
        res.status(422).json({ success: false, error: error.message })
    }

}

module.exports = updateReview