import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.STRING,
        canceled_at: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // relacionando tabelas
  static associate(models) {
    this.belongsTo(models.User, { foreingKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreingKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
