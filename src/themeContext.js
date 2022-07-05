import { createContext, useState } from 'react';

const themes = {
	light: {
		background: '#fff',
		color: '#434343',
	},
	dark: {
		background: '#434343',
		color: '#fff',
	},
};

export const ThemeContext = createContext();
export const ThemeSwitcher = ({ children }) => {
	
	const [theme, setTheme] = useState(themes.light);
	const [currentTheme, setCurrentTheme] = useState('light');

	const switchTheme = () => {
		if (theme === themes.light) {
			setTheme(themes.dark);
			setCurrentTheme('dark');
		} else {
			setTheme(themes.light);
			setCurrentTheme('light');
		}
	};
	return (
		<ThemeContext.Provider value={{ theme, switchTheme, currentTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

