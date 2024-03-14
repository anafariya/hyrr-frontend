import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = document.cookie.split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
              const response = await fetch("http://localhost:3001/posts", {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);
  return (
    <main className="mt-10 ">
      <h1 className="text-4xl text-gray-600 font-bold leading-tight md:text-5xl text-center">
        POSTS
      </h1>
      <div className="max-w-screen-md mx-auto">
        {posts.map((post) => (
          <>
            <div
              onClick={() => navigate(`/posts/${post._id}`)}
              key={post._id}
              className="my-5 cursor-pointer w-full relative"
              style={{ height: "24em" }}
            >
              <div
                className="absolute left-0 bottom-0 w-full h-full z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
                }}
              ></div>
              <img
                src={post.image}
                className="absolute left-0 top-0 w-full h-full z-0 object-cover"
                alt="Post"
              />
              <div className="p-4 absolute bottom-0 left-0 z-20">
                <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                  {post.title}
                </h2>

                <div className="flex mt-3">
                  <div>
                    <p className="font-semibold text-gray-200 text-sm">
                      {post.author}
                    </p>
                    <p className="font-semibold text-gray-400 text-xs">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed italic mb-4">
              {post.content}
              {post.content}
              {post.content}
              {post.content}
              {post.content}
              {post.content}
              {post.content}
              {post.content}
              {post.content}
            </p>
            <div className="border-b border-red-200 border-2 my-10"></div>
          </>
        ))}
      </div>
    </main>
  );
}

export default Posts;