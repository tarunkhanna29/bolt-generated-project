```jsx
    import React, { useState, useEffect } from 'react';

    function App() {
      const [songs, setSongs] = useState([]);
      const [currentSong, setCurrentSong] = useState(null);
      const [guess, setGuess] = useState('');
      const [score, setScore] = useState(0);
      const [gameOver, setGameOver] = useState(false);
      const [correctSinger, setCorrectSinger] = useState('');
      const [uploadSong, setUploadSong] = useState('');
      const [uploadSinger, setUploadSinger] = useState('');


      useEffect(() => {
        fetch('/guess_bollywood_singer')
          .then(res => res.json())
          .then(data => {
            if (data.gameOver) {
              setGameOver(true);
            } else {
              setCurrentSong(data.song);
            }
          });
      }, []);

      const handleGuess = () => {
        fetch('/guess_bollywood_singer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guess })
        })
          .then(res => res.json())
          .then(data => {
            if (data.correct) {
              setScore(data.score);
              fetch('/guess_bollywood_singer')
                .then(res => res.json())
                .then(data => {
                  if (data.gameOver) {
                    setGameOver(true);
                  } else {
                    setCurrentSong(data.song);
                  }
                });
            } else {
              setScore(data.score);
              setCorrectSinger(data.correctSinger);
              fetch('/guess_bollywood_singer')
                .then(res => res.json())
                .then(data => {
                  if (data.gameOver) {
                    setGameOver(true);
                  } else {
                    setCurrentSong(data.song);
                  }
                });
            }
          });
        setGuess('');
      };

      const handleUpload = () => {
        fetch('/upload_bollywood_songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ song: uploadSong, singer: uploadSinger })
        })
          .then(res => res.text())
          .then(data => alert(data));
        setUploadSong('');
        setUploadSinger('');
      };

      return (
        <div>
          <h1>Bollywood Singer Quiz</h1>
          <div>
            <input type="text" placeholder="Song" value={uploadSong} onChange={e => setUploadSong(e.target.value)} />
            <input type="text" placeholder="Singer" value={uploadSinger} onChange={e => setUploadSinger(e.target.value)} />
            <button onClick={handleUpload}>Upload Song</button>
          </div>
          {gameOver ? (
            <div>
              <h2>Game Over!</h2>
              <p>Your final score is: {score}</p>
            </div>
          ) : (
            <div>
              <p>Song: {currentSong}</p>
              <input type="text" value={guess} onChange={e => setGuess(e.target.value)} />
              <button onClick={handleGuess}>Guess</button>
              {correctSinger && <p>Correct answer: {correctSinger}</p>}
              <p>Score: {score}</p>
            </div>
          )}
        </div>
      );
    }

    export default App;
    ```
