const TransactionLog = require("../models/transactionlog");
const config = require("../config/index");
const omise = require("omise")({
  publicKey: config.OMISE_PUBLIC,
  secretKey: config.OMISE_SECRET,
});
exports.index = async (req, res, next) => {
  try {
    const { email, name, amount, token } = req.body;
    const customer = await omise.customers.create({
      email: email,
      description: name,
      card: token,
    });
    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id,
    });
    console.log(charge);
    return res.status(200).json({
      amount: charge.amount,
      status: charge.status,
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Error " + error.message,
      },
    });
  }
};
exports.internetBanking = async (req, res, next) => {
  try {
    const { amount, token } = req.body;

    const charge = await omise.charges.create({
      amount,
      source: token,
      currency: "thb",
      return_uri: config.URL_REDIRECT,
    });
    console.log(charge);
    return res.status(200).json({ authorizeUri: charge.authorize_uri });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Error " + error.message,
      },
    });
  }
  next();
};
exports.omiseWebHooks = async (req, res, next) => {
  try {
    const { data } = req.body;
    if (data.status === "successful" || data.status === "failed") {
      let newTransaction = new TransactionLog({
        status: data.status,
        amount: data.funding_amount,
      });
      await newTransaction.save();
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Error " + error.message,
      },
    });
  }
  next();
};
exports.getInternetBankingCharge = async (req, res, next) => {
  try {
    const charge = await readFileData();

    res.send({ ...charge });
    await writeFile(filePath, JSON.stringify({}));
  } catch (err) {
    console.log(err);
  }
  next();
};
