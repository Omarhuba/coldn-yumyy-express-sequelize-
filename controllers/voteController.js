const { Users} = require('../models')


const postVote = async (req, res) => {
    let email = null;
    if(req.session.user){
      email = req.session.user.email
    }else{
      email = req.body.email
    }
    const { flavors_id } = req.query;
    const user = await Users.findOne({where: {email: email}})
    if(!user){
      const userData = await Users.create({email, flavors_id});
      res.redirect('/thanks')
    }else if(user.hasVoted()){
      res.redirect('errorDuplicate')
    }else{
      user.update({flavors_id})
      res.redirect('/thanks')
    }
}

module.exports = {postVote}