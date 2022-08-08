const router = require('express').Router();
const { Category } = require('../../models');
const { routes } = require('./userRoutes');

router.get("/",async (req,res)=>{
  try {
    const category = await Category.findAll();
    res.json(category)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.get('/:id', async (req,res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    });
    if(!categoryData) {
      res.status(404).json({msg: "No category with this ID"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg:"You must be logged in to add a gear category!"})
  }
  try {
    const newCategory = await Category.create({
      ...req.body,
      category_name: req.session.category_name,
    });

    res.status(200).json(newCategory);
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
