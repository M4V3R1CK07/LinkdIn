import Header from "../components/Header";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Menu */}
          <aside className="w-full md:w-1/4 bg-white dark:bg-[#1D2226] rounded-md shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Settings
            </h2>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white font-medium">
                  Account Preferences
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                  Sign in &amp; Security
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                  Visibility
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                  Data Privacy
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                  Advertising Data
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300">
                  Notifications
                </button>
              </li>
            </ul>
          </aside>

          {/* Main Settings Content */}
          <main className="w-full md:w-3/4 space-y-6">
            {/* Profile Information Section */}
            <section className="bg-white dark:bg-[#1D2226] rounded-md shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Profile Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Name, Location, and Industry
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Personal Demographic Information
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Verifications
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </div>
              </div>
            </section>

            {/* Display Section */}
            <section className="bg-white dark:bg-[#1D2226] rounded-md shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Display
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
                {/* Placeholder toggle */}
                <button className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                  <span className="absolute top-0 left-0 bg-white dark:bg-gray-300 w-6 h-6 rounded-full shadow transform transition-all"></span>
                </button>
              </div>
            </section>

            {/* General Preferences Section */}
            <section className="bg-white dark:bg-[#1D2226] rounded-md shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                General Preferences
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>Language: English (United States)</li>
                <li>Content Language: English (United States)</li>
                <li>Autoplay Videos: On</li>
                <li>Sound Effects: On</li>
                <li>Showing Profile Photos: All LinkedIn Members</li>
                <li>Preferred Feed View: Most Relevant Posts (Recommended)</li>
                <li>People You Unfollowed</li>
              </ul>
            </section>

            {/* Syncing Options Section */}
            <section className="bg-white dark:bg-[#1D2226] rounded-md shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Syncing Options
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Sync Calendar
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Sync Now
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">
                    Sync Contacts
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Sync Now
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
