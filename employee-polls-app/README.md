# Getting Started with Create React App Redux TypeScript

This project was bootstrapped with `npx create-react-app employee-polls-app --template redux-typescript`

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies required to run the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Employee Pools App

### Navbar

The name of the logged in user is visible on the page, as well as the user avatar and the logout button.
If the user is logged out, the app logo and the login button are visible.  
In case the avatar is not available, a default avatar is shown (the app logo).
The user can navigate to the leaderboard, and if logged out has to login.  
The user can navigate to the form that allows the user to create a new poll, and if logged out has to login.  

### Home `/`

The answered and unanswered polls are both available at the root.
The user can alternate between viewing answered and unanswered polls, or both.
The unanswered questions are shown by default.

### Leaderboard `/leaderboard`

Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.
The user has to be logged in to view the leaderboard, otherwise, the user is redirected to the login page.

### Add Poll `/add`

The application shows the text “Would You Rather” and has a form for creating two options.  
Upon submitting the form, a new poll is created and the user is taken to the home page.  
The new polling question appears in the correct category on the home page.  
The user has to be logged in to view the add poll, otherwise, the user is redirected to the login page.  

### Poll `/questions/:question_id`

When a poll is clicked on the home page, the following is shown:
- the text “Would You Rather”;
- the avatar of the user who posted the polling question; and the two options.

For answered polls, each of the two options contains the following:
- the text of the option;
- the number of people who voted for that option;
- the percentage of people who voted for that option.
- The option selected by the logged in user should be clearly marked.

When the user is logged in, the details of the poll are shown. If the user is logged out, he/she is asked to log in before before being able to access the poll.

The application asks the user to sign in and shows a 404 page if that poll does not exist. (In other words, if a user creates a poll and then the same or another user tries to access that poll by its url, the user should be asked to sign in and then be shown a 404 page. Please keep in mind that new polls will not be accessible at their url because of the way the backend is set up in this application.)

## Thanks and Credits:
Thank you to React, React Bootstrap, Redux, and React Router for making this project possible.

Thank you to the Udacity team for providing the _Data.ts initial code.

Thank you to the React React Nanodegree Program instructors, is special Tyler McGinnis and Michael Tsamis for the Redux course.

Special thank you to Maximilian Schwarzmüller, for the extra curricular and companion course which helped me understand React better: *React - The Complete Guide 2024 (incl. React Router & Redux)*. 

### Illustrations appreciation:
- [svg.io](https://svg.io) for the svg logo
- [openart](https://openart.ai) for the illustrations

### Lottie Anitmations appreciation:
- [Lottie for React](https://lottiereact.com/) for the lottie animations
- [Arvind Lakhani](https://lottiefiles.com/mz4egolegp9nzeiq) for the loading animation
- [Ilya Pavlov](https://lottiefiles.com/MiLushin) for the check list animation

### Disclaimer:
Most of the instructions about the path section, are taken from therubrice of the book-management-app project, which is part of the Udacity React Nanodegree Program. The instructions were adapted to the Employee Polls App project developed by me ([António Bastião - Curtes Malteser on github.com](https://github.com/CurtesMalteser)).