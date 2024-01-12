// Importation des hooks necessaires depuis React
import React, { useState, useEffect } from 'react';
import TitleRules from './components/TitleRules'
import Confetti from 'react-confetti';
import { FaHandRock } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import 'animate.css';

// Definition du type des valeurs possibles pour chaque case du jeu
type SquareValue = 'X' | 'O' | null;

// Fonction pour calculer le gagnant ou verifier s'il y a un match nul
const calculateWinner = (squares: SquareValue[]) => {
    // Definition des combinaisons gagnantes dans un tableau 3x3
    const lines = [
        [0, 1, 2], // premiere ligne
        [3, 4, 5], // deuxieme ligne
        [6, 7, 8], // troisieme ligne
        [0, 3, 6], // premiere colonne
        [1, 4, 7], // deuxieme colonne
        [2, 5, 8], // troisieme colonne
        [0, 4, 8], // premiere diagonale
        [2, 4, 6], // deuxieme diagonale
    ];
    // Verification de chaque combinaison pour trouver un gagnant
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Retourne le gagnant ('X' ou 'O')
        }
    }
    // Verifie s'il y a un match nul (toutes les cases sont remplies sans gagnant)
    const isDraw = squares.every((square) => square !== null);
    if (isDraw) {
        return 'Match nul';
    }
    return null; // Retourne null si la partie n'est pas encore terminee
};

// Composant pour chaque case du jeu
// Affiche la valeur de la case ('X', 'O' ou null)
const Square: React.FC<{ value: SquareValue; onClick: () => void }> = ({ value, onClick }) => (
    <button className="square" title={`square${value}`} onClick={onClick}>
    {value} 
    </button>
);

// Composant pour le plateau de jeu
const Board: React.FC = () => {
    // Utilisation du hook useState pour gerer l'etat du jeu
    const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null)); // etat des cases
    const [xIsNext, setXIsNext] = useState<boolean>(true); // etat pour savoir quel joueur doit jouer
    const [confetti, setConfetti] = useState<boolean>(false);
    const [showRules, setShowRules] = useState<boolean>(true); // etat pour afficher ou masquer les règles du jeu

    // Fonction pour gerer le clic sur une case et declencher les confettis lorsqu'un joueur gagne
    const handleClick = (i: number) => {
        const newSquares = squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
        setShowRules(false);

        // Si un joueur a gagne, declenchez les confettis
        if (calculateWinner(newSquares)) {
            setConfetti(true);
        }
    };

    // Fonction pour rendre une case
    const renderSquare = (i: number) => <Square value={squares[i]} onClick={() => handleClick(i)} />;

    // Calcul du gagnant
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Gagnant est '+ winner +' !'; // Affiche le gagnant
    } else {
        status = 'Prochain joueur: ' + (xIsNext ? 'X' : 'O'); // Affiche le joueur suivant
    }

    // Etat pour le message du perdant
    const [loserMessage, setLoserMessage] = useState<string | null>(null);

    // Met à jour le message du perdant lorsque le gagnant change
    useEffect(() => {
        if (winner === 'X') {
            setLoserMessage('Try again, O ');
        } else if (winner === 'O') {
            setLoserMessage('Try again, X ');
        } else {
            setLoserMessage(null);
        }
    }, [winner]);

    // Fonction pour redemarrer le jeu
    const restartGame = () => {
        setSquares(Array(9).fill(null)); // Reinitialise les cases
        setXIsNext(true); // Reinitialise le joueur
        setConfetti(false); // Arrete les confettis
    };

    // Rendu du plateau de jeu
    return (
        <div>
            {confetti && <Confetti />}
            <div className='TitleRulesContent'>
                {showRules && <TitleRules />}
                <div className={`status ${winner ? 'animate__animated animate__zoomIn status-zoom' : ''}`}>{winner && <FaTrophy />} {status}</div>
                {loserMessage &&
                    <div className="loser-message"><FaHandRock /> {loserMessage} </div>}
            </div>
            <div className="board-row" >
                {renderSquare(0) }
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button onClick={restartGame} disabled={!winner}>Restart</button>
        </div>
    );
};

export default Board; // Exportation du composant Board