require('dotenv').config();

require('./src/models/user');
require('./src/models/brand'); 

const app = require('./src/app');
const sequelize = require('./src/config/db');

const PORT = process.env.PORT || 3000;

sequelize.sync()
.then(() => {

    console.log('DB synced');

    app.listen(PORT, () => {
        console.log(`Server running on http://127.0.0.1:${PORT}`);
    });

})
.catch((err) => {
    console.log("DB error:", err);
});

