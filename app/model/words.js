var Sequelize = require('sequelize')
module.exports = app => {
  const { STRING, INTEGER, DATE, BLOB } = app.Sequelize;

  const Words = app.model.define('words', {
    word:  { type: Sequelize.STRING, unique: true },
    mean: STRING(500),
    affix: STRING(500),
    en_phonic: STRING(32),
    us_phonic: STRING(32),
  });

  Words.findWord = async function(w) {
    return await this.findOne({
      where: {
        word:w
      },
      raw: true,
    })
  }
  Words.createWord = async function(trans){
    this.create({ 
      word: trans.word,
      mean:trans.mean,
      affix: trans.affix,
      en_phonic:trans.en_phonic,
      us_phonic:trans.us_phonic,
    })
    .then(newPet => {
      console.log(`New  ${newPet.word}, with id ${newPet.id} has been created.`);
    });
  }

  Words.prototype.findWord= async () => {}
  Words.prototype.logSignin = async () => {
    return await this.update({ last_sign_in_at: new Date() });
  }

  return Words;
};