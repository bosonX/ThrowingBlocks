console.log('setting up basic env')
var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 1, 1000);
// console.log(scene.position)



var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xEEEEEE);
document.body.appendChild( renderer.domElement );

// create the ground plane
var planeGeometry = new THREE.PlaneBufferGeometry(100, 100);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

var axes = new THREE.AxisHelper(10);
scene.add(axes);

//make a box
var boxGeometry = new THREE.BoxGeometry(1,15,1);
var boxMaterial = new THREE.MeshLambertMaterial({color:0x3F7CAC})
var cube = new THREE.Mesh(boxGeometry,boxMaterial);
cube.position.y = 5;
scene.add(cube);

// var boxGeometry = new THREE.BoxGeometry(1,10,1);
// var boxMaterial = new THREE.MeshLambertMaterial({color:0x3F7CAC})
// var cube = new THREE.Mesh(boxGeometry,boxMaterial);
// cube.position.y = 5;
// scene.add(cube);

var boxGeometry = new THREE.BoxGeometry(1,1,7);
var boxMaterial = new THREE.MeshLambertMaterial({color:0x95AFBA})
var cube2 = new THREE.Mesh(boxGeometry,boxMaterial);
cube2.position.y = 8;
scene.add(cube2);

var boxGeometry = new THREE.BoxGeometry(7,1,1);
var boxMaterial = new THREE.MeshLambertMaterial({color:0xD5E1A3})
var cube3 = new THREE.Mesh(boxGeometry,boxMaterial);
cube3.position.y = 8;
scene.add(cube3);

// var ballGeo = new THREE.SphereGeometry(10,20,20);
// var ballMat = new THREE.MeshLambertMaterial({color:0xD5E1A3, wireframe: true});
// var ball = new THREE.Mesh(ballGeo,ballMat)
// ball.position.y = 10;
// scene.add(ball);

camera.position.y = 2; //height
camera.position.x = 10;
camera.position.z = 10;
// camera.lookAt(THREE.Vector3(0,0,0));
// camera.lookAt(scene.position);


var controls,clock;
clock = new THREE.Clock;
controls = new THREE.FirstPersonControls(camera);
controls.movementSpeed = 10;
controls.lookSpeed = 0.1;
controls.lookVertical = false;
// controls.heightMax = 0.01;
// controls.heightMin = 0;
controls.noFly = true;

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
directionalLight.position.set( 20, 50, 20 );
scene.add( directionalLight );

 // var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
 //    directionalLight.position.set( -200, 200, -400 );
 //    scene.add( directionalLight );

// function renderPlayers(){
// 	Object.keys(players);

// 	scene.add();
// }


function shootingBullet(startPos,endPos,color){
	var bulletObject = new THREE.Mesh (
	    new THREE.BoxGeometry (1,1,1),
	    new THREE.MeshBasicMaterial ( { color: color } )
	);

	bulletObject.position.set(startPos.x,1,startPos.z);
	scene.add(bulletObject);

	bulletTween = new TWEEN.Tween(startPos) // from
	.to( endPos, // to
	1000 // duration
	).easing( TWEEN.Easing.Linear.None ).onUpdate( function() {
	    bulletObject.position.set(this.x,1,this.z)
	    bulletObject.rotation.x += 0.1
	    bulletObject.rotation.y += 0.1
	    bulletObject.rotation.z += 0.1
	})
	.onComplete( function () {
	    // Do something with the enemy here. E.g. removing health
	    scene.remove(bulletObject);
	} )
	.start(); // start the tween directly
}

socket.on('playerShoot',function(data){
	//camera position
	//end position
	console.log(data)
	shootingBullet(data.startPos,data.endPos,data.color);
});

