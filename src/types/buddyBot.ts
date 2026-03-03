export interface BuddyBotSettings {
  reminder_threshold_hours: number;
}

export interface BuddyBotRepository {
  name: string;
}

export interface BuddyBotTeam {
  name: string;
  discord_webhook_url: string;
  repositories: (string | BuddyBotRepository)[];
  buddies: Record<string, string>;
  team_leads?: string[];
  username_mappings: Record<string, string>;
}

export interface BuddyBotConfig {
  settings: BuddyBotSettings;
  teams: BuddyBotTeam[];
}

// API response shapes

export interface GetConfigResponse extends BuddyBotConfig {}

export interface GetSettingsResponse {
  settings: BuddyBotSettings;
}

export interface GetTeamsResponse {
  teams: BuddyBotTeam[];
}

export interface GetTeamResponse extends BuddyBotTeam {}

export interface GetRepositoriesResponse {
  repositories: string[];
}

export interface CreateRepositoryResponse {
  repositories: string[];
}

export interface DeleteRepositoryResponse {
  deleted: string;
}

export interface DeleteTeamResponse {
  deleted: string;
}

// API request shapes

export interface CreateTeamRequest {
  name: string;
  discord_webhook_url: string;
  repositories: string[];
  buddies: Record<string, string>;
  username_mappings: Record<string, string>;
}

export interface UpdateBuddiesRequest {
  buddies: Record<string, string>;
}

export interface UpdateUsernameMappingsRequest {
  username_mappings: Record<string, string>;
}
