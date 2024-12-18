// import React from 'react'

import { useEffect, useState } from "react"
import postService from "../appwrite/postService";
import { Container, PostCard } from "../components";


function Home() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        postService.getAllPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    return posts.length > 0 ? (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post: any) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (
        
        <Container>
            No Posts to Show
        </Container>
    )
}

export default Home