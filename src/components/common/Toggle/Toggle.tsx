import React, { useContext } from 'react';
// import './ThemeToggle.scss';
import { ThemeContext } from '@/context/ThemeProvider';


const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(event.target.value);
    };

    return (
        <div className="theme-toggle-container">
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Mode Sombre' : theme === 'dark' ? '🌈 Mode Pastel' : '☀️ Mode Clair'}
            </button>
            <select value={theme} onChange={handleThemeChange} className="theme-selector">
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
                <option value="pastel">Pastel</option>
                {/* Ajoute d'autres thèmes ici */}
            </select>
        </div>
    );
};

export default ThemeToggle;
