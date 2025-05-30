import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { RequestStatus } from '../types/requests';
import { RequestInstance } from '../types/requests';

export const RequestModel = sequelize.define<RequestInstance>('Request', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(...Object.values(RequestStatus)),
    allowNull: false,
    defaultValue: RequestStatus.NEW
  },
  solutionText: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancelReason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'requests'
});
