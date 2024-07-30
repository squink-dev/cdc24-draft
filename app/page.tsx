import FooterModal from "@/components/FooterModal";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="p-4 flex justify-center space-x-4">
        <div>Last Pick: Player Name</div>
        <div className="font-bold text-lg">Currently Picking: Player Name</div>
        <div>Next Pick: Player Name</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex">
        {/* First Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Picked Teams */}
          <div className="flex space-x-4">
            <div className="flex-1 bg-gray-200 p-4">
              Team 1{/* Example Player List */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-2 border-b border-gray-300">
                  Player Name #{index + 1}
                </div>
              ))}
            </div>
            <div className="flex-1 bg-gray-200 p-4">
              Team 2
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-2 border-b border-gray-300">
                  Player Name #{index + 1}
                </div>
              ))}
            </div>
          </div>
          {/* Scrollable Searchable Box */}
          <div className="flex flex-col flex-grow bg-gray-200 p-4">
            <input
              type="text"
              placeholder="Search"
              className="mb-2 p-2 border border-gray-300"
            />
            <div className="flex-grow">
              This will be scrollable
              {/* Example Player List */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-2 border-b border-gray-300">
                  Player Name #{index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Large Team Box */}
          <div className="flex-grow bg-gray-200 p-4">Team Box</div>
          {/* Buttons Area */}
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white py-2 flex-grow">
              Last Team
            </button>
            <button className="bg-green-500 text-white py-2 flex-grow">
              Undo Pick
            </button>
            <button className="bg-green-500 text-white py-2 flex-grow">
              Next Team
            </button>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Upcoming Teams */}
          <div className="flex space-x-4">
            <div className="flex-1 bg-gray-200 p-4">
              Team 3
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-2 border-b border-gray-300">
                  Player Name #{index + 1}
                </div>
              ))}
            </div>
            <div className="flex-1 bg-gray-200 p-4">
              Team 4
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-2 border-b border-gray-300">
                  Player Name #{index + 1}
                </div>
              ))}
            </div>
          </div>
          {/* Discord Captain Chat */}
          <div className="flex-grow bg-green-screen p-4">
            Discord Captain Chat Overlay
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      {/* <div className="flex">
        <button className="bg-green-500 text-white py-2 w-1/2 m-2">
          Open Full Player List
        </button>
        <button className="bg-green-500 text-white py-2 w-1/2 m-2">
          Open Full Team List
        </button>
      </div> */}
      <FooterModal />
    </main>
  );
}
