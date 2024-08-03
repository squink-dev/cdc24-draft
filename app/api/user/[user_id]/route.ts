import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { Mutex } from "async-mutex";
import { User } from "@/interfaces/interfaces";

const OSU_API_BASE_URL = "https://osu.ppy.sh/api/v2";
const CLIENT_ID = "31915";
const CLIENT_SECRET = "Lua9uaI2poCETzcvYlcMm85fZiMhsEc6nu47X9zD";

const filteredBadges = [
  "contrib",
  "nomination",
  "assessment",
  "moderation",
  "spotlight",
  "mapper",
  "mapping",
  "aspire",
  "monthly",
  "exemplary",
  "outstanding",
  "longstanding",
  "idol",
  "pending",
  "gmt",
  "global moderators",
  "trivium",
  "pickem",
  "fanart",
  "fan art",
  "skinning",
  "labour of love",
  "community choice",
  "community favourite",
];
const badgeRegex = new RegExp(filteredBadges.join("|"), "i");

const CACHE_FILE_PATH = path.join(process.cwd(), "cache.json");

const mutex = new Mutex();

let tokenCache = {
  accessToken: "",
  expiresAt: 0,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;
  let cache: { [key: string]: User } = {};

  await mutex.runExclusive(async () => {
    // Read the cache file
    try {
      const cacheData = await fs.readFile(CACHE_FILE_PATH, "utf-8");
      cache = JSON.parse(cacheData);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.error("Error reading cache file:", error);
        throw new Error("Internal server error");
      }
    }
  });

  // Check if data is in cache
  if (cache[user_id]) {
    return NextResponse.json(cache[user_id]);
  }

  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${OSU_API_BASE_URL}/users/${user_id}/osu`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Fetched user data for:" + user_id);

    const userData = response.data;

    const avatarUrl = `https://a.ppy.sh/${userData.id}`;
    const badgeCount = userData.badges.length;
    const ppRank = userData.statistics.global_rank;

    let tourneyBadges = 0;

    if (badgeCount > 0) {
      for (let badge of userData.badges) {
        let currentBadge = badge.description;
        if (!badgeRegex.test(currentBadge.toLowerCase())) {
          tourneyBadges++;
        }
      }
    }

    const bwsRank = Math.round(
      Math.pow(ppRank, Math.pow(0.9937, Math.pow(tourneyBadges, 2)))
    );

    const user = {
      user_id: userData.id,
      username: userData.username,
      pp_rank: ppRank,
      bws_rank: bwsRank,
      pp_country_rank: userData.statistics.country_rank,
      country: userData.country.code,
      level: userData.statistics.level.current,
      pp_raw: userData.statistics.pp,
      accuracy: userData.statistics.hit_accuracy,
      avatar_url: avatarUrl,
      badgeCount: badgeCount,
      tournamentBadgeCount: tourneyBadges,
    };

    await mutex.runExclusive(async () => {
      // Read the latest cache
      try {
        const cacheData = await fs.readFile(CACHE_FILE_PATH, "utf-8");
        cache = JSON.parse(cacheData);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          console.error("Error reading cache file:", error);
          throw new Error("Internal server error");
        }
      }

      // Store data in cache
      cache[user_id] = user;

      // Write the updated cache to file
      try {
        await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cache, null, 2));
      } catch (error) {
        console.error("Error writing cache file:", error);
        throw new Error("Internal server error");
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

async function getAccessToken() {
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the cached token is still valid
  if (tokenCache.accessToken && tokenCache.expiresAt > currentTime) {
    return tokenCache.accessToken;
  }

  console.log("FETCHING NEW TOKEN!!");

  const response = await axios.post("https://osu.ppy.sh/oauth/token", {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "public",
  });

  const { access_token, expires_in } = response.data;

  // Store the new token and its expiration time
  tokenCache.accessToken = access_token;
  tokenCache.expiresAt = currentTime + expires_in;

  return access_token;
}
