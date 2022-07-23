const association = require('./../model/InfoSubCollections/organizerInfoModel');


// exports.authorizeAssociation = async(req,res)=>{
//     try{
//         //console.log(req.body.loginEmail);
//         const query = association.find({email:"csea@kongu.edu"});
//         const findAssociation = await query;
//         res.status(200).json({
//             status :'success',
//             len : findAssociation.length,
//             data : findAssociation
//         });
//     }catch(err){
//         console.log("Failed");
//         res.status(400).json({
//             status : "Fail",
//             msg : err
//         });
//     }
// };

// exports.insertAssociation = async (req,res) =>{
//     console.log({data:req});
//     try{
//         console.log(req.body);
//         const newAssociation = await association.create(req.body);
//         res.status(201).json({
//             status : "success",
//             data : newAssociation
//         });
//     }catch(err){
//         console.log(err);
//         res.status(400).json({
//             status: "Fail",
//             message : "Invalid Data Sent!"
//         });
//     }
// };