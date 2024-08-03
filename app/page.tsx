import FooterModal from "@/components/FooterModal";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div id="top">
        <div className="columns-3 gap-4">
          <div className="text-cdc-darkred text-3xl text-right">
            Last Pick: jiaxunjason
          </div>
          <div className="pt-2 pb-2 text-white text-3xl text-center mix-blend-difference">
            Currently Picking: jiaxunjason
          </div>
          <div className="text-cdc-darkred text-3xl text-left">
            Next Pick: jiaxunjason
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex">
        {/* First Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Already Picked Teams */}
          {/* TODO: Add column header */}
          <div className="flex space-x-4 ">
            <div className="flex-1 bg-gray-200 p-4 h-[430px] border-2 border-cdc-darkgrey"></div>
            <div className="flex-1 bg-gray-200 p-4 h-[430px] border-2 border-cdc-darkgrey"></div>
          </div>
          <div className="border-2 border-cdc-darkgrey">
            <SearchBox />
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Large Team Box */}
          <div className="flex-grow bg-cdc-darkgrey p-4 pt-10 text-2xl text-white">
            {/* TODO: Keep this? Duplicate text to the header above */}
            <div id="bolsterBold">
              <div className="-translate-y-8">
                <text>Team jiaxunjason</text>
              </div>
            </div>
          </div>
          {/* Buttons Area */}
          <div className="justify-center items-center flex space-x-4">
            <button className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <button className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button className="bg-cdc-red border-4 border-cdc-darkred py-2 flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 stroke-cdc-darkred stroke-2 translate-x-20"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Upcoming Teams */}
          {/* TODO: Add column header */}
          <div className="flex space-x-4">
            <div className="flex-1 bg-gray-200 p-4 h-[430px] border-2 border-cdc-darkgrey"></div>
            <div className="flex-1 bg-gray-200 p-4 h-[430px] border-2 border-cdc-darkgrey"></div>
          </div>
          {/* Discord Captain Chat */}
          <div className="flex-grow bg-green-screen p-4 border-2 border-cdc-darkgrey"></div>
        </div>
      </div>

      <FooterModal />
    </main>
  );
}
