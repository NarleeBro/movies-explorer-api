const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'diplomyap';
const BITFILMS_DB = 'mongodb://127.0.0.1:27017';
const BITFILMS_DB_NAME = 'bitfilmsdb';

module.exports = {
  JWT_SECRET,
  BITFILMS_DB,
  BITFILMS_DB_NAME,
};
