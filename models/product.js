const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    productName: {
      type: String,
      require: true,
      trim: true,
    },
    price: Number,
    photo: { type: String, default: "nopic.png" },
    items: [
      {
        name: String,
        volume: Number,
        unit : String,
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "products",
  }
);
schema.virtual("price_vat").get(function () {
  return this.price * 0.07 + this.price;
});
const product = mongoose.model("Product", schema); //ชื่อต้อง match กันกับ db ใน db ควรเป็นพหูพจน์ ใน model เป็นคำนั้นไปเลย

module.exports = product;
