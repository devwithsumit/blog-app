import { Container, PostCard } from "../components"
import postService from "../appwrite/postService";
import { useEffect, useState } from "react"

interface Post {
    $id: string;
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId?: string; // Optional if not always provided
}

function AllPosts() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        postService.getAllPosts([])
            .then((posts) => {
                if (posts) setPosts(posts.documents);
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post: Post) => (
                        <div key={post.$id} className="p-2 w- hover:cursor-pointer">
                            <PostCard
                                $id={post.$id}
                                featuredImage={post.featuredImage}
                                title={post.title}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts