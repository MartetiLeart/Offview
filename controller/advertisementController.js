const Advertisement = require("../model/createAdvertisement/Advertisement");
require("dotenv").config();

/*
advertisement_Get,
advertisement_GetAll,
advertisement_Post,
advertisement_Put,
advertisement_Delete,
advertisement_Search,
*/

/**
 * @description Gets one advertisement
 * @type GET
 * @url /advertisement/dashboard/getOne/:id
 */

const advertisement_Get = async (req, res) => {
  try {
    const id = req.params.id;
    const advertisement = await Advertisement.findOne({ _id: id });
    res.status(200).json({ advertisement });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting the advertisement" });
  }
};

/**
 * @description Gets one advertisement
 * @type GET
 * @url /advertisement/dashboard/getAll
 */

const advertisement_GetAll = async (req, res) => {
  try {
    const advertisements = await Advertisement.find({});
    res.status(200).json({ advertisements });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error getting all advertisements" });
  }
};

/**
 * @description Create advertisement
 * @type POST
 * @url /advertisement/dashboard/createAdvertisement
 */

const advertisement_Post = async (req, res) => {
  console.log("post");
};

/**
 * @description Edit user
 * @type PATCH
 * @url /advertisement/dashboard/edit/:id
 */

const advertisement_Patch = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const advertisement = await Advertisement.findOne({ _id: id });
    await Object.assign(advertisement, body);
    await advertisement.save();
    res.status(200).json({ success: true, message: "Edited successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error editing advertisement" });
  }
};

/**
 * @description Delete user
 * @type DELETE
 * @url /advertisement/dashboard/delete/:id
 */

const advertisement_Delete = async (req, res) => {
  try {
    const id = req.params.id;
    const advertisement = await Advertisement.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error editing advertisement" });
  }
};

module.exports = {
  advertisement_Get,
  advertisement_GetAll,
  advertisement_Post,
  advertisement_Patch,
  advertisement_Delete,
};
