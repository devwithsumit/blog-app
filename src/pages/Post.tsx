import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import authService from '../appwrite/authService';
import postService from '../appwrite/postService';
import fileService from '../appwrite/fileService';
import { Button, Container } from '../components';
import parse from 'html-react-parser';

interface PostProps {
    $id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId?: string; // Optional if not always provided
}

function Post() {
    const [post, setPost] = useState<PostProps | null>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData: any = authService.getCurrentUser();

    const isAuthor = post && userData ? post.$id === userData.$id : false;

    useEffect(() => {
        if (post) console.log(fileService.getFilePreview(post.featuredImage));
        if (slug) {
            postService.getPost(slug)
                .then((post: any) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
        } else navigate("/");
    }, [])

    const deletePost = () => {
        if (post) {
            postService.deletePost(post.$id)
                .then((status: any) => {
                    if (status) {
                        fileService.deleteFile(post.featuredImage);
                        navigate("/");
                    }
                });
        }
    };
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={fileService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post