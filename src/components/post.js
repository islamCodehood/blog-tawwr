import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../themeContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment'
const Post = ({ post }) => {
	const { currentTheme } = useContext(ThemeContext);
	const addComment = async (newComment, id) => {
		const API = axios.create({ baseURL: 'https://api.tawwr.com' });
		await API.post(`/posts/${id}/comment`, newComment);
		const { data } = await API.get('/posts');
		return data.data
	}
	const formik = useFormik({
		initialValues: {
			body: '',
		},
		onSubmit: async (values) => {
			console.log(values)
			const newComment = {...values, userId: 8}
			await addComment(newComment, post.id)
			formik.resetForm();
		}
	});

	return (
		<div className='post mb-3'>
			<Card bg={currentTheme === 'light' ? 'light' : 'dark'}>
				<Card.Header>{post.userId}</Card.Header>
				<Card.Body>
					<Card.Title>{post.title}</Card.Title>
					<Card.Text>{post.body}</Card.Text>
					<Card.Text>
						<input
							type='text'
							name='body'
							id='body'
							value={formik.values.comment}
							onChange={formik.handleChange}
						/>
						<Button
							className='m-2'
							variant={currentTheme === 'light' ? 'primary' : 'warning'}
							onClick={formik.handleSubmit}
						>
							comment
						</Button>
					</Card.Text>
					<Card.Text>Post have {post.comments.length} comments</Card.Text>
					<Card.Text>{post.createdAt}</Card.Text>
					<Link to={'/post/' + post.id}>
						<Button variant={currentTheme === 'light' ? 'primary' : 'warning'}>
							read more
						</Button>
					</Link>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Post;
