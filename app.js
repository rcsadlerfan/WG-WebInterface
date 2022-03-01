const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { readFileSync, writeFileSync } = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    if (process.env.WG_CONFIG_PATH === undefined) {
        res.send('No WireGuard configuration path setup. Please read README to see setup instructions');
    }

    const file = readFileSync(process.env.WG_CONFIG_PATH, {
        encoding: 'utf-8',
        flag: 'r'
    });

    const parts = file.split('\n\n');
    const config = {
        interface: {},
        peers: {}
    };

    parts.forEach(part => {
        const pairs = part.split('\n');
        const n = {};

        if (pairs[0] === '[Interface]') {
            for (let i = 1; i < pairs.length; i++) {
                const temp = pairs[i].split('=');
                n[`${temp[0]}`] = temp[1];
            }

            config.interface = n;
        } else {
            const peer = pairs[0].split('# ')[1];

            for (let i = 2; i < pairs.length; i++) {
                const temp = pairs[i].split('=');
                n[`${temp[0]}`] = temp[1];
            }

            config.peers[`${peer}`] = n;
        }
    });

    res.render('index', { config });
})

app.listen(PORT, console.log(`Started server on port ${PORT}`));