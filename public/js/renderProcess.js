function render(){
	requestAnimationFrame( render );
	controls.update( clock.getDelta() );
	renderer.render( scene, camera );

	//lookat vector
	var lookAtVector = new THREE.Vector3(0,0,-1);
	lookAtVector.applyQuaternion( camera.quaternion );

	socket.emit("positionChange", {position:camera.position, lookAtVector:lookAtVector});
}
render()