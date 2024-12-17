// import React from 'react'

import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/postService";
import fileService from "../../appwrite/fileService";
import { useCallback, useEffect } from "react";
import Select from "../Select";
import Button from "../Header/Button";
import Input from "../Header/Input";
import RTE from "../RTE";
import { RootState } from "../../store/store";

interface PostProps {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId?: string;
    $id: any,
}
interface PostForm {
    post?: PostProps,
}

function PostForm({ post }: PostForm) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
            image: post?.featuredImage || "",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.auth.userData);
    //form submit handle
    const submit = async (data: any) => {
        try {
            const file = data.image?.[0] ? await fileService.uploadFile(data.image[0]) : null;
            console.log(data);
            console.log(data.image[0]);
            // console.log(post)
            // console.log(file)
            if (post) {
                console.log(file);
                // Update existing post
                if (file) {
                    fileService.deleteFile(post.featuredImage);
                } else {
                    console.log("error in findinf file");
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                if (dbPost) navigate(`/post/${dbPost.$id}`)
            } else {
                //create new post
                if (!userData) {
                    throw new Error("User ID is not available. Please log in.");
                }
                // const fileId = file?.$id;
                // data.featuredImage = fileId;

                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                    userId: userData.$id,
                })
                // console.log(dbPost);
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    //slug transform method
    const slugTransform = useCallback((value: any) => {
        if (value && typeof value === 'string') {
            // const slug  = value.toLowerCase().replace()
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') /*-> ^(if not this)[ range \d (digits) \s (spaces)] /g -> globalCheck, "to replace with" */
                .replace(/\s+/g, '-')
        }
        return "";
    }, [])

    //use effect to update slug
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title));
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    // main function
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={fileService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm