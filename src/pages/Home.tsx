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
        <div className="w-full py-8 min-h-[50vh]">
            <Container>
                <h1 className="font-semibold text-xl sm:text-2xl my-5">ALL POSTS</h1>
                <div className="flex flex-wrap gap-5">
                    {posts.map((post: any) => (
                        <div key={post.$id} className="w-1/4">
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