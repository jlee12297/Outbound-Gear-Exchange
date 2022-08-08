const express = require('express');
const router = express.Router();
const {User,Gear} = require('../models');

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

router.get("/gears/:id",(req,res)=>{
    Gear.findByPk(req.params.id).then(gearData=>{
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