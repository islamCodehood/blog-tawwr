import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useContext} from 'react';
import {ThemeContext} from '../themeContext'

const PostDetails = ({ posts }) => {
	const { id } = useParams();
	const [post, setPost] = useState({});

	const {theme} = useContext(ThemeContext)


	useEffect(() => {
		const post = posts.find(post => post.id === +id);
		setPost(post);
	}, [posts]);
  
	return (
		<div className='p-2' style={{...theme, height: "100vh"}}>
			{post && (
				<>
					<div className='text-decoration-underline'>
						<h2>{post?.title}</h2>
						<p>
							by user: <span className='fst-italic '>{post.userId}</span>
						</p>
					</div>
					<div className='m-3'>
						<p>{post?.body}</p>
					</div>

				</>
			)}
		</div>
	);
};

export default PostDetails;
