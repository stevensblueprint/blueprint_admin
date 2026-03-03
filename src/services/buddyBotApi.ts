import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
import type {
  BuddyBotConfig,
  BuddyBotSettings,
  BuddyBotTeam,
  CreateTeamRequest,
  CreateTeamResponse,
  UpdateBuddiesRequest,
  UpdateUsernameMappingsRequest,
  GetConfigResponse,
  GetSettingsResponse,
  GetTeamsResponse,
  GetTeamResponse,
  GetRepositoriesResponse,
  CreateRepositoryResponse,
  DeleteRepositoryResponse,
  DeleteTeamResponse,
} from "@/types/buddyBot";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_CODING_BUDDY_API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Full config

export const getConfig = async (): Promise<BuddyBotConfig> => {
  const { data } = await apiClient.get<GetConfigResponse>("/config");
  return data;
};

export const putConfig = async (
  config: BuddyBotConfig,
): Promise<BuddyBotConfig> => {
  const { data } = await apiClient.put<GetConfigResponse>("/config", config);
  return data;
};

// Settings

export const getSettings = async (): Promise<BuddyBotSettings> => {
  const { data } = await apiClient.get<GetSettingsResponse>("/config/settings");
  return data.settings;
};

export const putSettings = async (
  settings: BuddyBotSettings,
): Promise<BuddyBotSettings> => {
  const { data } = await apiClient.put<GetSettingsResponse>(
    "/config/settings",
    settings,
  );
  return data.settings;
};

// Teams

export const getTeams = async (): Promise<BuddyBotTeam[]> => {
  const { data } = await apiClient.get<GetTeamsResponse>("/config/teams");
  return data.teams;
};

export const createTeam = async (
  team: CreateTeamRequest,
): Promise<CreateTeamResponse> => {
  const { data } = await apiClient.post<CreateTeamResponse>(
    "/config/teams",
    team,
  );
  return data;
};

export const getTeam = async (teamName: string): Promise<BuddyBotTeam> => {
  const { data } = await apiClient.get<GetTeamResponse>(
    `/config/teams/${teamName}`,
  );
  return data;
};

export const putTeam = async (
  teamName: string,
  team: BuddyBotTeam,
): Promise<BuddyBotTeam> => {
  const { data } = await apiClient.put<GetTeamResponse>(
    `/config/teams/${teamName}`,
    team,
  );
  return data;
};

export const deleteTeam = async (
  teamName: string,
): Promise<DeleteTeamResponse> => {
  const { data } = await apiClient.delete<DeleteTeamResponse>(
    `/config/teams/${teamName}`,
  );
  return data;
};

// Repositories

export const getRepositories = async (teamName: string): Promise<string[]> => {
  const { data } = await apiClient.get<GetRepositoriesResponse>(
    `/config/teams/${teamName}/repositories`,
  );
  return data.repositories;
};

export const addRepository = async (
  teamName: string,
  repoName: string,
): Promise<string[]> => {
  const { data } = await apiClient.post<CreateRepositoryResponse>(
    `/config/teams/${teamName}/repositories`,
    { name: repoName },
  );
  return data.repositories;
};

export const deleteRepository = async (
  teamName: string,
  repoName: string,
): Promise<DeleteRepositoryResponse> => {
  const { data } = await apiClient.delete<DeleteRepositoryResponse>(
    `/config/teams/${teamName}/repositories/${encodeURIComponent(repoName)}`,
  );
  return data;
};

// Buddies

export const putBuddies = async (
  teamName: string,
  buddies: Record<string, string>,
): Promise<BuddyBotTeam> => {
  const body: UpdateBuddiesRequest = { buddies };
  const { data } = await apiClient.put<GetTeamResponse>(
    `/config/teams/${teamName}/buddies`,
    body,
  );
  return data;
};

// Username mappings

export const putUsernameMappings = async (
  teamName: string,
  username_mappings: Record<string, string>,
): Promise<BuddyBotTeam> => {
  const body: UpdateUsernameMappingsRequest = { username_mappings };
  const { data } = await apiClient.put<GetTeamResponse>(
    `/config/teams/${teamName}/username-mappings`,
    body,
  );
  return data;
};
