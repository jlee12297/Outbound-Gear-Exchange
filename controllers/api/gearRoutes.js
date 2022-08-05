const router = require('express').Router();
const { Gear } = require('../../models');

router.get("/",async (req,res)=>{
  try {
    const Gears = await Gear.findAll();
    res.json(Gears)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"login first!"})
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

router.delete('/:id', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"login first!"})
  }
  try {
    const GearData = await Gear.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!GearData) {
      res.status(404).json({ message: 'No Gear found with this id!' });
      return;
    }

    res.status(200).json(GearData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
