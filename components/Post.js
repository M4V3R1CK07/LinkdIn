import { Avatar, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { useRecoilState } from "recoil";
import { handlePostState, getPostState } from "../atoms/postAtom";
import { useState, useEffect } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import TimeAgo from "timeago-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Post({ post, modalPost }) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [showInput, setShowInput] = useState(false);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  // Debug post data
  useEffect(() => {
    console.log("Post received:", post);
    console.log("Post likes array:", post.likes);
  }, [post]);

  // Initialize currentPost state from the post prop
  const [currentPost, setCurrentPost] = useState(post);

  // Keep currentPost in sync with post prop
  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  // Handle liked state separately from currentPost to ensure it's reactive
  const [liked, setLiked] = useState(false);

  // Update liked state whenever the post or session changes
  useEffect(() => {
    if (session?.user?.email && currentPost?.likes) {
      const isLiked = currentPost.likes.includes(session.user.email);
      console.log(
        "Checking if post is liked:",
        isLiked,
        session.user.email,
        currentPost.likes
      );
      setLiked(isLiked);
    } else {
      setLiked(false);
    }
  }, [currentPost, session]);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setHandlePost(true);
    setModalOpen(false);
  };

  // Toggle like function that updates both local state and the backend
  const toggleLike = async () => {
    if (!session) return;

    const newLikeStatus = !liked;
    console.log("Toggling like to:", newLikeStatus);

    // Optimistic UI update
    setLiked(newLikeStatus);

    // Create a copy of the current likes array or initialize it if undefined
    const updatedLikes = [...(currentPost.likes || [])];

    if (newLikeStatus) {
      // Add user email if not already present
      if (!updatedLikes.includes(session.user.email)) {
        updatedLikes.push(session.user.email);
      }
    } else {
      // Remove user email
      const index = updatedLikes.indexOf(session.user.email);
      if (index > -1) {
        updatedLikes.splice(index, 1);
      }
    }

    // Update local post state immediately
    setCurrentPost((prev) => ({
      ...prev,
      likes: updatedLikes,
    }));

    try {
      console.log("Sending like update to server:", {
        postId: post._id,
        userEmail: session.user.email,
        like: newLikeStatus,
      });

      const response = await fetch(`/api/posts/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          userEmail: session.user.email,
          like: newLikeStatus,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server response:", data);

        // Update the post with server response
        setCurrentPost((prev) => ({
          ...prev,
          likes: data.likes,
        }));

        // Force refresh of post data to ensure it's saved globally
        setHandlePost(true);
      } else {
        console.error("API error:", await response.text());
        // Revert optimistic update on error
        setLiked(!newLikeStatus);
        setCurrentPost(post);
      }
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert optimistic update on error
      setLiked(!newLikeStatus);
      setCurrentPost(post);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar
          src={currentPost.userImg}
          className="!h-10 !w-10 cursor-pointer"
        />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {currentPost.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">
            {currentPost.email}
          </p>
          <TimeAgo
            datetime={currentPost.createdAt}
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      {currentPost.input && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{currentPost.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(currentPost.input, 150)}
            </p>
          )}
        </div>
      )}

      {currentPost.videoUrl ? (
        <video
          className="w-full h-auto cursor-pointer"
          controls
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(currentPost);
          }}
        >
          <source src={currentPost.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : currentPost.photoUrl ? (
        <Image
          src={currentPost.photoUrl}
          alt="Post Image"
          width={500}
          height={300}
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(currentPost);
          }}
        />
      ) : null}

      <div className="flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={toggleLike}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}
            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === currentPost.email ? (
          <button
            className="postButton focus:text-red-400"
            onClick={deletePost}
          >
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
