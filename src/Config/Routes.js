const { apiRoutes } = require('../Routes/api');
const BodyParser = require('body-parser');
const cors = require('cors'); 
module.exports = (app) => {
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/api', apiRoutes);
};