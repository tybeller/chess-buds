import { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import useSound from 'use-sound';
import moveSound from '/src/assets/move-self.mp3';
import captureSound from '/src/assets/capture.mp3';
import checkSound from '/src/assets/move-check.mp3';

export default function Chessgame() {
  const [chess] = useState(new Chess());
  const [history, setHistory] = useState([]);
  const [fen, setFen] = useState('start');
  const [orientation, setOrientation] = useState('white');
  const [gameOver, setGameOver] = useState(false);


  const [playMoveSound] = useSound(moveSound);
  const [playCaptureSound] = useSound(captureSound);
  const [playCheckSound] = useSound(checkSound);

  useEffect(() => {
    setFen(chess.fen());
    setGameOver(chess.isGameOver());
  }, [chess]);

  const handleSnapback = () => {
    setFen(chess.fen());
  };

  const handleMove = ({ sourceSquare, targetSquare }) => {
    let move = null;
    try {
      move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for simplicity
      });
    } catch(e) {
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
  };

  const handleUndo = () => {
    if (history.length > 0) {
      chess.undo();
      setFen(chess.fen());
      setHistory(chess.history({ verbose: true }));
      setGameOver(chess.isGameOver());
    }
  };

  const handleFlip = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
  };

  const handleExport = () => {
    if (gameOver) {
      const exportedPGN = chess.pgn();
      const exportedFEN = chess.fen();
      console.log(exportedPGN, exportedFEN);
      // do something with the exported PGN and FEN
    }
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
          <div>Game Over</div>
          <button onClick={handleExport}>Export PGN and FEN</button>
        </>
      )}
      <button onClick={handleUndo}>Take back T_T</button>
      <button onClick={handleFlip}>Flip board orientation</button>
      <button onClick={() => setGameOver(true)}>Resign</button>
    </div>
  );
}
