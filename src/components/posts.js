import Post from "./post";

const Posts = ({posts, setPosts}) => {
    
    return ( 
        <div className="p-3">
            {
                posts?.map(post => <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />)
            }
        </div>
     );
}
 
export default Posts;