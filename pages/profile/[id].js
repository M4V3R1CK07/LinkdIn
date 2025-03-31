// pages/profile/[id].js

import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import Header from "../../components/Header";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });

  // Optionally, you can redirect if not logged in
  if (!session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  const client = await clientPromise;
  const db = client.db();

  // Lookup the user from your database using the id from the URL.
  const user = await db.collection("users").findOne({
    _id: new ObjectId(params.id),
  });

  if (!user) {
    return { notFound: true };
  }

  // Convert _id to string so that it's serializable.
  user._id = user._id.toString();

  // For demo purposes, add dummy fields if they don't exist.
  user.image = user.image || "/default-user.png";
  user.name = user.name || "Aditya Kumar";
  user.pronouns = user.pronouns || "He/Him";
  user.membership = user.membership || "IEEE Computer Society - VITC";
  user.title = user.title || "CSE Student, VITC - Class of 2027";
  user.location = user.location || "Bilaspur, Chhattisgarh, India";
  user.summary =
    user.summary ||
    "Add your summary here to let people know about you! This may include your passions, professional highlights, and personality traits.";
  user.connections = user.connections || 202;
  user.profileViews = user.profileViews || 8;
  user.searchAppearances = user.searchAppearances || 2;

  return { props: { user } };
}

export default function ProfilePage({ user }) {
  // Local state for editing the user's name
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [updating, setUpdating] = useState(false);

  // Function for saving the new name.
  const handleSaveName = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedName }),
      });

      const data = await res.json();
      if (res.ok) {
        // If the update is successful, exit editing mode.
        setEditing(false);
      } else {
        alert(data.message || "Unable to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Error updating name");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Header with background image */}
        <div className="relative">
          <div
            className="w-full h-60 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://via.placeholder.com/1200x400.png?text=Profile+Background')",
            }}
          ></div>
          {/* Profile Image (overlapping the header) */}
          <div className="absolute left-8 bottom-0 transform translate-y-1/2">
            <img
              src={user.image}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Main profile content */}
        <div className="mt-20 px-8">
          {/* User Details */}
          <div className="bg-white dark:bg-[#1D2226] p-6 rounded-md shadow">
            <div className="flex items-center space-x-2">
              {!editing ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {editedName}
                  </h1>
                  <button
                    onClick={() => setEditing(true)}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <EditIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </>
              ) : (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-3xl font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-1 rounded"
                  />
                  <button
                    onClick={handleSaveName}
                    disabled={updating}
                    className="ml-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {updating ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditedName(user.name);
                    }}
                    className="ml-2 px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {user.pronouns}
            </p>
            <p className="mt-2 text-blue-600">{user.membership}</p>
            <p className="mt-1 text-gray-700 dark:text-gray-200">
              {user.title}
            </p>
            <div className="mt-2 flex items-center text-gray-600 dark:text-gray-300">
              {/* You can replace the following SVG with an appropriate location icon */}
              <svg
                className="w-4 h-4 mr-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <span>{user.location}</span>
            </div>
            <div className="mt-4 space-x-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                Contact Info
              </button>
              <button className="px-4 py-2 border border-gray-300 hover:bg-gray-200 rounded">
                Open to
              </button>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-[#1D2226] rounded-md shadow text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.connections}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Connections
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-[#1D2226] rounded-md shadow text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.profileViews}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Profile Views
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-[#1D2226] rounded-md shadow text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.searchAppearances}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Search Appearances
              </p>
            </div>
          </div>

          {/* About / Summary Section */}
          <div className="mt-8 bg-white dark:bg-[#1D2226] p-6 rounded-md shadow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              About
            </h2>
            <p className="text-gray-700 dark:text-gray-200">{user.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
