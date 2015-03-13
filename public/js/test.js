 var camera, scene, renderer;
   function setup() {
     document.body.style.backgroundColor = '#d7f0f7';
     setupThreeJS();
     setupWorld();
     requestAnimationFrame(function animate() {
       renderer.render(scene, camera);
       requestAnimationFrame(animate);
}); }
   function setupThreeJS() {
     scene = new THREE.Scene();
     camera = new THREE.PerspectiveCamera(75, window.innerWidth /
     window.innerHeight, 1, 10000);
     camera.position.y = 100;
     camera.position.z = 100;
     camera.rotation.x = -45 * Math.PI / 180;
     renderer = new THREE.CanvasRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight);
     document.body.appendChild(renderer.domElement);
}
   function setupWorld() {
     // Floor
     var geo = new THREE.PlaneBufferGeometry(2000, 2000, 20, 20);
     var mat = new THREE.MeshBasicMaterial({color: 0x9db3b5, overdraw:
     true});
     var floor = new THREE.Mesh(geo, mat);
     floor.rotation.x = -90 * Math.PI / 180;
          scene.add(floor);
          // Original building
          var geometry = new THREE.BoxGeometry(1, 1, 1);
          geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5,
          0));
          var material = new THREE.MeshDepthMaterial({overdraw: true});
      }
//         // Run it!
        setup();

// camera.position.y = 400;
// camera.position.z = 400;
// camera.rotation.x = -45 * Math.PI / 180;

// var geo = new THREE.PlaneGeometry(2000, 2000, 20, 20);
// var mat = new THREE.MeshBasicMaterial({color: 0x9db3b5, overdraw:
// 	true});
// var mesh = new THREE.Mesh(geo, mat);
// mesh.rotation.x = -90 * Math.PI / 180;
// scene.add(mesh);

var controls,clock;
clock = new THREE.Clock;
controls = new THREE.FirstPersonControls(camera);
controls.movementSpeed = 100;
controls.lookSpeed = 0.1;