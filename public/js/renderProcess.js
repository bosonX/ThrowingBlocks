function render(){
	requestAnimationFrame( render );
	var delta = clock.getDelta();
	// console.log(delta)

	controls.update(delta);
	// camera.position.y = 1;
	// console.log(bulletObject.position)
	cube2.rotation.y += 0.01
	cube3.rotation.x += 0.01
	cube3.rotation.z += 0.01
	TWEEN.update();
	renderer.render( scene, camera );

	//lookat vector
	var lookAtVector = new THREE.Vector3(0,0,-1);
	lookAtVector.applyQuaternion( camera.quaternion );

	socket.emit("positionChange", {position:camera.position, lookAtVector:lookAtVector});
}
render()