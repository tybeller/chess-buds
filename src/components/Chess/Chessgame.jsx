import { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import useSound from 'use-sound';
import moveSound from '/src/assets/move-self.mp3';
import captureSound from '/src/assets/capture.mp3';
import checkSound from '/src/assets/move-check.mp3';
import invalidSound from '/src/assets/wrong.wav';
import { api } from '../../api';
import './Chessgame.css';

export default function Chessgame() {
  const [chess] = useState(new Chess());
  const [history, setHistory] = useState([]);
  const [fen, setFen] = useState('start');
  const [orientation, setOrientation] = useState('white');
  const [gameOver, setGameOver] = useState(false);

  const [exportData, setExportData] = useState(false);
  const [whitePlayerName, setWhitePlayerName] = useState('');
  const [whitePlayerElo, setWhitePlayerElo] = useState('');
  const [blackPlayerName, setBlackPlayerName] = useState('');
  const [blackPlayerElo, setBlackPlayerElo] = useState('');
  const [title, setTitle] = useState(null);

  const [playMoveSound] = useSound(moveSound);
  const [playCaptureSound] = useSound(captureSound);
  const [playCheckSound] = useSound(checkSound);
  const [playInvalidSound] = useSound(invalidSound);

  useEffect(() => {
    setFen(chess.fen());
    setGameOver(chess.isGameOver());
  }, [chess]);

  const handleSnapback = () => {
    setFen(chess.fen());
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleMove = ({ sourceSquare, targetSquare }) => {
    let move = null;
    try {
      move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for simplicity
      });
    } catch(e) {
      playInvalidSound();
      console.log(e);
      return;
    }

    console.log(chess.history())

    setFen(chess.fen());
    setHistory(chess.history({ verbose: true }));
    setGameOver(chess.isGameOver());

    if (chess.isCheck() || chess.isCheckmate()) {
      playCheckSound();
    }
    else if (move.captured) {
      playCaptureSound();
    }
    else {
      playMoveSound();
    }
    sleep(200).then(()=>setOrientation(orientation === 'white' ? 'black' : 'white'))
  };

  const handleUndo = () => {
    if (history.length > 0) {
      chess.undo();
      setOrientation(orientation === 'white' ? 'black' : 'white');
      setFen(chess.fen());
      setHistory(chess.history({ verbose: true }));
      setGameOver(chess.isGameOver());
    }
  };

  const handleFlip = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
  };

  const handleExport = () => {
    setExportData(true);
  };

  const handleSubmit = () => {
    // Make a POST request to the API endpoint with the player information
    api.createPost({
      title: title,
      white_name: whitePlayerName,
      white_elo: whitePlayerElo,
      black_name: blackPlayerName,
      black_elo: blackPlayerElo,
      pgn: chess.pgn(),
      fen: chess.fen()
    });

    // close the forum
    setExportData(false);
    
  };

  return (
    <div>
      <Chessboard
        id="humanVsHuman"
        width={800}
        position={fen}
        orientation={orientation}
        onDrop={({ sourceSquare, targetSquare }) => {
          handleMove({
            sourceSquare: sourceSquare,
            targetSquare: targetSquare
          })
        }}
        
      />
      {gameOver && (
        <>
          <h2>Game Over</h2>
          <button onClick={handleExport}>Post Game</button>
        </>
      )}
      {exportData && (
        <div>
          <form onSubmit={handleSubmit} className="form">
            <br/>
            <label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                placeholder='White Player Name'
                value={whitePlayerName}
                onChange={e => setWhitePlayerName(e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                placeholder='White Player Elo'
                value={whitePlayerElo}
                onChange={e => setWhitePlayerElo(e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                placeholder='Black Player Name'
                value={blackPlayerName}
                onChange={e => setBlackPlayerName(e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                placeholder='Black Player Elo'
                value={blackPlayerElo}
                onChange={e => setBlackPlayerElo(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {!gameOver && (
        <div>
          <button onClick={handleUndo}>Take back T_T</button>
          <button onClick={() => setGameOver(true)}>Resign</button>
        </div>
      )}
    </div>
  );
}
