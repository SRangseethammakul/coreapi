const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    photo: { type: String, default: "nopic.png" },
    isUsed: {
        type: Boolean,
        default: true
    }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "categories",
  }
);

schema.virtual("products", {
  ref: "Product", //link ไปหา model menu
  localField: "_id", //_id ฟิลด์ของโมเดล Shop (ไฟล์นี้)
  foreignField: "category", // shop คือ fk
});

const category = mongoose.model("Category", schema); //ชื่อต้อง match กันกับ db ใน db ควรเป็นพหูพจน์ ใน model เป็นคำนั้นไปเลย

module.exports = category;
