const express = require('express');
  const app = express();
  const port = 3000;
  let songs = [];

  app.use(express.json());

  app.post('/upload_bollywood_songs', (req, res) => {
    const { song, singer } = req.body;
    songs.push({ song, singer });
    res.send('Song uploaded successfully!');
  });

  app.get('/guess_bollywood_singer', (req, res) => {
    if (songs.length === 0) {
      return res.send({ error: 'No songs uploaded yet.' });
    }
    const shuffledSongs = songs.sort(() => 0.5 - Math.random());
    const quizSongs = shuffledSongs.slice(0, Math.min(5, songs.length));
    res.send({ quizSongs });
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
