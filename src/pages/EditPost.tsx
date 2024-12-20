// import React from 'react'

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import postService from "../appwrite/postService";
import { Container, PostForm } from "../components";

// interface Post {
//     $id: string;
//     title: string;
//     slug: string;
//     content: string;
//     featuredImage: string;
//     status: string;
//     userId?: string; // Optional if not always provided
// }

function EditPost() {
    const [post, setPost] = useState<any>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) setPost(post);
            })
        } else {
            navigate('/')
        }
    }, [])

    return post && (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    )
}

export default EditPost