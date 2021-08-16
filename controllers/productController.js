const User = require("../models/user");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const cloudinary_config = require("../config/cloudinary");
const Category = require("../models/category");
const Product = require("../models/product");
const data = [
  {
    id: 1,
    name: "mcDonals",
    imageURL:
      "https://d1sag4ddilekf6.cloudfront.net/compressed/items/THITE20200824152304086122/photo/86533bd3_TPO2190_1m.jpg",
    type: "Grab",
    price: 100,
  },
  {
    id: 2,
    name: "Burger King (เบอร์เกอร์ คิง) - จักรพงษ์",
    imageURL:
      "https://d1sag4ddilekf6.cloudfront.net/compressed/items/THITE20201125082140011942/photo/d5fb3fdb5f0f4e6b82c68ffbdde9fbed_1606445979832677182.jpeg",
    type: "Grab",
    price: 200,
  },
  {
    id: 3,
    name: "Cafe Amazon (คาเฟ่ อเมซอน) - ถนนมหรรณพ",
    imageURL:
      "https://d1sag4ddilekf6.cloudfront.net/compressed/items/THITE20210119114119019211/photo/72af74f511af48919a78d968a97a42d1_1611056498569999719.png",
    type: "Grab",
    price: 300,
  },
  {
    id: 4,
    name: "Starbucks (สตาร์บัคส์) - วังบูรพา",
    imageURL:
      "https://d1sag4ddilekf6.cloudfront.net/compressed/items/THITE20210129084346118106/photo/00a7ab2970a04c3e832eca22801f8f0a_1612156054164625620.png",
    type: "Grab",
    price: 400,
  },
  {
    id: 5,
    name: "Cafe Amazon (คาเฟ่ อเมซอน) - 5",
    imageURL:
      "https://d1sag4ddilekf6.cloudfront.net/compressed/items/THITE20210119114119019211/photo/72af74f511af48919a78d968a97a42d1_1611056498569999719.png",
    type: "Grab 5",
    price: 500,
  },
  {
    id: 6,
    name: "Starbucks (สตาร์บัคส์) - 6",
    imageURL:
      "https://d1sag4ddilekf6.cloudfront.net/compressed/items/THITE20210129084346118106/photo/00a7ab2970a04c3e832eca22801f8f0a_1612156054164625620.png",
    type: "Grab 6",
    price: 600,
  },
];
exports.index = async (req, res, next) => {
  try {
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
exports.insertType = async (req, res, next) => {
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
exports.insertProduct = async (req, res, next) => {
  try {
    const { productName, price, items, category, photo } = req.body;
    let newProduct = new Product({
      productName,
      price,
      items,
      category,
      photo: await saveImageToCloudinary(photo),
    });
    await newProduct.save();
    res.status(201).json({
      data: "Save success",
    });
  } catch (error) {
    next(error);
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category", "name -_id")
      .sort("-_id"); //parameter ตัวแรก ต้อง match กับ model ที่ ref ไว้
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProductWithProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category", "name -_id")
      .sort("-_id"); //parameter ตัวแรก ต้อง match กับ model ที่ ref ไว้
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const staff = await Product.deleteOne({ _id: id });
    if (staff.deletedCount === 0) {
      throw new Error("ไม่สามารถลบข้อมูลได้");
    } else {
      res.status(200).json({
        message: "deleted",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Error " + error.message,
      },
    });
  }
};
const saveImageToCloudinary = async (baseImage) => {
  cloudinary.config({
    cloud_name: cloudinary_config.CLOUD_NAME,
    api_key: cloudinary_config.CLOUD_KEY,
    api_secret: cloudinary_config.CLOUD_SECRET,
  });
  const uploadResponse = await cloudinary.uploader.upload(baseImage, {});
  return uploadResponse.secure_url;
};
