import Header from "../components/Header";

export default function MyNetwork() {
  // Dummy data for people you may know
  const dummyConnections = [
    {
      id: 1,
      name: "Alice Johnson",
      title: "Software Engineer at ABC Corp",
      image: "/dummy1.png", // replace with your dummy image path or URL
    },
    {
      id: 2,
      name: "Bob Smith",
      title: "Product Manager at XYZ Inc",
      image: "/dummy2.png",
    },
    {
      id: 3,
      name: "Carol Lee",
      title: "Designer at Creative Co",
      image: "/dummy3.png",
    },
    {
      id: 4,
      name: "Dave Roberts",
      title: "Data Scientist at Data Inc",
      image: "/dummy4.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          My Network
        </h1>
        <div className="bg-white dark:bg-[#1D2226] rounded-md shadow p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            People You May Know
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyConnections.map((person) => (
              <div
                key={person.id}
                className="flex items-center bg-gray-50 dark:bg-gray-800 rounded p-3"
              >
                <img
                  src={person.image}
                  alt={person.name}
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
            ))}
          </div>
        </div>

        {/* You can add additional sections here for your My Network page (e.g., invitations, recent trends) */}
      </div>
    </div>
  );
}
