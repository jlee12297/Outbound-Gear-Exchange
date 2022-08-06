const express = require('express');
const router = express.Router();
const {User,Gear} = require('../models');

router.get("/",(req,res)=>{
    Gear.findAll({
        include:[User]
    }).then(data=>{
        // changed from gear.toJSON to gear.get({plain:true}) per tutor in relation to handlebars
        const hbsData = data.map(gear=>gear.get({plain:true}))
        res.render("landingpage",{
            gears:hbsData,
            logged_in:req.session.logged_in
        })
    })
})

//changed route to homepage to "/home" from "/""
router.get("/home",(req,res)=>{
    Gear.findAll({
        include:[User]
    }).then(data=>{
        // added if to return to landing page
        if(!data){
            res.render("/")
        }
        // changed from gear.toJSON to gear.get({plain:true}) per tutor in relation to handlebars
        const hbsData = data.map(gear=>gear.get({plain:true}))
        res.render("homepage",{
            gears:hbsData,
            logged_in:req.session.logged_in
        })
    })
})

router.get("/gears/:id",(req,res)=>{
    Gear.findByPk(req.params.id).then(gearData=>{
        if(!gearData){
            res.render("/")
        }
        // changed from gear.toJSON to gear.get({plain:true}) per tutor in relation to handlebars
        const hbsData = gearData.get({plain:true});
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
        res.redirect("/")
    }
    User.findByPk(req.session.user_id,{
        include:[Gear]
    }).then(userData=>{
        if(!userData){
            res.render("/")
        }
        // changed from gear.toJSON to gear.get({plain:true}) per tutor in relation to handlebars
        const hbsData = userData.get({plain:true});
        console.log(hbsData)
        hbsData.logged_in=true;
        res.render("profile",hbsData)
    })
})

module.exports = router;