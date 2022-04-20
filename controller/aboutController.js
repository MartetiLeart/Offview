const aboutImage = require("../model/aboutImage");
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const { download } = require("express/lib/response");
const res = require("express/lib/response");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKey,
  secretAccessKey,
});

const createDBfile = (file, fullName, jobTitle) => {
  aboutImage.create({
    url: file.location,
    fullname: fullname,
    jobTitle: jobTitle,
  });
};
const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  await s3.upload(uploadParams).promise();
};
const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};

const deleteFileStream = async (fileKey) => {
  const aImage = aboutImage.findOne({
    url: `https://offview-test-bucket.s3.eu-central-1.amazonaws.com/${fileKey}`,
  });
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey,
  };
  s3.deleteObject(deleteParams, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  }).promise();

  aboutImage.deleteOne(aImage._id);
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
  editFile,
  uploadFile,
  getFileStream,
  deleteFileStream,
  createDBfile,
};
