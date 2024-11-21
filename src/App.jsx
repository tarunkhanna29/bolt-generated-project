import React, { useState, useEffect } from 'react';
  import './App.css';

  function App() {
    const [activeTab, setActiveTab] = useState('upload');
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState({ song: null, singer: '' });
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState('');
    const [editingSong, setEditingSong] = useState(null);

    useEffect(() => {
      // Load songs from local storage on component mount
      const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
      setSongs(storedSongs);
    }, []);

    useEffect(() => {
      // Save songs to local storage whenever songs state changes
      localStorage.setItem('songs', JSON.stringify(songs));
    }, [songs]);

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

    const handleSongUpload = async (e) => {
      e.preventDefault();
      const file = newSong.song;
      const reader = new FileReader();
      reader.onload = async (e) => {
        const songData = e.target.result;
        const newSongData = { song: songData, singer: newSong.singer, name: file.name };
        setSongs([...songs, newSongData]);
        setNewSong({ song: null, singer: '' });
      };
      reader.readAsDataURL(file);
    };

    const handleSongDelete = (index) => {
      const updatedSongs = songs.filter((_, i) => i !== index);
      setSongs(updatedSongs);
    };

    const handleSongEdit = (index) => {
      setEditingSong(index);
    };

    const handleEditSave = (index, newSinger) => {
      const updatedSongs = [...songs];
      updatedSongs[index].singer = newSinger;
      setSongs(updatedSongs);
      setEditingSong(null);
    };

    const handleEditCancel = () => {
      setEditingSong(null);
    };

    const fetchQuiz = async () => {
      const shuffledSongs = songs.sort(() => 0.5 - Math.random());
      const quizSongs = shuffledSongs.slice(0, Math.min(5, songs.length));
      setQuiz(quizSongs);
      setCurrentQuestion(0);
      setScore(0);
      setResult('');
    };

    const handleGuess = () => {
      if (quiz[currentQuestion].singer === guess) {
        setScore(score + 4);
        setResult('Correct!');
      } else {
        setScore(score - 1);
        setResult(`Incorrect. The singer is ${quiz[currentQuestion].singer}`);
      }
      setCurrentQuestion(currentQuestion + 1);
      setGuess('');
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleGuess();
    };

    return (
      // ... rest of the component remains the same
    );
  }

  export default App;
