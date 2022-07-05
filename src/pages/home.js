import Posts from '../components/posts';
import {useContext} from 'react';
import {ThemeContext} from '../themeContext'

const Home = ({posts, setPosts}) => {
  const {theme} = useContext(ThemeContext)
  return ( 
    <div style={theme}>
			<Posts posts={posts} setPosts={setPosts} />
    </div>
   );
}
 
export default Home;