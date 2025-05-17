// import React from 'react'
import { Link } from "react-router-dom"
import fileService from "../../appwrite/fileService"
// import { useEffect } from "react";


interface Post {
    $id?: string;
    title: string;
    featuredImage: string;
}

function PostCard({
    $id,
    title,
    featuredImage
}: Post) {

    // useEffect(() => {
    //   const image = fileService.getFilePreview(featuredImage)
    //   if(image) console.log(image);
    // }, [])

    return (
        <Link to={`/post/${$id}`}>
            <div className="shadow-md w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={fileService.getFilePreview(featuredImage) || 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt={title}
                        className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard;