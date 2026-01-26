import type { DailyNews, GuildShopItem, Player, Kingdom, KingdomRank, PlayerRank, SystemShopItem } from '@/types';

async function fetchData<T>(fileName: string): Promise<T> {
  try {
    const url = `/data/${fileName}`;
    console.log(`Fetching data from: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully loaded ${fileName}, ${Array.isArray(data) ? data.length : 'object'} items`);

    return data as T;
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    throw error;
  }
}

export async function loadDailyNewsData(): Promise<DailyNews[]> {
  return fetchData<DailyNews[]>('dailyNewsData.json');
}

export async function loadGuildShopData(): Promise<GuildShopItem[]> {
  return fetchData<GuildShopItem[]>('guildShopData.json');
}

export async function loadHallOfFameData(): Promise<Player[]> {
  return fetchData<Player[]>('hallOfFameData.json');
}

export async function loadKingdomsData(): Promise<Kingdom[]> {
  return fetchData<Kingdom[]>('kingdomsData.json');
}

export async function loadKingdomRankingsData(): Promise<KingdomRank[]> {
  return fetchData<KingdomRank[]>('kingdomRankingsData.json');
}

export async function loadPlayerRankingsData(): Promise<PlayerRank[]> {
  return fetchData<PlayerRank[]>('playerRankingsData.json');
}

export async function loadSystemShopData(): Promise<SystemShopItem[]> {
  return fetchData<SystemShopItem[]>('systemShopData.json');
}
