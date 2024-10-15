import React, { useState, useEffect } from "react";
import service from "../appwrite/configration";
import { Container, PostCard } from "../components/index";
import {useSelector } from "react-redux";

function AllPost() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        service.getPosts(userData).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    return posts ? (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Post Yet
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AllPost;