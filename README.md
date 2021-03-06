# ThrowingBlocks
##Motivation
This is an experiment to prove the concept of browser multiplayer 3D game. 3D rendering has always being considered as GPU intensive operation and not suitable for browsers. However, with the advent of WebGL and its wrapper library three.js, the possibility of producing multiplayer 3D games in browser has been greated increased. The greatest advantage of browser games is that it is easy to access from all operating systems and therefore very convenient to distribute.  
Also, I used socket.io as a form of websocket to broadcast user events through server. In order to minimize server load, a strategy of passing only necessary data, such as user position and bullet position, is implemented. It is extreme helpful to let user frontend do the heavy lifting and render the view based on light-weighted server data.
##Outcome
A demonstration gif is shown below, this game has been successfully tested with more than 20 people playing concurrently on a single server,  
![alt text](https://github.com/bosonX/ThrowingBlocks/raw/master/img/throw.gif "Throw")  
And, it is possible to create self animated 3D object in the game environment,  
![alt text](https://github.com/bosonX/ThrowingBlocks/raw/master/img/animate.gif "Animate")  

##Installation
To test the game on your own machine, clone the whole repo and run
```javascript
npm install
npm start
```
The game will be served on localhost:9999
