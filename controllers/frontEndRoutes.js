const express = require('express');
const router = express.Router();
const {User,Gear,Category} = require('../models');
const { Op } = require("sequelize");


router.get("/",(req,res)=>{
    res.render("landingpage",{
        logged_in:req.session.logged_in
        })
})

router.get("/home",(req,res)=>{
    Gear.findAll({
        include:[User]
    }).then(data=>{
        const hbsData = data.map(gear=>gear.toJSON())
        res.render("homepage",{
            gears:hbsData,
            logged_in:req.session.logged_in
        })
    })
})

/* router.get("/viewmygear",(req,res)=>{
    if(!req.session.logged_in) {
        res.redirect("/")
    }
    Gear.findAll({
        include:[User]
    }).then(data=>{
        const hbsData = data.map(gear=>gear.toJSON())
        console.log(hbsData)
        res.render("gearCache",{
            gears:hbsData,
            logged_in:req.session.logged_in
        })
    })
})

*/

router.get("/viewmygear",(req,res)=>{
    if(!req.session.logged_in) {
        res.redirect("/")
    }
    User.findByPk(req.session.user_id,{
        include:[Gear]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=true;
        res.render("gearCache",hbsData)
    })
})


router.get("/search",(req,res)=>{
    if(!req.session.logged_in) {
        res.redirect("/")
    }
    Gear.findAll({
        include:[User,Category],
        where: {
            user_id: {
                [Op.not]: req.session.user_id
            }
        }
    }).then(data=>{
        const hbsData = data.map(gear=>gear.toJSON())
        console.log(hbsData)
        res.render("search",{
            gears:hbsData,
            logged_in:req.session.logged_in
        })
    })
    
    
})

router.get("/search/:id",(req,res)=>{
    if(!req.session.logged_in) {
        res.redirect("/")
    }
    Gear.findAll({
        include:[User,Category],
        where: {
            category_id: req.params.id,
            user_id: {
                [Op.not]: req.session.user_id
            }
        }
    }).then(data=>{
        const hbsData = data.map(gear=>gear.toJSON())
        //console.log(hbsData)
        res.render("search",{
            gears:hbsData,
            logged_in:req.session.logged_in
        })
    })
    
    
})



router.get("/gears/:id",(req,res)=>{
    Gear.findByPk(req.params.id,{
         include:[User,Category]
    }).then(gearData=>{
        const hbsData = gearData.toJSON();
        hbsData.logged_in=req.session.logged_in
        res.render("singleGear",hbsData)
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        res.redirect("/profile")
    }
    res.render("login",{logged_in:false})
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in) {
        res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Gear]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=true;
        res.render("profile",hbsData)
    })
})

router.get("/addgear",(req,res)=>{
    if(!req.session.logged_in) {
        res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Gear]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=true;
        res.render("addGear",hbsData)
    })
})

module.exports = router;