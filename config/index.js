require('dotenv').config();
module.exports = {
    PORT : process.env.PORT,
    FACEBOOK_APP_ID : process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET : process.env.FACEBOOK_APP_SECRET,
    GOOGLE_CLIENTID : process.env.GOOGLE_CLIENTID,
    GOOGLE_SECRETID : process.env.GOOGLE_SECRETID,
    MONGODB_URI : process.env.MONGODB_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    URL_CALLBACK : process.env.URL_CALLBACK,
    DOMAIN_GOOGLE_URL : process.env.DOMAIN_GOOGLE_URL,
    OMISE_PUBLIC : process.env.OMISE_PUBLIC,
    OMISE_SECRET : process.env.OMISE_SECRET,
    URL_REDIRECT : process.env.URL_REDIRECT
}