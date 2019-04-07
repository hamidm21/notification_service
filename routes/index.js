const Email = require('./Email');
const Sms = require('./Sms');

module.exports = (app) => {
    app.use('/Email', Email);
    app.use('/Sms', Sms);
}