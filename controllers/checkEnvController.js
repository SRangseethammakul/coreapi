const axios = require("axios");
const index = require("../config/index");
exports.index = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const response = await axios.get(
      `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${index.AIRVISUAL}`
    );
    const { city, state, country, current } = response.data.data;
    const { tp, hu, wd } = current.weather;
    const { aqius } = current.pollution;
    return res.status(200).json({
      data: {
        city : city,
        state : state,
        country : country
      },
      weather: {
        temperature: tp,
        humidity : hu,
        wind : wd
      },
      polution : aqius
    });
  } catch (error) {
    next(error);
  }
};
