console.log('setting up basic env')
var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 1, 1000);
console.log(scene.position)



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
var boxGeometry = new THREE.BoxGeometry(10,10,10);
var boxMaterial = new THREE.MeshLambertMaterial({color:0x000000})
var cube = new THREE.Mesh(boxGeometry,boxMaterial);
cube.rotation.x = 0.1
scene.add(cube);

camera.position.y = 2; //height
camera.position.x = 10;
camera.position.z = 10;
// camera.lookAt(THREE.Vector3(0,0,0));
camera.lookAt(scene.position);

var controls,clock;
clock = new THREE.Clock;
controls = new THREE.FirstPersonControls(camera);
controls.movementSpeed = 10;
controls.lookSpeed = 0.5;
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

