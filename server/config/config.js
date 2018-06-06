module.exports = {
  'database': {
    'connectionString': 'mongodb://simon:test123@ds147420.mlab.com:47420/snapp'
  },
  'auth': {
    'bcrypt': {
      'SALT_WORK_FACTOR': 10
    },
    'jwtSecret': 'mobdev2_nmd_gdm',
    'jwtSession': {
        session: false
    },
    'facebook': {
      'clientID': '2046607362295127',
      'clientSecret': 'dcae5fd188aa74d6e552f9aad0595c32'
    }
  }  
};