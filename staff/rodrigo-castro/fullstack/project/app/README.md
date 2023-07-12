# App

## Intro

This app is the final result of the work done during ISDI Coders Online Full-Stack Development Bootcamp

![](https://i.giphy.com/media/4JXNjv3MR21YXfsaqQ/giphy.webp)

## Functional description

### Use cases

- add post
- modify post
- delete post
- toggle like post
- toggle fav post

## Technical description

### Data model

User
- id (string)
- name (string)
- email (string)
- password (string)
- avatar (string)
- favs (string array, refers to Post id)

Post
- id (string)
- author (string, refers to User id)
- image (string)
- text (string)
- likes (strings array, refers to User id)

## Planning

### Stories

##### Add post

As a client, I want to write a text and choose an image from disk to create a post

##### UI

- add 'new post' button in the footer
- on click open a modal window
- in modal show a form with post and cancel buttons, and an input field for the text
- on click post creates a new post in database by means of create-post logic
- on click cancel closes the modal window

##### Data

- add post data model with fields: date, author, image, text, likedBy

#### List posts

- show all the posts from the different users with all the information including the number of likes
- in each post, show if it has already been liked by the current authenticated user

#### Update post

- discern my posts in post list (presentation) and show edit button on them
- open edit modal on edit button click
- call update post logic on edit form submit
- re render posts
- implement update post logic

#### Author name and avatar in post

- for every post show the information of the post and also the information of the author, like avatar and username

#### Like / unlike in post

- add heart button in each post
- call toggle like on heart button click
- re render posts
- implement toggle like logic

#### Save / unsave in posts

- TODO add save button in each post
- call save post on save button click
- re render posts
- implement save post logic