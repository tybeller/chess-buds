import { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

export default function Chessgame() {
  const [chess] = useState(new Chess());
  const [history, setHistory] = useState([]);

  const handleSnapback = () => {
    setFen(chess.fen());
  };

  const handleMove = ({ sourceSquare, targetSquare }) => {
    try {
      let move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for simplicity
      });
    } catch(e) {
      console.log(e)
      return;
    }

    console.log(chess.history())

    setFen(chess.fen());
    setHistory(chess.history({ verbose: true }));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      chess.undo();
      setFen(chess.fen());
      setHistory(chess.history({ verbose: true }));
    }
  };

  const [fen, setFen] = useState('start');

  useEffect(() => {
    setFen(chess.fen());
  }, [chess]);

  return (
    <>
      <Chessboard
        id="humanVsHuman"
        width={800}
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) => 
          handleMove({
            sourceSquare: sourceSquare,
            targetSquare: targetSquare
          })
        }
      />
      <button onClick={handleUndo}>Take back T_T</button>
    </>
  );
}