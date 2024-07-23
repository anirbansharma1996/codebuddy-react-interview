import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
//  console.log(posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error( error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-11/12 m-auto rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/home" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <div key={post.id} className="rounded-lg border p-4">
            <img src={post.avatar} alt={post.firstName} className="h-16 w-16 rounded-full" />
            <h2 className="text-lg font-bold">
              {post.firstName} {post.lastName}
            </h2>
            <p>{post.writeup}</p>
            {post.image && <img src={post.image} alt="Post" className="mt-4 w-full" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
