import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handlePostState, selectedMediaState } from "../atoms/postAtom";

function Form() {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [selectedMedia, setSelectedMedia] = useRecoilState(selectedMediaState);

  const uploadPost = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        photoUrl: selectedMedia?.url || null, // Use selectedMedia.url instead of photoUrl
        mediaType: selectedMedia?.type || null, // Add mediaType to differentiate image/video
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    setHandlePost(true);
    setModalOpen(false);
    setInput(""); // Clear input after posting
    setSelectedMedia(null);
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {selectedMedia?.url && (
        <div className="relative w-full flex justify-center">
          {selectedMedia.type === "image" ? (
            <img
              src={selectedMedia.url}
              alt="Selected"
              className="max-w-full max-h-40 rounded-lg"
            />
          ) : (
            <video
              src={selectedMedia.url}
              controls
              className="max-w-full max-h-40 rounded-lg"
            />
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedMedia(null);
            }}
            className="absolute top-0 right-0 bg-gray-800 rounded-full p-1 text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        type="submit"
        onClick={uploadPost}
        disabled={!input.trim() && !selectedMedia?.url}
      >
        Post
      </button>
    </form>
  );
}

export default Form;
