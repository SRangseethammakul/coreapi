const Category = require("../models/category");
const Product = require("../models/product");
const config = require("../config/index");
exports.index = async (req, res, next) => {
  try {
    const resp = await Category.find().select('name isUsed photo');
    const categories = await resp.map((item, index) => {
      return {
        id: item._id,
        name: item.name,
        isUsed : item.isUsed,
        photo: config.DOMAIN_GOOGLE_URL + "/" + item.photo,
      };
    })
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
