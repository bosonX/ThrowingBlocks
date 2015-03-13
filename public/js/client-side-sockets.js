socket.on('messages',function(data){
	// alert(data.info);
	
});

//should have a name for each user
//tempory
var tempName = Math.floor(Math.random()*100000);
socket.emit('join',tempName);

var players = {};
//position
//lookAtVector
//health
//image

socket.on("playerPosition",function(data){
	// console.log(players)
	if(data.name && ! players.hasOwnProperty(data.name)){
		var current_color = '#' + (function co(lor){   return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])&& (lor.length == 6) ?  lor : co(lor); })('');
		var boxGeometry = new THREE.BoxGeometry(2,5,2);
		var boxMaterial = new THREE.MeshLambertMaterial({color : current_color});
		var cube = new THREE.Mesh(boxGeometry,boxMaterial);
		//cube.position = new THREE.Vector3(data.position.x,data.position.y,data.position.z);
		console.log(cube.position)
		scene.add(cube);
		players[data.name] = cube;
	}
	else if(data.name){
		players[data.name].position.set(data.position.x,data.position.y,data.position.z);
	}
});