const router = require('express').Router();
const { User, Gear } = require('../../models');
const { route } = require('./gearRoutes');

router.get('/', async (req,res) => {
  try {
    const Users = await User.findAll();
    res.json(Users)
  }catch (err) {
    res.status(400).json(err);
  }
})

router.get('/:id', async (req,res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Gear,
        }
      ]
    });
    if(!userData) {
      res.status(404).json({msg: "No user with this ID"});
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_email = userData.email;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req,res) => {
  User.update({
    user_name:req.body.user_name,
    user_location:req.body.user_location,
    email:req.body.email,
    password:req.body.password
  },
    {
    where:{
      id:req.params.id
    }
    }).then(user=>{
      if(!user[0]){
        return res.status(404).json({msg:"No such user. No changes made."})
      }
    res.json(user)
  }).catch(err=>{
    res.status(500).json({msg: "Internal server error",err})
  })
})

router.delete('/:id', async (req,res) => {
  if(!req.session.logged_in){
    res.status(403).json({msg: "You must be logged in to remove a user!"})
  }
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });
    if (!userData) {
      res.status(404).json({msg: "No user found with this ID!"});
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
