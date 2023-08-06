export interface MessageCount {
  count: string;
  timeBucket: Date | string;
  channelId: string;
}

export interface Channel {
  label: string;
  value: string;
  type: number;
  guild: string;
  guildId: string;
  parentId?: string | null;
  permissionOverwrites?: Array<string> | null;
  id: string;
  name: string;
  rawPosition: number;
  createdTimestamp: number;
  messages?: Array<any> | null;
  threads?: Array<any> | null;
  nsfw?: boolean;
  topic?: string | null;
  lastMessageId?: string | null;
  rateLimitPerUser?: number | null;
  rtcRegion?: any | null;
  bitrate?: number | null;
  userLimit?: number | null;
  videoQualityMode?: any | null;
}
