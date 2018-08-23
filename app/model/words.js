module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Words = app.model.define('words', {
    word: STRING(30),
    define: STRING(32),
    phonetic: STRING(32),
  });

  Words.findByLogin = async (word) => {
    return await this.findOne({
      where: {
        word:word 
      }
    });
  }

  Words.prototype.logSignin = async () => {
    return await this.update({ last_sign_in_at: new Date() });
  }

  return User;
};