// eslint-disable-next-line @typescript-eslint/no-var-requires
// const express = require('express')
// const app = express()
// app.use(express.static('./dist/angular-marvel-characters'))

// app.get('/*', function (req, res) {
//   res.sendFile('index.html', { root: 'dist/angular-marvel-characters/' })
// })

// app.listen(process.env.PORT || 8080)

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');

//CREATE EXPRESS APP
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// DECLARE JWT-secret
const JWT_Secret = 'your_secret_key';

var testUser = { email: 'user@user.com', password: '1234' };

app.post('/api/authenticate', (req, res) => {

    if (req.body) {
        var user = req.body;
        console.log(user)

        if (testUser.email === req.body.email && testUser.password === req.body.password) {
            var token = jwt.sign(user, JWT_Secret);
            res.status(200).send({
                signed_user: user,
                token: token
            });
        } else {
            res.status(403).send({
                errorMessage: 'Authorisation required!'
            });
        }
    } else {
        res.status(403).send({
            errorMessage: 'Please provide email and password'
        });
    }

});

app.listen(PORT, () => console.log('Server started on port 5000'));