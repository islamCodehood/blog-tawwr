import PostModal from "./postModal";
import {Link} from 'react-router-dom'
import { Navbar, Container } from "react-bootstrap";
import {ReactComponent as Sun} from'../assets/sun.svg'
import {ReactComponent as Moon} from'../assets/moon.svg'
import {ThemeContext} from '../themeContext'
import {useContext} from 'react'
const NavBar = ({ posts, setPosts }) => {
	const {theme, switchTheme, currentTheme} = useContext(ThemeContext)
	return (
		<Navbar >
			<Container>
				<Link to="/">
				<Navbar.Brand>My Blog</Navbar.Brand>

				</Link>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>

						<PostModal posts={posts} setPosts={setPosts} />
					
						
					</Navbar.Text>
					<div onClick={() => switchTheme()} className="d-inline" style={{width: "30px"}}>
						{currentTheme === 'light' ? <Moon /> : <Sun />}
						</div>
					<Navbar.Text>
						
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
