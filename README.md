# **Safe Space**

### Find your safe space or ~~die trying~~ try again. 

Safe Space is a modern take on the traditional Bullet hell. You play as the excitable young Dot, just trying to get home. Unfortunately Dot is trapped in a tower of shifting rows and columns. Does dot have what it takes to get home in one piece? Well thats entirely up to you! 

### Planned Tech

Vanilla Js, HTML, and CSS : Cavnas Project.

![Imgur](https://i.imgur.com/pOwvS0P.png)

### **MVP**
* Create a canvas interface
* Render home screen with three buttons, Play, instructions, and options.
* Render start screen with some time to get used to the controls before game fully starts 
* Display timer counting down at the top. 
* Display yellow outline where columns will spawn when time is up display them as red and include a hitbox that ~~kills~~ resets Dot
* Start Phase one, round one: 3 columns at horizontal or veritcal coordinates successfuly dodging telegraphs passes the round
* Render round two and three, increasing column amounts each time
* Render Phase two, round one: 3 columns at horizontal **and** vertical positions. rounds much faster increases with difficulty per round
* Render Phase three: follow procedure as before but add safe and death zones for added difficulty. this phase has nine rounds
* Win screen on surviving Phase three

### **Stretch Goals**
* Circular or diagnonal obstacles
* Safe zones are created if the columns/rows create green if mixed
* Endless mode
* Collapsing floors 
* Dot gets a dash!

### Potential Roadblocks 
* Issues with clipping and refresh timers - potentially use a grid system for movement
* Dot is too large for complex floor patterns - ask Dot how they feel about getting shrunk?
* Gameplay loop is not rewarding, or fun - give Dot a gun, maybe a sword? 
