const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  status:  String,
  amount : Number,
},{collection : 'transactionlogs',timestamps : true,});

const TransactionLog = mongoose.model('TransactionLog', schema); //ชื่อต้อง match กันกับ db ใน db ควรเป็นพหูพจน์ ใน model เป็นคำนั้นไปเลย

module.exports = TransactionLog