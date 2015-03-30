socket.on('messages',function(data){
	// alert(data.info);
	
});

//should have a name for each user
//tempory
var tempName = Math.floor(Math.random()*100000000000);
var current_color = '#' + (function co(lor){   return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])&& (lor.length == 6) ?  lor : co(lor); })('');
socket.emit('join',{
	name : tempName,
	color : current_color
});

var players = {};
//position
//lookAtVector
//health
//image

socket.on("playerPosition",function(data){
	// console.log(players)
	if(data.name && ! players.hasOwnProperty(data.name)){
		var boxGeometry = new THREE.CylinderGeometry(1,1,3,100);
		var boxMaterial = new THREE.MeshLambertMaterial({color : data.color});
		var cube = new THREE.Mesh(boxGeometry,boxMaterial);
		scene.add(cube);
		players[data.name] = cube;
	}
	else if(data.name){
		players[data.name].position.set(data.position.x,data.position.y,data.position.z);
	}
});

socket.on("playerLeft",function(name){
	console.log(name + " has left", players[name]);
	scene.remove(players[name]);
	delete players[name];
	console.log(players[name]);
});