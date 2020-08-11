# Website Workflow

## Goals
1. Fix development bottlenecks: when feature A and feature B are in review and feature B needs to go live, but feature A hasn’t been approved yet
2. Fix accidental deployments: when feature A and feature B are in review and feature B needs to go live and we are unaware that we are also deploying feature A
3. Prevent accidentally overwriting changes
4. All new changes get reflected on live
5. Make the sharing experience with clients better
    * More consistency with which links we share with clients
    * No self-signed certificate browser issues
    * Have up-to-date website content when available

## Environments
* **Local:** code is created on a developer’s computer
* **Multidev:** each new feature is on a multidev. If sharing the multidev with a client, we will aim for the multidev environment to have the current live database and files.
* **Dev/Integration/Hotfix:** quick fixes, view compiled website and internal team testing
* **Test:** used for external review with live data
* **Live:** code changes are deployed; database and file changes are made manually

## Workflow Diagram
[See diagram (private)](https://drive.google.com/file/d/1J1s1l1W2FkwvBxpwPKJbHlX8C-Z51Hgo/view)

## Workflow Considerations
[See workflow considerations (private)](https://docs.google.com/spreadsheets/d/1re-2sJKqzBTwzXAgNnww9pzS0a2O2DqiJVuBqluvhbU/edit#gid=0)
