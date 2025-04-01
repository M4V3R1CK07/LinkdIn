// /pages/saved.js
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Container, Typography } from "@mui/material";
// Import the Post component that renders the full post as in your feed.
import Post from "../components/Post";

export default function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const { data: session } = useSession();

  // Fetch saved posts when the session changes
  useEffect(() => {
    async function fetchSavedPosts() {
      if (!session || !session.user?.email) return;
      try {
        const res = await fetch(
          `/api/posts/saved?userEmail=${encodeURIComponent(session.user.email)}`
        );
        if (res.ok) {
          const data = await res.json();
          setSavedPosts(data.savedPosts);
        } else {
          console.error("Failed to fetch saved posts");
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    }
    fetchSavedPosts();
  }, [session]);

  // Handler to unsave a post using the DELETE method
  const handleUnsave = async (postId) => {
    if (!session) return;
    try {
      const res = await fetch("/api/posts/save", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userEmail: session.user.email,
        }),
      });

      if (res.ok) {
        // Update UI by removing the unsaved post from the list.
        setSavedPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      } else {
        const errorData = await res.json();
        console.error("Failed to unsave post:", errorData.error);
      }
    } catch (error) {
      console.error("Error unsaving the post:", error);
    }
  };

  if (!session) {
    return (
      <Container>
        <Typography variant="h6">
          Please sign in to view saved posts.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Saved Posts
      </Typography>
      {savedPosts && savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <div key={post._id} style={{ marginBottom: "2rem" }}>
            {/* Render the full post using your existing Post component */}
            <Post post={post} modalPost={false} />
            {/* Render an Unsave button below each post */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleUnsave(post._id)}
              style={{ marginTop: "0.5em" }}
            >
              Unsave
            </Button>
          </div>
        ))
      ) : (
        <Typography variant="body1">No saved posts found.</Typography>
      )}
    </Container>
  );
}
