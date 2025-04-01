import Header from "../components/Header";
import clientPromise from "../lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import Image from "next/image";

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const client = await clientPromise;
    const db = client.db();

    // Fetch the logged-in user's document
    const loggedInUser = await db.collection("users").findOne({
      _id: new ObjectId(session.user.id),
    });

    // Use the connections field (or fallback to 0 if not defined)
    const myConnectionsCount = loggedInUser?.connections || 0;

    // Query all users excluding the logged-in user
    const users = await db
      .collection("users")
      .find({ _id: { $ne: new ObjectId(session.user.id) } })
      .toArray();

    // Format users and provide fallback values if fields are missing
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name || "Unknown Name",
      title: user.title || "Unknown Title",
      image: user.image || "/default-user.png",
    }));

    return {
      props: {
        connections: formattedUsers,
        myConnectionsCount,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { props: { connections: [], myConnectionsCount: 0 } };
  }
}

export default function MyNetwork({ connections = [], myConnectionsCount }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          My Network
        </h1>
        {/* Display the total connections count for the logged-in user */}
        <p className="text-xl text-gray-900 dark:text-white mb-4">
          Total Connections: {myConnectionsCount}
        </p>
        <div className="bg-white dark:bg-[#1D2226] rounded-md shadow p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            People You May Know
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connections.length > 0 ? (
              connections.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center bg-gray-50 dark:bg-gray-800 rounded p-3"
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {person.title}
                    </p>
                  </div>
                  <button className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Connect
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No connections found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
