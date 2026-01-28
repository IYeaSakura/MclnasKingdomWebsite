import { z } from 'zod';

const FactionSchema = z.enum(['anti-law', 'pro-law', 'neutral', 'other']);
const KingdomLevelSchema = z.enum(['private', 'free-city', 'weak', 'small', 'large', 'strong', 'kingdom', 'holy']);
const RegionSchema = z.enum(['yangzhou', 'jiangzhou', 'qingzhou', 'yizhou']);

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string().optional(),
});

export const PricePointSchema = z.object({
  date: z.string(),
  buyPrice: z.number().optional(),
  sellPrice: z.number().optional(),
});

export const SystemShopItemSchema = ItemSchema.extend({
  buyPrice: z.number(),
  sellPrice: z.number(),
  type: z.enum(['buy_only', 'sell_only', 'both']),
  priceTrend: z.array(PricePointSchema),
});

export const GuildShopItemSchema = ItemSchema.extend({
  buyDisplayPrice: z.number(),
  buyAfterTaxPrice: z.number(),
  sellPrice: z.number(),
  type: z.enum(['buy_only', 'sell_only', 'both']),
  priceTrend: z.array(PricePointSchema),
  notes: z.string().optional(),
});

export const PlayerSchema = ItemSchema.extend({
  faction: FactionSchema,
  shortComment: z.string(),
  detailedExperience: z.string(),
});

export const KingdomSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string().optional(),
  faction: FactionSchema,
  level: KingdomLevelSchema,
  region: RegionSchema,
  shortComment: z.string(),
  detailedInfo: z.string(),
});

export const DailyNewsSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  title: z.string(),
  content: z.string(),
  image: z.string(),
});

export const KingdomRankSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: RegionSchema,
  level: KingdomLevelSchema,
  faction: z.enum(['anti-law', 'pro-law', 'neutral', 'unknown']),
  reputation: z.number(),
  lastUpdateTime: z.string(),
  notes: z.string().optional(),
});

export const PlayerRankSchema = z.object({
  id: z.string(),
  name: z.string(),
  kingdom: z.string(),
  region: RegionSchema,
  faction: z.enum(['anti-law', 'pro-law', 'neutral', 'unknown']),
  gold: z.number(),
  equipmentLevel: z.string(),
  lastUpdateTime: z.string(),
  notes: z.string().optional(),
});

export const SystemShopDataSchema = z.array(SystemShopItemSchema);
export const GuildShopDataSchema = z.array(GuildShopItemSchema);
export const HallOfFameDataSchema = z.array(PlayerSchema);
export const KingdomsDataSchema = z.array(KingdomSchema);
export const DailyNewsDataSchema = z.array(DailyNewsSchema);
export const KingdomRankingsDataSchema = z.array(KingdomRankSchema);
export const PlayerRankingsDataSchema = z.array(PlayerRankSchema);
