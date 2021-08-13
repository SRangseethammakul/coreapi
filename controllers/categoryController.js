const Category = require("../models/category");
const Product = require("../models/product");
exports.index = async (req, res, next) => {
  try {
    const categories = await Category.find().select('name');
    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
exports.insert = async (req, res, next) => {
  try {
    const { name } = req.body;
    let category = new Category({
      name: name,
    });
    await category.save();
    res.status(201).json({
      data: "Save success",
    });
  } catch (error) {
    next(error);
  }
};
exports.getShopWithMenu = async (req, res, next) => {
    const { id } = req.params;
    const shopWithMenu = await Category.findById(id).populate('products');
    res.status(200).json({
        data: {data : shopWithMenu}
    });
}
