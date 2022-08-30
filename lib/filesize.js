/**
 * Generate file size from url or byte.
 * @sandypratama
 **/
var sizeName = (byte) => {
  // I using fckin' if else
  if (Number(byte / 1024) < 1000) return Number(byte / 1024)
    .toFixed(2) + " KB"
  else if (Number(byte / (1024 ** 2)) < 1000) return Number(byte / (1024 ** 2))
    .toFixed(2) + " MB"
  else if (Number(byte / (1024 ** 3)) < 1000) return Number(byte / (1024 ** 3))
    .toFixed(2) + " GB"
  else if (Number(byte / (1024 ** 4)) < 1000) return Number(byte / (1024 ** 4))
    .toFixed(2) + " TB"
  else if (Number(byte / (1024 ** 5)) < 1000) return Number(byte / (1024 ** 5))
    .toFixed(2) + " QB"
  else return Number(byte)
    .toFixed(2) + " B";
};

exports.getSizeFromUrl = async (url) => {
  try {
    var axios = require("axios");
    var data = await axios.head(url);
    var byte = data.headers["content-length"] || data.headers["Content-Length"];
    return sizeName(byte);
  } catch (e) {
    return e;
  };
};

exports.sizeName = sizeName;
