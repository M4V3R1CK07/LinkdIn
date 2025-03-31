import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Post from "../components/Post";

const Saved = () => {
  const { data: session } = useSession();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(
          `/api/posts/saved?userEmail=${session.user.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setSavedPosts(data.savedPosts);
        } else {
          console.error("Failed to fetch saved posts");
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [session]);

  if (!session)
    return (
      <p className="text-center text-lg font-bold mt-6">
        Please log in to view your saved posts
      </p>
    );
  if (loading)
    return (
      <p className="text-center text-lg font-bold mt-6">
        Loading saved posts...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Saved Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPosts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
            No saved posts found.
          </p>
        ) : (
          savedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              {/* Render each saved post using the Post component */}
              <Post post={post} modalPost={false} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Saved;
