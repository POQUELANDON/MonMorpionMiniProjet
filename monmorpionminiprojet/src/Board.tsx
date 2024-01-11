// Importation des hooks nécessaires depuis React
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { FaHandRock } from 'react-icons/fa';

// Définition du type des valeurs possibles pour chaque case du jeu
type SquareValue = 'X' | 'O' | null;

// Fonction pour calculer le gagnant ou vérifier s'il y a un match nul
const calculateWinner = (squares: SquareValue[]) => {
    // Définition des combinaisons gagnantes dans un tableau 3x3
    const lines = [
        [0, 1, 2], // première ligne
        [3, 4, 5], // deuxième ligne
        [6, 7, 8], // troisième ligne
        [0, 3, 6], // première colonne
        [1, 4, 7], // deuxième colonne
        [2, 5, 8], // troisième colonne
        [0, 4, 8], // première diagonale
        [2, 4, 6], // deuxième diagonale
    ];
    // Vérification de chaque combinaison pour trouver un gagnant
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Retourne le gagnant ('X' ou 'O')
        }
    }
    // Vérifie s'il y a un match nul (toutes les cases sont remplies sans gagnant)
    const isDraw = squares.every((square) => square !== null);
    if (isDraw) {
        return 'Match nul';
    }
    return null; // Retourne null si la partie n'est pas encore terminée
};

// Composant pour chaque case du jeu
// Affiche la valeur de la case ('X', 'O' ou null)
const Square: React.FC<{ value: SquareValue; onClick: () => void }> = ({ value, onClick }) => (
    <button className="square" onClick={onClick}>
        {value} 
    </button>
);

// Composant pour le plateau de jeu
const Board: React.FC = () => {
    // Utilisation du hook useState pour gérer l'état du jeu
    const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null)); // État des cases
    const [xIsNext, setXIsNext] = useState<boolean>(true); // État pour savoir quel joueur doit jouer
    // Ajoutez un nouvel état pour les confettis
    const [confetti, setConfetti] = useState<boolean>(false);

    // Fonction pour gérer le clic sur une case et déclencher les confettis lorsqu'un joueur gagne
    const handleClick = (i: number) => {
        const newSquares = squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);

        // Si un joueur a gagné, déclenchez les confettis
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
        status = 'Gagnant: ' + winner; // Affiche le gagnant
    } else {
        status = 'Prochain joueur: ' + (xIsNext ? 'X' : 'O'); // Affiche le joueur suivant
    }

    // Ajoutez un nouvel état pour le message du perdant
    const [loserMessage, setLoserMessage] = useState<string | null>(null);

    // Mettez à jour le message du perdant lorsque le gagnant change
    useEffect(() => {
        if (winner === 'X') {
            setLoserMessage('Try again, O ');
        } else if (winner === 'O') {
            setLoserMessage('Try again, X ');
        } else {
            setLoserMessage(null);
        }
    }, [winner]);

    // Fonction pour redémarrer le jeu
    const restartGame = () => {
        setSquares(Array(9).fill(null)); // Réinitialise les cases
        setXIsNext(true); // Réinitialise le joueur
        setConfetti(false); // Arrête les confettis
    };

    // Rendu du plateau de jeu
    return (
        <div>
            {confetti && <Confetti />}
            <div className={`status ${winner ? 'animate__animated animate__zoomIn status-zoom' : ''}`}>{status}</div>
            {loserMessage &&
                <div className="loser-message"><FaHandRock /> {loserMessage} </div>}
            <div className="board-row">
                {renderSquare(0)}
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