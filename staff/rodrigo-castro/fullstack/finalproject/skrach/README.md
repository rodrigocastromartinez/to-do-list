# APP SKRACH

## INTRO

This is an app that allows users to sign up, log in, and start recording music just like they would in a professional studio. It offers the convenience of using independent channels to record multiple tracks and then blend them seamlessly.

Mixing the tracks involves adjusting their relative volumes and, if necessary, panning them to the right or left. 

The app supports collaborative track recording, allowing multiple users (such as band members) to contribute to the same project. Each member can record their instrument and see the recordings of others reflected in the project. 

The aim is to streamline the recording process for what is commonly known as 'demos'—the initial approach to bringing a musical project to life, rather than focusing on studio-quality recordings.

---
---

![](https://i.gifer.com/origin/3a/3a007c6442ca0db127e5a4dd7fe7b569.gif)

---
---

## FUNCTIONAL DESCRIPTION

### USE CASES

- Create project
- Modify project
- Record track
- Delete track
- Listen project
- Set up track relative volumes
- Set up tracks panning
- Equalize track
- Save project
- Export project as mp3
- Delete project

## TECHNICAL DESCRIPTION

### DATA MODEL

User
- id (Object Id)
- name (string)
- email (string)
- password (string)
- avatar (string)
- projects (array ids refering Project ids)

Track
- id
- audio file
- volume
- pan

Project
- id (string)
- name (string)
- authors ([Object Id], refers to User Ids)
- tracks ([track])


---
---

## PLANNING

### TASKS

#### Dashboard

https://www.notion.so/SKRACH-Project-3355f5c9f8d7480493c90527e86468aa

#### UI

- add 'new project' button in the footer of the home page
- on click open modal window
- in modal show a form with create and cancel buttons, and the following input fields: project name, participants (email)
- on click create, it creates a new project in database by means of create-project logic
- on click cancel closes the modal window

#### Data

- add project data model with fields: id, name, authors, tracks

#### List projects

- show all the projects in which the user is participating, including name ¿and option to play?
- order by... ¿last modified?

#### Open project

- by clicking on a project, open it in a project page
- by opening a project, show name and the already recorded tracks and the empty channels available to recording

### STORIES

#### Sign up

- Register new user providing name, email and password

#### Create project

- Create a new project, select participants by email (they must be previously registered in the db)

#### Project opened

- Record on an empty channel
- Delete a recorded track
- Set relative volume of the tracks
- Play the mix
- Save changes / ¿or auto-save?
- Change project name
- Add or remove project participants
- Export as mp3/wav
