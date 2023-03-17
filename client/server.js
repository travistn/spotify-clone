require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.post('/login', async (req, res) => {
  const { code } = req.body;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  });

  try {
    const {
      body: { access_token, refresh_token, expires_in },
    } = await spotifyApi.authorizationCodeGrant(code);

    res.json({ access_token, refresh_token, expires_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    refreshToken,
  });

  try {
    const {
      body: { access_token, expires_in },
    } = await spotifyApi.refreshAccessToken();
    res.json({ access_token, expires_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

const root = require('path').join(__dirname, 'build');
app.use(express.static(root));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening on port ${port}`);
});
