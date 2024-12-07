import React, { useEffect, useState } from "react";
import service from "../appwrite/configration";
import { Container, PostCard } from '../components/index'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (!userData) {
            navigate("/login");
        }
    }, [userData, navigate]);
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
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home;