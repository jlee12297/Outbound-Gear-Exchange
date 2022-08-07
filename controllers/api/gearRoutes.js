const router = require('express').Router();
const { Gear,User } = require('../../models');
const { routes } = require('./userRoutes')

router.get("/",async (req,res)=>{
  try {
    const Gears = await Gear.findAll();
    res.json(Gears)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.get('/:id', async (req,res) => {
  try {
    const GearData = await Gear.findByPk(req.params.id, {
      include: [
        {
          model: User,
        }
      ]
    });
    if(!GearData) {
      res.status(404).json({msg: "No gear with this ID"});
      return;
    }
    res.status(200).json(GearData);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"You must be logged in to add gear to your cache!"})
  }
  try {
    const newGear = await Gear.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGear);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:gears', async (req,res) => {
  Gear.update({
    name:req.body.name,
    description:req.body.description,
  },
    {
    where:{
      id:req.params.id
    }
    }).then(gear=>{
      if(!gear[0]){
        return res.status(404).json({msg:"No such gear. No changes made."})
      }
    res.json(gear)
  }).catch(err=>{
    res.status(500).json({msg: "Internal server error",err})
  })
})

router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"You must be logged in to remove gear from your cache!"})
  }
  try {
    const GearData = await Gear.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!GearData) {
      res.status(404).json({msg: 'No gear found with this ID!' });
      return;
    }

    res.status(200).json(GearData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
