# App -Nombre de la app-

## Intro

blah blah

![](https://media2.giphy.com/media/ZciYhNqc9iFtC0yUTS/giphy.gif?cid=ecf05e47yr1ptklqda1kref6aw0v0qtph4nomcfmno2nz94e&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional description

### Use cases

- create project
- add picture to new project
- record audio in different channels
- modify relative volumen from the different channels
- post project
- reproduce project audio mixing all the channels
- see other users' projects
- reproduce other users' projects
- see details of other users' projects
- colaborate with other users' projects
- like project
- see other users' profile

### Future cases to implement

- save project
- fork project
- follow a user

## Technical description

### Data model

User

- id (oid)
- username (string)
- email (string)
- password (string)
- avatar (string)

Post

- id (string)
- author (oid, refers to User id)
- image (string)
- recorded audio (media audio)
- cathegory (string)
- required instruments (string)
- likes (oid array, refers to User id)

### Test Coverage

![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077)

## Planning

https://www.notion.so/Final-Project-ISDI-3355f5c9f8d7480493c90527e86468aa?pvs=4

### Epics & Stories

#### Access control

- Me as a user, I want to register my credentials and access with them to the App

##### Tasks

- build React app
- style with Tailwind
- implement register functionality
- implement login functionality
- implement home welcome functionality

#### Create a project and refresh projects

- Me as a user, I want to create a project with: description, cathegory, picture, audio files
- Me as user, I want to see the list of created projects

##### Tasks

- implement plus button at the top bar
- implement page for creating a project (inputs: image, description, cathegory, instruments required)
- implement functionality that, once the project is created, allows you to record audio
- implement createProject logic to persist the info (image, text) in database
- implement retrieveProjects logic to get all the posts from database
- implement a panel for listing projects in home

#### Edit my projects and refresh list

- Me as user, I want to be able to edit my projects mix and save it
- Me as user, I want to see the list of projects updated with the changes applied in any of my projects

##### Tasks

- add edit button in all the projects of user profile
- implement retrieveProject logic to get the information of a post
- implement updateProject logic to save the information of a project in db
- add a call to refresh the projects list after saving the changes in the edited project

#### Delete a post and refresh list

- Me as user, I want to have the delete option (as a button) in any project that I have created, open a Delete dialog with it, and proceed to delete the project if accepted (or cancel it otherwise)
- Me as user, I want to see the list of projects updated with the changes applied in any of my projects

##### Tasks

- add delete button in all the projects that belong to the user that is connected (in the session)
- implement deleteProject logic to remove a project from database
- implement the modal window for asking the user if she/he really wants to delete the project (two buttons: delete, cancel)
- add a call to refresh the projects list after deleting the project
