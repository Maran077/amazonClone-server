const reviewModel = require("../../mongodb_database/reviewSchema");

const deleteReview = async (req, res) => {
    const { reviewId } = req.body

    try {
        await reviewModel.findByIdAndDelete(reviewId)
        res.status(200).json({ success: true, msg: "successfully review deleted" })
    } catch (error) {
        res.status(422).json({ success: false, error: error.message })
    }

}

module.exports = deleteReview