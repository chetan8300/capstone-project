import { createContext } from 'react';

const DarkModeContext = createContext({
    isDarkMode: false,
    setIsDarkMode: (darkMode) => {}
});

export default DarkModeContext