// pages/profile/[id].js

import { getSession, useSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import Header from "../../components/Header";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });
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
  const user = await db.collection("users").findOne({
    _id: new ObjectId(params.id),
  });

  if (!user) {
    return { notFound: true };
  }

  user._id = user._id.toString();
  user.image = user.image || "/default-user.png";
  user.name = user.name || "Add a Name";
  user.pronouns = user.pronouns || "Add your pronouns";
  user.membership = user.membership || "Add a role";
  user.title = user.title || "Add a title";
  user.location = user.location || "Add a location";
  user.summary =
    user.summary ||
    "Add your summary here to let people know about you! This may include your passions, professional highlights, and personality traits.";
  user.connections = user.connections || 202;
  user.profileViews = user.profileViews || 8;
  user.searchAppearances = user.searchAppearances || 2;

  return { props: { user } };
}

export default function ProfilePage({ user }) {
  // Compare the logged-in user's id with the profile id
  const { data: session } = useSession();
  const isOwnProfile = session?.user?.id === user._id;

  // State for editing Name.
  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [updatingName, setUpdatingName] = useState(false);

  // State for editing About (summary).
  const [editingAbout, setEditingAbout] = useState(false);
  const [editedAbout, setEditedAbout] = useState(user.summary);
  const [updatingAbout, setUpdatingAbout] = useState(false);

  // State for editing Pronouns
  const [editingPronouns, setEditingPronouns] = useState(false);
  const [editedPronouns, setEditedPronouns] = useState(user.pronouns);
  const [updatingPronouns, setUpdatingPronouns] = useState(false);

  // State for editing Membership
  const [editingMembership, setEditingMembership] = useState(false);
  const [editedMembership, setEditedMembership] = useState(user.membership);
  const [updatingMembership, setUpdatingMembership] = useState(false);

  // State for editing Title
  const [editingTitle, setEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(user.title);
  const [updatingTitle, setUpdatingTitle] = useState(false);

  // State for editing Location
  const [editingLocation, setEditingLocation] = useState(false);
  const [editedLocation, setEditedLocation] = useState(user.location);
  const [updatingLocation, setUpdatingLocation] = useState(false);

  const handleSaveName = async () => {
    setUpdatingName(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingName(false);
      } else {
        alert(data.message || "Unable to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Error updating name");
    } finally {
      setUpdatingName(false);
    }
  };

  const handleSaveAbout = async () => {
    setUpdatingAbout(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: editedAbout }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingAbout(false);
      } else {
        alert(data.message || "Unable to update about");
      }
    } catch (error) {
      console.error("Error updating about:", error);
      alert("Error updating about");
    } finally {
      setUpdatingAbout(false);
    }
  };

  const handleSavePronouns = async () => {
    setUpdatingPronouns(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pronouns: editedPronouns }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingPronouns(false);
      } else {
        alert(data.message || "Unable to update pronouns");
      }
    } catch (error) {
      console.error("Error updating pronouns:", error);
      alert("Error updating pronouns");
    } finally {
      setUpdatingPronouns(false);
    }
  };

  const handleSaveMembership = async () => {
    setUpdatingMembership(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membership: editedMembership }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingMembership(false);
      } else {
        alert(data.message || "Unable to update membership");
      }
    } catch (error) {
      console.error("Error updating membership:", error);
      alert("Error updating membership");
    } finally {
      setUpdatingMembership(false);
    }
  };

  const handleSaveTitle = async () => {
    setUpdatingTitle(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingTitle(false);
      } else {
        alert(data.message || "Unable to update title");
      }
    } catch (error) {
      console.error("Error updating title:", error);
      alert("Error updating title");
    } finally {
      setUpdatingTitle(false);
    }
  };

  const handleSaveLocation = async () => {
    setUpdatingLocation(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: editedLocation }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingLocation(false);
      } else {
        alert(data.message || "Unable to update location");
      }
    } catch (error) {
      console.error("Error updating location:", error);
      alert("Error updating location");
    } finally {
      setUpdatingLocation(false);
    }
  };

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Header Background */}
        <div className="relative">
          <div
            className="w-full h-60 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://via.placeholder.com/1200x400.png?text=Profile+Background')",
            }}
          ></div>
          {/* Profile Image */}
          <div className="absolute left-8 bottom-0 transform translate-y-1/2">
            <img
              src={user.image}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="mt-20 px-8">
          <div className="bg-white dark:bg-[#1D2226] p-6 rounded-md shadow">
            {isOwnProfile ? (
              <div className="flex items-center space-x-2">
                {!editingName ? (
                  <>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {editedName}
                    </h1>
                    <button
                      onClick={() => setEditingName(true)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Edit Name"
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
                      disabled={updatingName}
                      className="ml-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {updatingName ? "Saving…" : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingName(false);
                        setEditedName(user.name);
                      }}
                      className="ml-2 px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
            )}

            {/* Pronouns with edit functionality */}
            {isOwnProfile ? (
              <div className="mt-1 flex items-center space-x-2">
                {!editingPronouns ? (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {editedPronouns}
                    </p>
                    <button
                      onClick={() => setEditingPronouns(true)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Edit Pronouns"
                    >
                      <EditIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editedPronouns}
                      onChange={(e) => setEditedPronouns(e.target.value)}
                      className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                      placeholder="Add pronouns"
                    />
                    <button
                      onClick={handleSavePronouns}
                      disabled={updatingPronouns}
                      className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      {updatingPronouns ? "Saving…" : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingPronouns(false);
                        setEditedPronouns(user.pronouns);
                      }}
                      className="ml-2 px-2 py-1 bg-gray-300 text-black text-xs rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {user.pronouns}
              </p>
            )}

            {/* Membership with edit functionality */}
            {isOwnProfile ? (
              <div className="mt-2 flex items-center space-x-2">
                {!editingMembership ? (
                  <>
                    <p className="text-blue-600">{editedMembership}</p>
                    <button
                      onClick={() => setEditingMembership(true)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Edit Membership"
                    >
                      <EditIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editedMembership}
                      onChange={(e) => setEditedMembership(e.target.value)}
                      className="text-blue-600 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                    />
                    <button
                      onClick={handleSaveMembership}
                      disabled={updatingMembership}
                      className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      {updatingMembership ? "Saving…" : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingMembership(false);
                        setEditedMembership(user.membership);
                      }}
                      className="ml-2 px-2 py-1 bg-gray-300 text-black text-xs rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-2 text-blue-600">{user.membership}</p>
            )}

            {/* Title with edit functionality */}
            {isOwnProfile ? (
              <div className="mt-1 flex items-center space-x-2">
                {!editingTitle ? (
                  <>
                    <p className="text-gray-700 dark:text-gray-200">
                      {editedTitle}
                    </p>
                    <button
                      onClick={() => setEditingTitle(true)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                      title="Edit Title"
                    >
                      <EditIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                    />
                    <button
                      onClick={handleSaveTitle}
                      disabled={updatingTitle}
                      className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      {updatingTitle ? "Saving…" : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingTitle(false);
                        setEditedTitle(user.title);
                      }}
                      className="ml-2 px-2 py-1 bg-gray-300 text-black text-xs rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-1 text-gray-700 dark:text-gray-200">
                {user.title}
              </p>
            )}

            {/* Location with edit functionality */}
            <div className="mt-2 flex items-center text-gray-600 dark:text-gray-300">
              <svg
                className="w-4 h-4 mr-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              {isOwnProfile ? (
                <>
                  {!editingLocation ? (
                    <>
                      <span>{editedLocation}</span>
                      <button
                        onClick={() => setEditingLocation(true)}
                        className="ml-1 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        title="Edit Location"
                      >
                        <EditIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editedLocation}
                        onChange={(e) => setEditedLocation(e.target.value)}
                        className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                      />
                      <button
                        onClick={handleSaveLocation}
                        disabled={updatingLocation}
                        className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        {updatingLocation ? "Saving…" : "Save"}
                      </button>
                      <button
                        onClick={() => {
                          setEditingLocation(false);
                          setEditedLocation(user.location);
                        }}
                        className="ml-2 px-2 py-1 bg-gray-300 text-black text-xs rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <span>{user.location}</span>
              )}
            </div>

            <div className="mt-4 space-x-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                Contact Info
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

          {/* About Section */}
          <div className="mt-8 bg-white dark:bg-[#1D2226] p-6 rounded-md shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                About
              </h2>
              {isOwnProfile && !editingAbout && (
                <button
                  onClick={() => setEditingAbout(true)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              )}
            </div>
            {isOwnProfile && editingAbout ? (
              <div>
                <textarea
                  value={editedAbout}
                  onChange={(e) => setEditedAbout(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                  rows={4}
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={handleSaveAbout}
                    disabled={updatingAbout}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {updatingAbout ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setEditingAbout(false);
                      setEditedAbout(user.summary);
                    }}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-200">{editedAbout}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
