import FooterModal from "@/components/FooterModal";
import SearchBox from "@/components/SearchBox";
import PlayerCard from "@/components/PlayerCard";
import CurrentPlayerCard from "@/components/CurrentPlayerCard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="pt-4 pl-4 pr-4 flex justify-center space-x-4">
        <div className="text-lg">Last Pick: cillian</div>
        <div className="font-bold text-2xl">Currently Picking: jykca</div>
        <div className="text-lg">Next Pick: Laser__</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex">
        {/* First Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Picked Teams */}
          <div className="flex space-x-4">
            <div className="flex-1 bg-gray-200 p-4">
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
            </div>
            <div className="flex-1 bg-gray-200 p-4">
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={100000}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
            </div>
          </div>
          <SearchBox />
        </div>

        {/* Middle Column */}
        <div className="flex flex-col w-1/3 p-4 space-y-4">
          {/* Large Team Box */}
          <div className="flex-grow bg-gray-200 p-4">
            <text>Team jykca</text>
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={199999}
            />
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={1}
            />
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={1}
            />
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={1}
            />
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={1}
            />
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={1}
            />
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={1}
            />
            <CurrentPlayerCard
              username="Squink"
              avatar_url="https://a.ppy.sh/2012453"
              bws_rank={1}
            />
          </div>
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
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
            </div>
            <div className="flex-1 bg-gray-200 p-4">
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
              <PlayerCard
                username="Squink"
                avatar_url="https://a.ppy.sh/2012453"
                bws_rank={1}
              />
            </div>
          </div>
          {/* Discord Captain Chat */}
          <div className="flex-grow bg-green-screen p-4"></div>
        </div>
      </div>

      <FooterModal />
    </main>
  );
}
