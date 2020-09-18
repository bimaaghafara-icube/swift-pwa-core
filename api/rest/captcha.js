const qs = require('querystring');
const { recaptcha } = require('../../../swift.config');

module.exports = (req, res) => {
    const { response } = req.body;
    const secret = recaptcha.serverKey[process.env.APP_ENV] || recaptcha.serverKey.dev;
    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'post',
        body: qs.stringify({
            response,
            secret,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
        .then((data) => data.json())
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((err) => res.status(500).json(err));
};
