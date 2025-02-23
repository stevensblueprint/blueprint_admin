import { Member } from "../types/member";
import { Team } from "../types/team";
import { Organization } from "../types/organization";
import { Event } from "../types/events";

const members: Member[] = [
  {
    id: "1",
    name: "Alice Johnson",
    username: "alicej",
    email: "alice@example.com",
    isActive: true,
    dateJoined: "2023-04-15",
    roles: ["Developer", "Frontend"],
    team: {} as Team,
  },
  {
    id: "2",
    name: "Bob Smith",
    username: "bobsmith",
    email: "bob@example.com",
    isActive: true,
    dateJoined: "2022-08-22",
    roles: ["Project Manager"],
    team: {} as Team,
  },
  {
    id: "3",
    name: "Charlie Brown",
    username: "charlieb",
    email: "charlie@example.com",
    isActive: false,
    dateJoined: "2021-05-10",
    roles: ["Designer"],
    team: {} as Team,
  },
  {
    id: "4",
    name: "Diana White",
    username: "dianaw",
    email: "diana@example.com",
    isActive: true,
    dateJoined: "2020-10-12",
    roles: ["Team Lead", "Backend"],
    team: {} as Team,
  },
];

const organizations: Organization[] = [
  {
    id: "org1",
    name: "Tech Innovators",
    team: {} as Team,
    teamLeadId: members[3],
    projectManagerId: members[1],
  },
  {
    id: "org2",
    name: "Creative Solutions",
    team: {} as Team,
    teamLeadId: members[0],
    projectManagerId: members[1],
  },
];

const teams: Team[] = [
  {
    id: "team1",
    name: "UI Team",
    organization: organizations[1],
    teamLeadId: members[0],
    projectManagerId: members[1],
    designer: members[2],
  },
  {
    id: "team2",
    name: "Backend Team",
    organization: organizations[0],
    teamLeadId: members[3],
    projectManagerId: members[1],
    designer: members[2],
  },
];

// Assign teams to members now that teams are defined
members[0].team = teams[0];
members[1].team = teams[1];
members[2].team = teams[0];
members[3].team = teams[1];

// Assign teams to organizations now that teams are defined
organizations[0].team = teams[1];
organizations[1].team = teams[0];

const events: Event[] = [
  {
    name: "Tech Conference 2025",
    organizer: members[0], // Alice Johnson
    date: "03/15/2025",
    location: "San Francisco, CA",
    budget: 50000,
    eventType: "workshop",
  },
  {
    name: "Monthly Team Meeting",
    organizer: members[1], // Bob Smith
    date: "02/10/2025",
    location: "Virtual (Zoom)",
    budget: 0,
    eventType: "meeting",
  },
  {
    name: "Annual Hackathon",
    organizer: members[2], // Charlie Brown
    date: "07/20/2025",
    location: "New York City, NY",
    budget: 75000,
    eventType: "gmb",
  },
  {
    name: "Design Thinking Workshop",
    organizer: members[3], // Diana White
    date: "05/05/2025",
    location: "Seattle, WA",
    budget: 15000,
    eventType: "workshop",
  },
  {
    name: "Company Holiday Party",
    organizer: members[1], // Assuming Bob Smith (or HR team placeholder)
    date: "12/18/2025",
    location: "Los Angeles, CA",
    budget: 30000,
    eventType: "gmb",
  },
  {
    name: "Team Retrospective",
    organizer: members[1], // Bob Smith
    date: "02/05/2025",
    location: "Virtual (Zoom)",
    budget: 0,
    eventType: "meeting",
  },
  {
    name: "UI/UX Brainstorming Session",
    organizer: members[2], // Charlie Brown
    date: "02/08/2025",
    location: "San Francisco, CA",
    budget: 5000,
    eventType: "workshop",
  },
  {
    name: "Backend Architecture Discussion",
    organizer: members[3], // Diana White
    date: "02/14/2025",
    location: "Seattle, WA",
    budget: 2000,
    eventType: "workshop",
  },
  {
    name: "Product Demo Day",
    organizer: members[0], // Alice Johnson
    date: "02/18/2025",
    location: "New York City, NY",
    budget: 10000,
    eventType: "gmb",
  },
  {
    name: "Cross-Team Collaboration Workshop",
    organizer: members[1], // Bob Smith
    date: "02/19/2025",
    location: "Virtual (Zoom)",
    budget: 3000,
    eventType: "workshop",
  },
];

export { members, organizations, teams, events };
