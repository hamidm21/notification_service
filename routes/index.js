const Email = require('./Email');

module.exports = (app) => {
    app.use('/Email', Email);
}