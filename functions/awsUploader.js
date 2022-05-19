const Advertisement = require("../model/createAdvertisement/Advertisement")


//image uploader requires
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const { download } = require("express/lib/response");
const res = require("express/lib/response");

//image uploader
const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKey,
  secretAccessKey,
});

const uploadFile = async (file, bucketName) => {
  const fileStream = await fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  await s3.upload(uploadParams).promise();
};


const getFileStream = (fileKey,bucketName) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};

const deleteFileStream = async (fileKey,bucketName) => {
  const advertisementFile = await Advertisement.findOne({
    url: `https://${process.env.bucketName}.s3.eu-central-1.amazonaws.com/${fileKey}`,
  });
  const deleteParams = {
    Bucket: process.env.bucketName,
    Key: fileKey,
  };
  s3.deleteObject(deleteParams, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  }).promise();

  Advertisement.deleteOne(advertisementFile._id);
};

const editFile = async (file, fileKey) => {
  try {
    await deleteFileStream(fileKey);
    await uploadFile(file);
    res.status(200).json("file has been edited");
  } catch (err) {
    console.log(err);
    res.status(404).json("file has failed editing");
  }
};

module.exports = {
  createDBfile
  uploadFile,
  getFileStream,
  deleteFileStream,
  editFile,
};
