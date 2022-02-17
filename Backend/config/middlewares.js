const bodyParse = require('body-parser');
const cors = require('cors');

module.exports = app => {
    app.use(bodyParse.json({limit: '10mb', extended: true}));
    app.use(cors());
}