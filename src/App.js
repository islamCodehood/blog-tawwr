import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/navbar';
import Home from './pages/home';
import PostDetails from './pages/postDetails';
import { Routes, Route } from 'react-router-dom';
import { ThemeSwitcher } from './themeContext';
import axios from 'axios';

function App() {
	const [posts, setPosts] = useState([]);
	
	const getAllPosts = async () => {
		const API = axios.create({ baseURL: 'https://api.tawwr.com/posts' });
		const { data } = await API.get('https://api.tawwr.com/posts');
		console.log(data.data);
		const sortedPosts = data.data.sort((a, b) => b.id - a.id);
		return sortedPosts;
	};

	useEffect(() => {
		getAllPosts().then(posts => setPosts(posts));
	}, []);

	

	return (
		<div className='App'>
			<ThemeSwitcher>
				<NavBar posts={posts} setPosts={setPosts} />
				<Routes>
					<Route path='/' element={<Home posts={posts} setPosts={setPosts} />} />
					<Route path='/post/:id' element={<PostDetails posts={posts} />} />
				</Routes>
			</ThemeSwitcher>
		</div>
	);
}

export default App;
