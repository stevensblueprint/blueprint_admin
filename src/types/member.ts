import { Team } from "./team";

export interface Member {
  id: string;
  name: string;
  username: string;
  email: string;
  isActive: boolean;
  dateJoined: string;
  roles: string[];
  team: Team;
}
