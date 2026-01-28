import type { DailyNews, GuildShopItem, Player, Kingdom, KingdomRank, PlayerRank, SystemShopItem } from '@/types';
import {
  DailyNewsDataSchema,
  GuildShopDataSchema,
  HallOfFameDataSchema,
  KingdomsDataSchema,
  KingdomRankingsDataSchema,
  PlayerRankingsDataSchema,
  SystemShopDataSchema,
} from '@/schemas';
import { z } from 'zod';

async function fetchData<T>(fileName: string, schema: z.ZodSchema<T>): Promise<T> {
  try {
    const url = `/data/${fileName}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return schema.parse(data);
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    throw error;
  }
}

export async function loadDailyNewsData(): Promise<DailyNews[]> {
  return fetchData('dailyNewsData.json', DailyNewsDataSchema);
}

export async function loadGuildShopData(): Promise<GuildShopItem[]> {
  return fetchData('guildShopData.json', GuildShopDataSchema);
}

export async function loadHallOfFameData(): Promise<Player[]> {
  return fetchData('hallOfFameData.json', HallOfFameDataSchema);
}

export async function loadKingdomsData(): Promise<Kingdom[]> {
  return fetchData('kingdomsData.json', KingdomsDataSchema);
}

export async function loadKingdomRankingsData(): Promise<KingdomRank[]> {
  return fetchData('kingdomRankingsData.json', KingdomRankingsDataSchema);
}

export async function loadPlayerRankingsData(): Promise<PlayerRank[]> {
  return fetchData('playerRankingsData.json', PlayerRankingsDataSchema);
}

export async function loadSystemShopData(): Promise<SystemShopItem[]> {
  return fetchData('systemShopData.json', SystemShopDataSchema);
}
