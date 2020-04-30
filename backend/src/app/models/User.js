import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        passoword_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // antes de ser salvo no bd
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.passoword_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // relacionando tabelas de users com files
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passoword_hash);
  }
}

export default User;