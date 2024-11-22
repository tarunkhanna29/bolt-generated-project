```javascript
    const express = require('express');
    const app = express();
    const port = 3000;
    let songs = [];
    let quizSongs = [];
    let score = 0;
    let quizStarted = false;

    app.use(express.json());
    app.use(express.static('dist'));

    app.post('/upload_bollywood_songs', (req, res) => {
      const { song, singer } = req.body;
      songs.push({ song, singer });
      res.send('Song uploaded successfully!');
    });

    app.get('/guess_bollywood_singer', (req, res) => {
      if (!quizStarted) {
        quizSongs = [...songs];
        quizStarted = true;
      }
      if (quizSongs.length === 0) {
        const finalScore = score;
        score = 0; //reset score for next round
        quizStarted = false;
        res.send({ gameOver: true, finalScore });
        return;
      }
      const randomIndex = Math.floor(Math.random() * quizSongs.length);
      const song = quizSongs.splice(randomIndex, 1)[0];
      res.send({ song: song.song });
    });

    app.post('/guess_bollywood_singer', (req, res) => {
      const { guess } = req.body;
      const currentSong = songs.find(s => s.song === quizSongs[0].song);
      if (guess === currentSong.singer) {
        score += 4;
        res.send({ correct: true, score });
      } else {
        score -= 1;
        res.send({ correct: false, score, correctSinger: currentSong.singer });
      }
    });

    app.get('/score', (req, res) => {
      res.send({ score });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    ```
