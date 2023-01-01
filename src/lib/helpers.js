const helpers = {};

const bcrypt = require('bcryptjs');

helpers.encryptPswd = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPswd = async (password, savedpwd) => {
    try {
        return await bcrypt.compare( password, savedpwd );
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;
