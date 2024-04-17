# Blueprint Admin
## Overview
React Web Application that will serve as an admin dashboard to manage members, and permission of Stevens Blueprint. The main purpose of the web application is to provide a tool for the Blueprint eboard to manage Blueprint members and display statistics about them. Stevens Blueprint uses Authelia as SSO, therefore to log in members should be signed in. 
## Features
The Blueprint Admin will provide means for Blueprint members to do the following:

### Member management
- Register new members
- Disable members
- Enable members
- Remove members
- View statistics on members such as:
    - How many members have joined in the past week?
    - Majors of Blueprint Members
    - Class of Blueprint Members

### CMS for our Blog and Website
- Add new blogs
- Edit blogs

### Applications
- Manage application for project Teams
- View statistics on previous application periods

### Manage project teams
- Be able to see information of members of a project team
- Take attendance during standups
- Connect with github to view member contributions
- Remove members from a team
- Add new members to a team

### Manage Blueprint Budget
- Be able to create events and assign a budget to them
- Display a graph of how much budget is left throught the semester

# How to contribute
Download the repo
```
git clone https://github.com/stevensblueprint/blueprint_admin.git
```
Create a new branch
```
git checkout -b feature/name_of_feature
```
Add your changes
```
git add {modified_file}
```
Commit your changes
```
git commit -m "Commit message"
```
Before pushing your changes you have to run the linter. (The linter will
make sure your code if following standard code styling)
```
npm run lint
```
Push your changes
```
git push --set-upstream origin {branch_name}
```
In the repo, submit a pr.

## How to run the application
To run the application
1. Install all the dependencies
```
npm install
```
2. Run the application
```
npm run start
```
