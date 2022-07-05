import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext } from 'react';
import { ThemeContext } from '../themeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const PostModal = ({ posts, setPosts }) => {
	const [show, setShow] = useState(false);

	const { theme } = useContext(ThemeContext);

	const addPost = async (newPost) => {
		const API = axios.create({ baseURL: 'https://api.tawwr.com' });
		await API.post('/posts', newPost);
		const { data } = await API.get('/posts');
		return data.data
	}

	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
		},
		onSubmit: async (values) => {
			console.log(values)
			const newPost = {...values, userId: 8}
			const updatedPosts = await addPost(newPost)
			setPosts(updatedPosts)
			formik.resetForm();
			handleClose()
		},
		// validationSchema: Yup.object({
		// 	name: Yup.string().required('Name is required').max(15, 'limit passed'),
		// 	address: Yup.string().required('Address is required'),
		// 	city: Yup.string().required('City is required'),
		// 	mobile: Yup.number()
		// 		.required('Mobile number is required')
		// }),
	});
	const handleClose = () => {
		setShow(false);
		//setPosts([...posts, newPost]);
	};
	const handleShow = () => setShow(true);
	return (
		<>
			<Button variant='outlined' onClick={handleShow}>
				+ New Post
			</Button>
			<Modal
				show={show}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header style={theme}>
					<Modal.Title id='contained-modal-title-vcenter'>
						Your Next Post
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={theme}>

					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								name='title'
								id='title'
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder='write title..'
							/>
						</Form.Group>
							{/* <Form.Group className='mb-3'>
								<Form.Label>Author</Form.Label>
								<Form.Control
									type='text'
									id='userId'
									name="userId"
									value={author}
									onChange={e => setAuthor(e.target.value)}
									placeholder='author'
								/>
							</Form.Group> */}
					</Form>
					

					<Form.Control
						as='textarea'
						id='body'
						name="body"
						value={formik.values.body}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder='write post..'
						style={{ height: '100px' }}
					/>
					<Modal.Footer>
					<Button onClick={formik.handleSubmit} variant='primary'>
						Publish
					</Button>
					<Button onClick={handleClose} variant='primary'>
						Cancel
					</Button>
					</Modal.Footer>

				</Modal.Body>
			</Modal>
		</>
	);
};

export default PostModal;
