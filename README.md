# Experential Engineer Technical Project
This is the technical project for the Experential Engineer rol at Bluewater Technologies built by Greg Schoberth. 

### Notes
For best experience this was designed for lap / desktop screens, although it (should) also work on mobile and tablet when used in portrait mode.

### Hosting
The app is deployed via Github Pages here: https://gschoberth.github.io/bluewater-technical/

### Project Setup
> npm install

### Compile and Hot-Reload for Development
> npm run dev

### Compile and Minify for Production
> npm run build

## Technology Used For Build / Notes
Vue 3 (including Pinia): Web app portion, displaying visuals, store and gameplay logic. 
Important folders within codebase:

/pubilc (used assets)
/src/stores (gameplay logic and interaction timeout)
/src/views (visuals components)
/src/components (additional visuals components)

Rive: Animations including; title screen, kick / goal animations (includes outcome text) [Rive Website](https://rive.app/)

##### Rive Notes: This is a vector animation editor that I've recently been looking into for both personal and professional use. Because of it's ability
to be implemented in the following; Unity, Unreal, JS & Web Frameworks. It allows for an included state machine for animations to be created, trigger from an external source (ex. Vue), or send trigger signals to the external source too. Also has a bone system similar to 3d modeling programs too.

##### Reaction Time Calculation
The current build of the project uses a simple cubic bezier curve for the over / under value. The y position at the users reaction time (x-axis) is used as the minimum value to exceed. The users value used for comparison is a simple randomized value within the same range (0 < x <=1). 

## Additional Features (Implemented)

#### Interaction Timeout
A tracker was added to store the time of the last interaction with the app. Currently any interaction (click) with the screen will reset the timeout. Currently 
set for 20 seconds before resetting the app and returning to the intro screen.

#### Decoupled Visuals and Gameplay Logic
The logic for the underlying logic of the app is implemented in a Pinia store, allowing for expandability or reuse by creating new gamemplay visuals. This can be achieved 
through minimal modification of the game view component and simply passing in a new file path (rive file atm) for goal visuals. 
(Ex: Football field goal kick, hockey penalty shot. Baseball pitch [Baseball is a bit of a different one compared to the other three, might work best with the suggested 3 shot gameplay suggested below as a 'Strike Out' game).  

In place of the Rive animations, a component could be developed quickly using existing logic to use a different visuals format; pre-recorded / rendered videos instead for all gameplay interactions (idle, kick animations, goal outcomes). 

## Additional Features (Not Implemented, Suggested)

#### Randomized Position Of Action Button
Randomizing the position of the action button within a specific region. Setting the buttons position randomly might lessen the chance of someone hitting the button almost immediately as is currently the case
with the default centered position.

#### BA / Technician Hidden Panel
Typically for interactions such as this, I would recommend implementing a hidden button on the screen itself. Typically double tapping a corner furthest from where a user interaction might occur, 
or on the brand logo if it's included. For this interaction, I would include; 

Examples: 
- The ability to adjust the range for the reaction timer (both min / max of range)
- Adjustable Timeout length
- Leaderboard reset (see below suggested feature)

#### Simplified Instructions For User On Start
For this, I thought a simple graphical (2-3 steps?) representation of what the user has to do. Or a simple pop up of text that says something like "Hit the 'Kick' button as soon it appears to score." This would disappear after a few seconds, or 
a continue button could be included.

#### Get Ready Popup 
This would simply be text appears on the screen after hitting the start, and before the GO! text appears. Simply letting the user know that the interactive portion has started.

#### Physical Input
Depending on what the planned interaction is for this app, a thought i had that might play well with the randomized input too, was the use of physical buttons that light up internally. These would need to be something
like arcade buttons to stand up to the possible abuse, possibly larger buttons that could simply be slapped as that's probably what most people would do. Having them light up when the action becomes available. For the randomzied setup, 
I would probably suggest possibly four buttons, either in a row, or in a diamond layout similar to game controllers. With how the app is built, this setup could probably be run on a raspberry pi to both handle, inputs and display.

Button picture for reference.
 [Arcade button](https://i5.walmartimages.com/seo/Hemoton-Arcade-Game-Button-Prop-Game-Machine-Button-Push-Button-for-Competition-Game_7acec4c9-67e1-4c3d-ab05-f9e82bf58603.92cb236b06d227f7d71e437cb0cb6d5f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF)

#### Responsive Layout
For a more finalized product I would implement a more responsive design so that the app could run on the targeted devices for the planned event fullscreen.

#### Consistent Visual Styling / Branding Theme

#### 3 Shots Style Game
The idea for this, would be that the user gets three shots all with different reaction times. I would probably shorten the reaction time window down a bit to keep the length of each user's time with it reasonably quick. With either a 
simplified score display at the end, like the the stars Angry Birds has at the end of levels (I think?). And / or showing an averaged reaction time for the three shots.

#### User Input Form 
Depending on where the interaction was being used, if it was part of a booth for a conference or event where emails could be gathered for marketing purposes. This could be stored in a simple database behind the scenes to be extracted after the event is done.
Pouch DB for example. Useful for when no local server will be used. [Pouch DB](https://pouchdb.com/)

#### Simplified Leader Board
This would probably work best with the 3 Shots style gameplay. Having display names as either first name / last initial if there's a user info form, or the three initials that arcade games used to use. (or two, this might cut down on anyone trying to display anything inapproriate)  

