import 'animate.css';
import { FaTimes } from 'react-icons/fa';

function TitleRules() {
    return (
        <section className='RulesOfTheGameContainer animate__animated animate__fadeIn'>
            <h2 className='animate__animated animate__bounce'> <FaTimes /> Règles du jeu :</h2>
            <p className='animate__animated animate__fadeInUp'>1. Chaque joueur joue l'un après l'autre.</p>
            <p className='animate__animated animate__fadeInUp'>2. Sélectionnez une case pour placer votre icône (X ou O).</p>
            <p className='animate__animated animate__fadeInUp'>3. Le but est d'aligner trois de vos icônes (X ou O) en ligne, en colonne ou en diagonale.</p>
            <p className='animate__animated animate__fadeInUp'>4. Le premier joueur utilise l'icône X, le second utilise l'icône O.</p>
            <h3 className='animate__animated animate__heartBeat'>Bonne chance à tous les deux !</h3>
        </section>
    );
}

export default TitleRules; // Exportation du composant TitleRules
