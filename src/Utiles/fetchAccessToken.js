const UpstoxAccess = require("../Models/UpstoxAccessModel");

const getAccessToken = async () => {
  try {
    const accessTokenDoc = await UpstoxAccess.findOne({});
    return accessTokenDoc.accessToken;
  } catch (error) {
    console.error("Error fetching access token from database:", error);
    throw error;
  }
};

module.exports = {
  getAccessToken,
};
