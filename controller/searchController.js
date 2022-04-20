// const searchProfiles = require("../model/searchProfiles");

// // return all searchprofiles(GET)
// exports.getSearchProfiles = async (req, res) => {
//   try {
//     const profiles = searchProfiles.find();
//     return res
//       .status(200)
//       .json({ success: true, count: profiles.length, data: profiles });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

//create a searchProfile (POST)

// exports.addSearchProfile = async (req, res) => {
//   try {
//     const searchProfile = searchProfiles.create({req.body})

//     return res.status(200).json({
//       success:true,
//       data:searchProfile,
//     })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
