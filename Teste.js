import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {ConvexGeometry} from '../build/jsm/geometries/ConvexGeometry.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer,
		initCamera,
        degreesToRadians,
        onWindowResize,
        initDefaultBasicLight,
        createGroundPlane} from "../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var scene2 = new THREE.Scene();
var renderer = initRenderer();    // View function in util/utils
renderer.setClearColor("rgb(0,206,250)");
renderer.shadowMap.enabled = true;
//initDefaultBasicLight(scene);
initDefaultBasicLight(scene2);
var circuitoVisao = false;
var axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Criação da Luz
//Luz do Sol (luz direcional)
var sol = new THREE.DirectionalLight('rgb(255,255,255)',0.25);
sol.position.set(0,150000,-250000);
sol.castShadow = true;
sol.shadow.mapSize.width = 4096;
sol.shadow.mapSize.height = 4096;
sol.shadow.camera.near = 1;
sol.shadow.camera.far = 1421681;
sol.shadow.camera.left = -1000;
sol.shadow.camera.right = 1000;
sol.shadow.camera.top = 1000;
sol.shadow.camera.bottom = -1000;
sol.name = "Luz do Sol";

scene.add(sol);

var sol2 = new THREE.DirectionalLight('rgb(255,255,255)',0.25);
sol2.position.set(0,150000,-250000);
var targetsol2 = new THREE.Object3D();
targetsol2.position.set(12500,0,-24900);
scene.add(targetsol2)
sol2.target = targetsol2;
scene.add(sol2.target);
sol2.castShadow = true;
sol2.shadow.mapSize.width = 4096;
sol2.shadow.mapSize.height = 4096;
sol2.shadow.camera.near = 1;
sol2.shadow.camera.far = 321681;
sol2.shadow.camera.left = -13500;
sol2.shadow.camera.right = 12000;
sol2.shadow.camera.top = 14000;
sol2.shadow.camera.bottom = -12000;
sol2.name = "Luz do Sol";
scene.add(sol2);

const spotHelper2 = new THREE.DirectionalLightHelper(sol2, 0xFF8C00);
scene.add(spotHelper2);
const shadowHelper2 = new THREE.CameraHelper(sol2.shadow.camera);
scene.add(shadowHelper2);

var sol3 = new THREE.DirectionalLight('rgb(255,255,255)',0.25);
sol3.position.set(0,150000,-250000);
var targetsol3 = new THREE.Object3D();
targetsol3.position.set(-12500,0,-24900);
scene.add(targetsol3)
sol3.target = targetsol3;
scene.add(sol3.target);
sol3.castShadow = true;
sol3.shadow.mapSize.width = 4096;
sol3.shadow.mapSize.height = 4096;
sol3.shadow.camera.near = 1;
sol3.shadow.camera.far = 321681;
sol3.shadow.camera.left = -13500;
sol3.shadow.camera.right = 12000;
sol3.shadow.camera.top = 14000;
sol3.shadow.camera.bottom = -12000;
sol3.name = "Luz do Sol";
scene.add(sol3);


//Luz ambiente
var light = new THREE.HemisphereLight( 'rgb(255,255,255)', 'rgb(50,50,50)', 0.5 );
scene.add( light );

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Criação do Plano, pista de vôo,arvores e montanhas
//Cria Plano
var groundPlane = createGroundPlane(50000, 50000, 1000, 1000,'rgb(50,205,50)'); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
  groundPlane.receiveShadow = true;
  groundPlane.position.set(0,0,-24000);
scene.add(groundPlane);

var geometry = new THREE.BoxGeometry(250,5,15000);
var material = new THREE.MeshPhongMaterial( {color:'rgb(50,50,50)'} );
//Cria Pista
var pista = new THREE.Mesh(geometry, material);
pista.position.set(0,2.5, -15000/2 + 150);
pista.receiveShadow = true;
scene.add(pista);
//Cria detalhes da Pista
for(var i = 0; 14500 - i > 0; i = i + 500){
	var traçoGeometry = new THREE.BoxGeometry(10, 2, 100);
	var traçoMaterial = new THREE.MeshPhongMaterial( {color:'rgb(250,250,250)'} );
	var traço = new THREE.Mesh(traçoGeometry, traçoMaterial);
	traço.receiveShadow = true;
	traço.position.set(0, 2, 7400 - i);
	pista.add(traço);
}
 for(var j = -105; j < 120; j = j + 30){
 	var traço2Geometry = new THREE.BoxGeometry(20, 2, 150);
 	var traço2Material = new THREE.MeshPhongMaterial( {color:'rgb(250,250,250)'} );
 	var traço2 = new THREE.Mesh(traço2Geometry, traço2Material);
	traço2.receiveShadow = true;
 	traço2.position.set(j, 2, -7400);
 	pista.add(traço2);
}
//Arvores 
//Arvores Simples
for(var i = 0; i < 100; i++)
{	
 	var size = 25000;
 	var randomX = Math.round(-size + Math.random() *size*2);
 	while(randomX < 300 && randomX > -300)
 		randomX =Math.round(-size + Math.random() *size*2);	 
    var randomZ = Math.round(-size/2 - Math.random() * size);
 	var geometry = new THREE.CylinderGeometry(5,10,150,100,100);
 	var material = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
 	var tronco = new THREE.Mesh(geometry, material);
 	tronco.castShadow = true;
 	tronco.position.set(randomX, 150/2, randomZ);
 	scene.add(tronco);
	var geometry = new THREE.IcosahedronGeometry(50, 0);
	var material = new THREE.MeshLambertMaterial({color:"rgb(0,128,0)"});
	var copa = new THREE.Mesh(geometry, material);
	copa.castShadow = true;
	tronco.add(copa);
	copa.position.set(0,150/2,0);
	var geometry = new THREE.CylinderGeometry(3,5,50,50,50);
 	var material = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
 	var galho = new THREE.Mesh(geometry, material);
	galho.castShadow = true;
	tronco.add(galho);
	galho.position.set(0,-2,11);
	var geometry = new THREE.IcosahedronGeometry(20, 0);
	var material = new THREE.MeshLambertMaterial({color:"rgb(0,128,0)"});
	var copa2 = new THREE.Mesh(geometry, material);
	copa2.castShadow = true;
	galho.add(copa2);
	copa2.position.set(0,25,0);
	galho.rotateX(degreesToRadians(35));
}
//Arvores com galho
for(var i = 0; i < 100; i++)
{	
 	var size = 25000;
 	var randomX = Math.round(-size + Math.random() *size*2);
 	while(randomX < 250 && randomX > -250)
 		randomX = Math.round(-size + Math.random() *size*2);
    var randomZ = Math.round(-size + Math.random() * size*2);
	while(randomZ > 100 || randomZ < -45000)
 		randomZ =Math.round(-size + Math.random() *size*2);
 	var geometry = new THREE.CylinderGeometry(5,10,150,50,50);
 	var material = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
 	var tronco = new THREE.Mesh(geometry, material);
 	tronco.castShadow = true;
 	tronco.position.set(randomX, 150/2, randomZ);
 	scene.add(tronco);
	var geometry = new THREE.IcosahedronGeometry(50, 0);
	var material = new THREE.MeshLambertMaterial({color:"rgb(0,128,0)"});
	var copa = new THREE.Mesh(geometry, material);
	copa.castShadow = true;
	tronco.add(copa);
	copa.position.set(0,150/2,0);
}

//Montanhas
//Montanha 1

var pointsbasemontanha1 = [];
for (var i = 1000; i >= 0; i--) {
    pointsbasemontanha1.push(new THREE.Vector3(-10*(i),1000 - i*2, 0));
    pointsbasemontanha1.push(new THREE.Vector3(-4*(i),1000 - i*2, -7*(i)));
    pointsbasemontanha1.push(new THREE.Vector3(3*(i), 1000 - i*2, -5*(i)));
	pointsbasemontanha1.push(new THREE.Vector3(1*(i), 1000 - i*2, 6*(i)));
	pointsbasemontanha1.push(new THREE.Vector3(7*(i), 1000 - i*2, 5*(i)));
}

var convexGeometry = new ConvexGeometry(pointsbasemontanha1);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base1montanha1 = new THREE.Mesh(convexGeometry, objectMaterial);
base1montanha1.castShadow = true;
base1montanha1.receiveShadow = true;
base1montanha1.position.set(-13000,1000,-40000);
scene.add(base1montanha1);

var pointsbase2montanha1 = [];
for (var i = 1000; i >= 0; i--) {
    pointsbase2montanha1.push(new THREE.Vector3(-6*(i),1000 - i*3, 5*(i)));
    pointsbase2montanha1.push(new THREE.Vector3(-8*(i),1000 - i*3, -3*(i)));
    pointsbase2montanha1.push(new THREE.Vector3(5*(i), 1000 - i*3, -3*(i)));
	pointsbase2montanha1.push(new THREE.Vector3(4*(i), 1000 - i*3, 4*(i)));
}

var convexGeometry = new ConvexGeometry(pointsbase2montanha1);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base2montanha1 = new THREE.Mesh(convexGeometry, objectMaterial);
base2montanha1.castShadow = true;
base2montanha1.receiveShadow = true;
base2montanha1.position.set(0,1000,0);
base1montanha1.add(base2montanha1);

var pointsmontanha1 = [];
for (var i = 1000; i >= 600; i--) {
    pointsmontanha1.push(new THREE.Vector3(-3*(i),1000 - i*10, 3*(i)));
    pointsmontanha1.push(new THREE.Vector3(-4*(i),1000 - i*10, -3*(i)));
    pointsmontanha1.push(new THREE.Vector3(3*(i), 1000 - i*10, -2*(i)));
	pointsmontanha1.push(new THREE.Vector3(1*(i), 1000 - i*10, 2*(i)));
}

var convexGeometry = new ConvexGeometry(pointsmontanha1);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var montanha1 = new THREE.Mesh(convexGeometry, objectMaterial);
montanha1.castShadow = true;
montanha1.receiveShadow = true;
montanha1.position.set(0,8000,0);
base1montanha1.add(montanha1);

var pointsmontanha12 = [];
for (var i = 1000; i >= 100; i--) {
    pointsmontanha12.push(new THREE.Vector3(-6*(i),1000 - i*5, 1*(i)));
    pointsmontanha12.push(new THREE.Vector3(-1*(i),1000 - i*5, -5*(i)));
    pointsmontanha12.push(new THREE.Vector3(5*(i), 1000 - i*5, 1*(i)));
	pointsmontanha12.push(new THREE.Vector3(-0.5*(i), 1000 - i*5, 4*(i)));
}

var convexGeometry = new ConvexGeometry(pointsmontanha12);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var montanha12 = new THREE.Mesh(convexGeometry, objectMaterial);
montanha12.castShadow = true;
montanha12.receiveShadow = true;
montanha12.position.set(0,3000,0);
base1montanha1.add(montanha12);

var pointspontamontanha1 = [];
for (var i = 600; i >= 300; i--) {
    pointspontamontanha1.push(new THREE.Vector3(-3*(i),100 - i*4, 3*(i)));
    pointspontamontanha1.push(new THREE.Vector3(-4*(i),100 - i*4, -3*(i)));
    pointspontamontanha1.push(new THREE.Vector3(3*(i), 100 - i*4, -2*(i)));
	pointspontamontanha1.push(new THREE.Vector3(1*(i), 100 - i*4, 2*(i)));
}

var convexGeometry = new ConvexGeometry(pointspontamontanha1);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var pontamontanha1 = new THREE.Mesh(convexGeometry, objectMaterial);
pontamontanha1.castShadow = true;
pontamontanha1.receiveShadow = true;
pontamontanha1.position.set(0, 5300,0);
base1montanha1.add(pontamontanha1);

var pointsponta2montanha1 = [];
for (var i = 300; i >= 100; i--) {
    pointsponta2montanha1.push(new THREE.Vector3(-3*(i),100 - i*4, 3*(i)));
    pointsponta2montanha1.push(new THREE.Vector3(-4*(i),100 - i*4, -3*(i)));
    pointsponta2montanha1.push(new THREE.Vector3(3*(i), 100 - i*4, -2*(i)));
	pointsponta2montanha1.push(new THREE.Vector3(1*(i), 100 - i*4, 2*(i)));
}

var convexGeometry = new ConvexGeometry(pointsponta2montanha1);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var ponta2montanha1 = new THREE.Mesh(convexGeometry, objectMaterial);
ponta2montanha1.castShadow = true;
ponta2montanha1.receiveShadow = true;
ponta2montanha1.position.set(0, 5300,0);
base1montanha1.add(ponta2montanha1);


// Montanha 2

var pointsbase1montanha2 = [];
for (var i = 1000; i >= 750; i--) {
    pointsbase1montanha2.push(new THREE.Vector3(-8*(i),1000 - i*10, 0));
    pointsbase1montanha2.push(new THREE.Vector3(-4*(i),1000 - i*10, -8*(i)));
    pointsbase1montanha2.push(new THREE.Vector3(3*(i), 1000 - i*10, -8*(i)));
	pointsbase1montanha2.push(new THREE.Vector3(1*(i), 1000 - i*10, 12*(i)));
	pointsbase1montanha2.push(new THREE.Vector3(7*(i), 1000 - i*10, 10*(i)));
	pointsbase1montanha2.push(new THREE.Vector3(-6*(i), 1000 - i*10, 10*(i)));
}
var convexGeometry2 = new ConvexGeometry(pointsbase1montanha2);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base1montanha2 = new THREE.Mesh(convexGeometry2, objectMaterial);
base1montanha2.castShadow = true;
base1montanha2.receiveShadow = true;
base1montanha2.position.set(15000,9000,-40000);
scene.add(base1montanha2);

var pointsbase2montanha2 = [];
for (var i = 1000; i >= 650; i--) {
    pointsbase2montanha2.push(new THREE.Vector3(-10*(i),1000 - i*10, 0));
    pointsbase2montanha2.push(new THREE.Vector3(-10*(i),1000 - i*10, -6*(i)));
    pointsbase2montanha2.push(new THREE.Vector3(6*(i), 1000 - i*10, -5*(i)));
	pointsbase2montanha2.push(new THREE.Vector3(2*(i), 1000 - i*10, 6*(i)));
	pointsbase2montanha2.push(new THREE.Vector3(7*(i), 1000 - i*10, 5*(i)));
}
var convexGeometry2 = new ConvexGeometry(pointsbase2montanha2);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base2montanha2 = new THREE.Mesh(convexGeometry2, objectMaterial);
base2montanha2.castShadow = true;
base2montanha2.receiveShadow = true;
base2montanha2.position.set(15000,9000,-40000);
scene.add(base2montanha2);

var pointsmontanha2 = [];
for (var i = 900; i >= 500; i--) {
    pointsmontanha2.push(new THREE.Vector3(-5*(i),1000 - i*15, 8*(i)));
    pointsmontanha2.push(new THREE.Vector3(-8*(i),1000 - i*15, -5*(i)));
    pointsmontanha2.push(new THREE.Vector3(5*(i), 1000 - i*15, -1*(i)));
	pointsmontanha2.push(new THREE.Vector3(2*(i), 1000 - i*15, -6*(i)));
	pointsmontanha2.push(new THREE.Vector3(5*(i), 1000 - i*15, 8*(i)));
	pointsmontanha2.push(new THREE.Vector3(3*(i), 1000 - i*15, 9*(i)));
	pointsmontanha2.push(new THREE.Vector3(0, 1000 - i*15, 10*(i)));
}

var convexGeometry = new ConvexGeometry(pointsmontanha2);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var montanha2 = new THREE.Mesh(convexGeometry, objectMaterial);
montanha2.castShadow = true;
montanha2.receiveShadow = true;
montanha2.position.set(0,5000,0);
base1montanha2.add(montanha2);


var pointsmontanha22 = [];
for (var i = 1000; i >= 600; i--) {
    pointsmontanha22.push(new THREE.Vector3(-2.5*(i),1000 - i*15, 4*(i)));
	pointsmontanha22.push(new THREE.Vector3(-3*(i),1000 - i*15, -2*(i)));
    pointsmontanha22.push(new THREE.Vector3(1*(i), 1000 - i*15, -3*(i)));
	pointsmontanha22.push(new THREE.Vector3(1.6*(i), 1000 - i*15, 4.4*(i)));
	pointsmontanha22.push(new THREE.Vector3(0, 1000 - i*15, 5*(i)));
	pointsmontanha22.push(new THREE.Vector3(2.5*(i), 1000 - i*15, 0*(i)));
}

var convexGeometry = new ConvexGeometry(pointsmontanha22);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var montanha22 = new THREE.Mesh(convexGeometry, objectMaterial);
montanha22.castShadow = true;
montanha22.receiveShadow = true;
montanha22.position.set(0,12500,0);
base1montanha2.add(montanha22);

var pointspontamontanha2 = [];
for (var i = 400; i >= 0; i--) {
    pointspontamontanha2.push(new THREE.Vector3(-2.5*(i),1000 - i*10, 4*(i)));
	pointspontamontanha2.push(new THREE.Vector3(-3*(i),1000 - i*10, -2*(i)));
    pointspontamontanha2.push(new THREE.Vector3(1*(i), 1000 - i*10, -3*(i)));
	pointspontamontanha2.push(new THREE.Vector3(1.0*(i), 1000 - i*10, 4.0*(i)));
	pointspontamontanha2.push(new THREE.Vector3(0, 1000 - i*10, 5*(i)));
	pointspontamontanha2.push(new THREE.Vector3(2.5*(i), 1000 - i*10, 0*(i)));
}
var convexGeometry = new ConvexGeometry(pointspontamontanha2);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(250,250,250)"});
var pontamontanha2 = new THREE.Mesh(convexGeometry, objectMaterial);
pontamontanha2.castShadow = true;
pontamontanha2.receiveShadow = true;
pontamontanha2.position.set(0,7500,0);
pontamontanha2.rotateY(degreesToRadians(30));
base1montanha2.add(pontamontanha2);


var pointspontamontanha2 = [];
for (var i = 400; i >= 0; i--) {
    pointspontamontanha2.push(new THREE.Vector3(-3.75*(i),1000 - i*5, 6*(i)));
	pointspontamontanha2.push(new THREE.Vector3(-4.5*(i),1000 - i*5, -3*(i)));
    pointspontamontanha2.push(new THREE.Vector3(1.5*(i), 1000 - i*5, -4.5*(i)));
	pointspontamontanha2.push(new THREE.Vector3(2.4*(i), 1000 - i*5, 6.6*(i)));
	pointspontamontanha2.push(new THREE.Vector3(0, 1000 - i*5, 7.5*(i)));
	pointspontamontanha2.push(new THREE.Vector3(3.7*(i), 1000 - i*5, 0*(i)));
}

var convexGeometry = new ConvexGeometry(pointspontamontanha2);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var pontamontanha2 = new THREE.Mesh(convexGeometry, objectMaterial);
pontamontanha2.castShadow = true;
pontamontanha2.receiveShadow = true;
pontamontanha2.position.set(0,5500,0);
base1montanha2.add(pontamontanha2);

//Montanha3

var pointsbasemontanha3 = [];
for (var i = 1000; i >= 500; i--) {
    pointsbasemontanha3.push(new THREE.Vector3(-5*(i),1000 - i*2, 0));
    pointsbasemontanha3.push(new THREE.Vector3(-2*(i),1000 - i*2, -3.5*(i)));
    pointsbasemontanha3.push(new THREE.Vector3(1.5*(i), 1000 - i*2, -2.5*(i)));
	pointsbasemontanha3.push(new THREE.Vector3(0.5*(i), 1000 - i*2, 3*(i)));
	pointsbasemontanha3.push(new THREE.Vector3(3.5*(i), 1000 - i*2, 2.5*(i)));
}

var convexGeometry = new ConvexGeometry(pointsbasemontanha3);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base1montanha3 = new THREE.Mesh(convexGeometry, objectMaterial);
base1montanha3.castShadow = true;
base1montanha3.receiveShadow = true;
base1montanha3.position.set(2500,1000,-35000);
scene.add(base1montanha3);

var pointsbase12montanha3 = [];
for (var i = 1000; i >= 300; i--) {
	pointsbase12montanha3.push(new THREE.Vector3(-2*(i),1000 - i*3, 3*(i)));
    pointsbase12montanha3.push(new THREE.Vector3(-4*(i),1000 - i*3, -1.5*(i)));
    pointsbase12montanha3.push(new THREE.Vector3(2.5*(i), 1000 - i*3, -1.5*(i)));
	pointsbase12montanha3.push(new THREE.Vector3(2*(i), 1000 - i*3, 2*(i)));
}

var convexGeometry = new ConvexGeometry(pointsbase12montanha3);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base12montanha3 = new THREE.Mesh(convexGeometry, objectMaterial);
base12montanha3.castShadow = true;
base12montanha3.receiveShadow = true;
base12montanha3.position.set(0,1000,0);
base1montanha3.add(base12montanha3);

var pointsmontanha31 = [];
for (var i = 1000; i >= 400; i--) {
	pointsmontanha31.push(new THREE.Vector3(0,1000 - i*7, -1.5*(i)));
    pointsmontanha31.push(new THREE.Vector3(1.5*(i), 1000 - i*7, 0*(i)));
	pointsmontanha31.push(new THREE.Vector3(1*(i), 1000 - i*7, 1*(i)));
	pointsmontanha31.push(new THREE.Vector3(-1*(i), 1000 - i*7, 2*(i)));
	pointsmontanha31.push(new THREE.Vector3(-2.5*(i), 1000 - i*7, -1*(i)));
}

var convexGeometry = new ConvexGeometry(pointsmontanha31);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var montanha31 = new THREE.Mesh(convexGeometry, objectMaterial);
montanha31.castShadow = true;
montanha31.receiveShadow = true;
montanha31.position.set(0,5500,0);
base1montanha3.add(montanha31);

var pointsbase2montanha3 = [];
for (var i = 1000; i >= 500; i--) {
    pointsbase2montanha3.push(new THREE.Vector3(-4*(i),1000 - i*2, 0));
	pointsbase2montanha3.push(new THREE.Vector3(-3*(i),1000 - i*2, 5*(i)));
    pointsbase2montanha3.push(new THREE.Vector3(-2*(i),1000 - i*2, -3.5*(i)));
    pointsbase2montanha3.push(new THREE.Vector3(1.5*(i), 1000 - i*2, -2.5*(i)));
	pointsbase2montanha3.push(new THREE.Vector3(0.5*(i), 1000 - i*2, 3*(i)));
	pointsbase2montanha3.push(new THREE.Vector3(3.5*(i), 1000 - i*2, 2.5*(i)));
}

var convexGeometry = new ConvexGeometry(pointsbase2montanha3);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base2montanha3 = new THREE.Mesh(convexGeometry, objectMaterial);
base2montanha3.castShadow = true;
base2montanha3.receiveShadow = true;
base2montanha3.position.set(-2000,1000,-38000);
scene.add(base2montanha3);

var pointsbase22montanha3 = [];
for (var i = 1000; i >= 300; i--) {
	pointsbase22montanha3.push(new THREE.Vector3(-3*(i),1000 - i*3, 2.5*(i)));
    pointsbase22montanha3.push(new THREE.Vector3(-4*(i),1000 - i*3, -1.5*(i)));
    pointsbase22montanha3.push(new THREE.Vector3(2.5*(i), 1000 - i*3, -1.5*(i)));
	pointsbase22montanha3.push(new THREE.Vector3(2*(i), 1000 - i*3, 2*(i)));
}

var convexGeometry = new ConvexGeometry(pointsbase22montanha3);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(50,205,50)"});
var base22montanha3 = new THREE.Mesh(convexGeometry, objectMaterial);
base22montanha3.castShadow = true;
base22montanha3.receiveShadow = true;
base22montanha3.position.set(0,1000,0);
base2montanha3.add(base22montanha3);

var pointsmontanha32 = [];
for (var i = 1000; i >= 500; i--) {
	pointsmontanha32.push(new THREE.Vector3(0,1000 - i*5, -1.5*(i)));
    pointsmontanha32.push(new THREE.Vector3(1.5*(i), 1000 - i*5, 0*(i)));
	pointsmontanha32.push(new THREE.Vector3(1*(i), 1000 - i*5, 2*(i)));
	pointsmontanha32.push(new THREE.Vector3(-2*(i), 1000 - i*5, 3*(i)));
	pointsmontanha32.push(new THREE.Vector3(-2.5*(i), 1000 - i*5, -1*(i)));
}

var convexGeometry = new ConvexGeometry(pointsmontanha32);
var objectMaterial = new THREE.MeshLambertMaterial({color:"rgb(116,74,43)"});
var montanha32 = new THREE.Mesh(convexGeometry, objectMaterial);
montanha32.castShadow = true;
montanha32.receiveShadow = true;
montanha32.position.set(0,3500,0);
base2montanha3.add(montanha32);



/////////////////////////////////////////////////////////////////////////////////////////////////////
//Cria Circuito 
//Create a closed wavey loop
var axesHelper = new THREE.AxesHelper( 20 );

scene.add( axesHelper );

var curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( 0, 500, -15000 ),
    new THREE.Vector3( 0, 1100, -18000 ),
	new THREE.Vector3( 0, 1700, -21000 ),
	new THREE.Vector3( 0, 2300, -25000 ),
	new THREE.Vector3( 0, 2600, -34000 ),
	new THREE.Vector3( 0, 2700, -36000 ),
	new THREE.Vector3( 0, 3500, -42000 ),
	new THREE.Vector3( -5000, 3650, -44000 ),
	new THREE.Vector3( -13000, 3800, -45000 ),
	new THREE.Vector3( -18000, 4000, -44000 ),
	new THREE.Vector3( -13000, 5000, -28000 ),
	new THREE.Vector3( -5000, 6000, -16000 ),
	new THREE.Vector3( 5000, 6500, -15000 ),
	new THREE.Vector3( 15000, 7000, -23000 ),
	new THREE.Vector3( 20000, 7000, -30000 ),
	new THREE.Vector3( 23000, 7500, -38000 ),
	new THREE.Vector3( 20000, 8000, -45000 ),
	new THREE.Vector3( 10000, 9500, -44000 ),
	new THREE.Vector3( 15000, 10500, -32000 ),
	new THREE.Vector3( 20000, 11500, -35000 ),
	new THREE.Vector3( 20000, 12500, -45000 ),
	new THREE.Vector3( 10000, 13000, -44000 ),
	new THREE.Vector3( 0, 13000, -35000 ),
	new THREE.Vector3( 0, 10000, -25000 ),
], false);

var pointControle = new THREE.Object3D();


var pointsLin = curve.getPoints( 100 );
var pointsCheck = curve.getPoints(20);
var geometry = new THREE.BufferGeometry().setFromPoints( pointsLin );

var material = new THREE.LineBasicMaterial( { color:'rgb(255,255,0)'});

//Create the final object to add to the scene
var curveObject = new THREE.Line( geometry, material );
curveObject.visible = circuitoVisao;
scene.add(curveObject);

var material = new THREE.MeshPhongMaterial({color:"rgb(255,0,0)"});
pointsCheck.forEach(function (point) {
    var pGeom = new THREE.TorusGeometry(100, 10, 16, 100);
    var pMesh = new THREE.Mesh(pGeom, material);
    pMesh.position.set(point.x, point.y, point.z);
    pointControle.add(pMesh);
});
scene.add(pointControle);



/////////////////////////////////////////////////////////////////////////////////////////////////////
var keyboard = new KeyboardState();

var angle1 = 0;
var angle2 = 0;
var angle3 = 0;
var angle4 = 0;
var speed = 0;
var valAntigo = [0,0,0,0];
var valTrocaCam= [0,0,0,0,0,0,0,0,0];
var mat4 = new THREE.Matrix4();
var cameraPos = true;

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000000);
camera.lookAt(0,0,0);
camera.position.set(0,150,400);
camera.up.set( 0, 1, 0 );

var camera2 = initCamera(new THREE.Vector3(0, -400, 100));
scene2.add(camera2);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera2, renderer.domElement );
//var trackballControls = new TrackballControls( camera, renderer.domElement );
var axesHelper = new THREE.AxesHelper(200);
scene2.add(axesHelper);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Corpo do aviao
// create body plane
var planeHolderHolder = new THREE.Object3D();
scene.add(planeHolderHolder)

light.target = planeHolderHolder;
scene.add(light.target);
var planeHolder = new THREE.Object3D();
planeHolderHolder.add(planeHolder);

var geometry = new THREE.CylinderGeometry(8, 10, 68, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var body = new THREE.Mesh(geometry, cylinderMaterial);
body.castShadow = true;
body.receiveShadow = false;
planeHolder.add(body);

sol.target = planeHolderHolder;
scene.add(sol.target);

var cameraHolder = new THREE.Object3D();
planeHolder.add(cameraHolder);

cameraHolder.add(camera);

var geometry = new THREE.CylinderGeometry(8, 8.8, 15.5, 100, 1, false, degreesToRadians(-60), degreesToRadians(120));
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var faixa = new THREE.Mesh(geometry, cylinderMaterial);
faixa.castShadow = true;
faixa.receiveShadow = false;
body.add(faixa);

var geometry = new THREE.CylinderGeometry(0, 2, 10, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var escapamento1 = new THREE.Mesh(geometry, cylinderMaterial);
escapamento1.castShadow = true;
escapamento1.receiveShadow = false;
body.add(escapamento1);

var geometry = new THREE.TorusGeometry( 1.9, 0.1, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var bordaescapamento1 = new THREE.Mesh( geometry, material );
bordaescapamento1.castShadow = true;
bordaescapamento1.receiveShadow = false;
escapamento1.add( bordaescapamento1 );

var geometry = new THREE.CircleGeometry(1.9, 32 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(10,10,10)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var tampaescapamento1 = new THREE.Mesh( geometry, material );
tampaescapamento1.castShadow = true;
tampaescapamento1.receiveShadow = false;
escapamento1.add(tampaescapamento1);

var geometry = new THREE.CylinderGeometry(0, 2, 10, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var escapamento2 = new THREE.Mesh(geometry, cylinderMaterial);
escapamento2.castShadow = true;
escapamento2.receiveShadow = false;
body.add(escapamento2);

var geometry = new THREE.TorusGeometry( 1.9, 0.1, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var bordaescapamento2 = new THREE.Mesh( geometry, material );
bordaescapamento2.castShadow = true;
bordaescapamento2.receiveShadow = false;
escapamento2.add( bordaescapamento2 );

var geometry = new THREE.CircleGeometry(1.9, 32 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(10,10,10)'} );
var tampaescapamento2 = new THREE.Mesh( geometry, material );
tampaescapamento2.castShadow = true;
tampaescapamento2.receiveShadow = false;
escapamento2.add(tampaescapamento2);

var geometry = new THREE.CylinderGeometry(0, 2, 10, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var escapamento3 = new THREE.Mesh(geometry, cylinderMaterial);
escapamento3.castShadow = true;
escapamento3.receiveShadow = false;
body.add(escapamento3);

var geometry = new THREE.TorusGeometry( 1.9, 0.1, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var bordaescapamento3 = new THREE.Mesh( geometry, material );
bordaescapamento3.castShadow = true;
bordaescapamento3.receiveShadow = false;
escapamento3.add( bordaescapamento3 );

var geometry = new THREE.CircleGeometry(1.9, 32 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(10,10,10)'} );
var tampaescapamento3 = new THREE.Mesh( geometry, material );
tampaescapamento3.castShadow = true;
tampaescapamento3.receiveShadow = false;
escapamento3.add(tampaescapamento3);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Nariz, hélices, motor e turbina
//create nose
var geometry = new THREE.CylinderGeometry(10.5, 9.5, 10, 100);
var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var basenose = new THREE.Mesh(geometry, cylinderMaterial);
basenose.castShadow = true;
basenose.receiveShadow = false;
body.add(basenose);

var geometry = new THREE.CircleGeometry(9, 32 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(51,0,0)',
	shininess:"100",            // Shininess of the object
	specular:"rgb(255,255,255)"
});
var circle = new THREE.Mesh( geometry, material );
circle.castShadow = true;
circle.receiveShadow = false;
basenose.add(circle);

var geometry = new THREE.TorusGeometry( 10, 0.5, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var torus1 = new THREE.Mesh( geometry, material );
torus1.castShadow = true;
torus1.receiveShadow = false;
basenose.add( torus1 );

var geometry = new THREE.TorusGeometry( 7.5, 2, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var torus2 = new THREE.Mesh( geometry, material );
torus2.castShadow = true;
torus2.receiveShadow = false;
basenose.add( torus2 );

// create turbina
var sphereGeometry = new THREE.SphereGeometry(2.5,50,200);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(192,192,192)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var motor = new THREE.Mesh(sphereGeometry, sphereMaterial);
motor.castShadow = true;
motor.receiveShadow = false;
basenose.add(motor);

var geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 100);
var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var gradeMotor1 = new THREE.Mesh(geometry, cylinderMaterial);
var gradeMotor2 = new THREE.Mesh(geometry, cylinderMaterial);
var gradeMotor3 = new THREE.Mesh(geometry, cylinderMaterial);
var gradeMotor4 = new THREE.Mesh(geometry, cylinderMaterial);
var gradeMotor5 = new THREE.Mesh(geometry, cylinderMaterial);
var gradeMotor6 = new THREE.Mesh(geometry, cylinderMaterial);
var gradeMotor7 = new THREE.Mesh(geometry, cylinderMaterial);
var gradeMotor8 = new THREE.Mesh(geometry, cylinderMaterial);
motor.add(gradeMotor1);
motor.add(gradeMotor2);
motor.add(gradeMotor3);
motor.add(gradeMotor4);
motor.add(gradeMotor5);
motor.add(gradeMotor6);
motor.add(gradeMotor7);
motor.add(gradeMotor8);


var geometry = new THREE.CylinderGeometry(1, 1, 4, 100);
var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(192,192,192)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var turbina = new THREE.Mesh(geometry, cylinderMaterial);
turbina.castShadow = true;
turbina.receiveShadow = false;
motor.add(turbina);

var geometry = new THREE.CylinderGeometry(0.8, 0.8, 3, 100);
var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(192,192,192)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var apoioHelice = new THREE.Mesh(geometry, cylinderMaterial);
apoioHelice.castShadow = true;
apoioHelice.receiveShadow = false;
turbina.add(apoioHelice);
//Hélice 1
//Base Hélice 1
var geometry = new THREE.CylinderGeometry(0.74, 0, 5, 100);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var basehelice1 = new THREE.Mesh(geometry, material);
basehelice1.castShadow = true;
basehelice1.receiveShadow = false;
apoioHelice.add(basehelice1);

//Pa Hélice 1
var geometry = new THREE.BoxGeometry(15, 0.2555, 2.4);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var pahelice1 = new THREE.Mesh(geometry, material);
pahelice1.castShadow = true;
pahelice1.receiveShadow = false;
basehelice1.add(pahelice1);

//junta1 Helice1 
var geometry = new THREE.BoxGeometry(1, 0.2555, 1.5);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta1 = new THREE.Mesh(geometry, material);
junta1.castShadow = true;
junta1.receiveShadow = false;
pahelice1.add(junta1);


//junta2 helice1
var geometry = new THREE.BoxGeometry(1, 0.2555, 1.5);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta2 = new THREE.Mesh(geometry, material);
junta2.castShadow = true;
junta2.receiveShadow = false;
pahelice1.add(junta2);

//Fita Amarela ponta
var geometry = new THREE.CylinderGeometry(1.2, 1.2, 0.22, 100);
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var fita1 = new THREE.Mesh(geometry, material);
fita1.castShadow = true;
fita1.receiveShadow = false;
pahelice1.add(fita1);

//Fita Amarela traço
var geometry = new THREE.BoxGeometry(0.5, 0.28, 2.42);
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var fita2 = new THREE.Mesh(geometry, material);
fita2.castShadow = true;
fita2.receiveShadow = false;
pahelice1.add(fita2);

//Hélice 2
//Base Hélice 2
var geometry = new THREE.CylinderGeometry(0, 0.74, 5, 100);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var basehelice2 = new THREE.Mesh(geometry, material);
basehelice2.castShadow = true;
basehelice2.receiveShadow = false;
apoioHelice.add(basehelice2);

//Pa Hélice 2
var geometry = new THREE.BoxGeometry(15, 0.2555, 2.4);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var pahelice2 = new THREE.Mesh(geometry, material);
pahelice2.castShadow = true;
pahelice2.receiveShadow = false;
basehelice2.add(pahelice2);

//junta1 Helice2 
var geometry = new THREE.BoxGeometry(1, 0.2555, 1.5);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta12 = new THREE.Mesh(geometry, material);
junta12.castShadow = true;
junta12.receiveShadow = false;
pahelice2.add(junta12);

//junta2 helice2
var geometry = new THREE.BoxGeometry(1, 0.2555, 1.5);
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta22 = new THREE.Mesh(geometry, material);
junta22.castShadow = true;
junta22.receiveShadow = false;
pahelice2.add(junta22);

//Fita Amarela ponta 2
var geometry = new THREE.CylinderGeometry(1.2, 1.2, 0.22, 100);
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var fita12 = new THREE.Mesh(geometry, material);
fita12.castShadow = true;
fita12.receiveShadow = false;
pahelice2.add(fita12);

//Fita Amarela traço 2
var geometry = new THREE.BoxGeometry(0.5, 0.28, 2.42);
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var fita22 = new THREE.Mesh(geometry, material);
fita22.castShadow = true;
fita22.receiveShadow = false;
pahelice2.add(fita22);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Janela e cabine
//create cabine
var geometry = new THREE.CylinderGeometry(5, 5, 35, 100,1,true);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(150,255,255)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)",
opacity: 0.7,
transparent: true});

var cabine = new THREE.Mesh(geometry, cylinderMaterial);
cabine.castShadow = true;
cabine.receiveShadow = false;
body.add(cabine);

//create Janela
var sphereGeometry = new THREE.SphereGeometry(5,50,200,degreesToRadians(85),degreesToRadians(200));
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(150,255,255)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)",
opacity: 0.7,
transparent: true});
var janela = new THREE.Mesh(sphereGeometry, sphereMaterial);
janela.castShadow = true;
janela.receiveShadow = false;
cabine.add(janela);

var sphereGeometry = new THREE.SphereGeometry(5,50,200,degreesToRadians(85),degreesToRadians(200));
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(150,255,255)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)",
opacity: 0.7,
transparent: true});
var janela2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
janela2.castShadow = true;
janela2.receiveShadow = false;
cabine.add(janela2);
//create grades da Janela
var geometry = new THREE.TorusGeometry( 5, 0.5, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade1 = new THREE.Mesh( geometry, material );
grade1.castShadow = true;
grade1.receiveShadow = false;
cabine.add( grade1 );

var geometry = new THREE.TorusGeometry( 5, 0.5, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade2 = new THREE.Mesh( geometry, material );
grade2.castShadow = true;
grade2.receiveShadow = false;
cabine.add( grade2 );

var geometry = new THREE.TorusGeometry( 5, 0.5, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade3 = new THREE.Mesh( geometry, material );
grade3.castShadow = true;
grade3.receiveShadow = false;
cabine.add( grade3 );

var geometry = new THREE.TorusGeometry( 5, 0.5, 16, 100 );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade4 = new THREE.Mesh( geometry, material );
grade4.castShadow = true;
grade4.receiveShadow = false;
cabine.add( grade4 );

var geometry = new THREE.CylinderGeometry(0.5, 0.5, 36, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade5 = new THREE.Mesh(geometry, cylinderMaterial);
grade5.castShadow = true;
grade5.receiveShadow = false;
cabine.add(grade5);

var geometry = new THREE.CylinderGeometry(0.5, 0.5, 36, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade6 = new THREE.Mesh(geometry, cylinderMaterial);
grade6.castShadow = true;
grade6.receiveShadow = false;
cabine.add(grade6);

var geometry = new THREE.TorusGeometry( 3.5, 0.5, 16, 100, degreesToRadians(120));
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade7 = new THREE.Mesh( geometry, material );
grade7.castShadow = true;
grade7.receiveShadow = false;
janela.add( grade7 );

var geometry = new THREE.TorusGeometry( 3.5, 0.5, 16, 100,  degreesToRadians(120));
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade8 = new THREE.Mesh( geometry, material );
grade8.castShadow = true;
grade8.receiveShadow = false;
janela.add( grade8 );

var geometry = new THREE.TorusGeometry( 3.5, 0.5, 16, 100,  degreesToRadians(120));
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade9 = new THREE.Mesh( geometry, material );
grade9.castShadow = true;
grade9.receiveShadow = false;
janela2.add( grade9 );

var geometry = new THREE.TorusGeometry( 3.5, 0.5, 16, 100,  degreesToRadians(120));
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var grade10 = new THREE.Mesh( geometry, material );
grade10.castShadow = true;
grade10.receiveShadow = false;
janela2.add( grade10 );

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Asas
//create base da asa
var largura = 18, comprimento = 21;

var shape = new THREE.Shape();
shape.moveTo( -comprimento, -largura );
shape.lineTo( -comprimento, largura );
shape.lineTo( comprimento, largura);
shape.lineTo( comprimento, -largura );
shape.lineTo( -comprimento, -largura);

var extrudeSettings = {
	steps: 1,
	depth: 0.0000005,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 1,
	bevelSegments: 3
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var baseAsa = new THREE.Mesh( geometry, material ) ;
baseAsa.castShadow = true;
baseAsa.receiveShadow = false;
body.add( baseAsa );

// //junta da base da asa com a asa 1
var geometry = new THREE.CylinderGeometry(1.5, 1.5, 38, 100);
var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta1Asa1 = new THREE.Mesh(geometry, cylinderMaterial);
junta1Asa1.castShadow = true;
junta1Asa1.receiveShadow = false;
baseAsa.add(junta1Asa1);

var sphereGeometry = new THREE.SphereGeometry(1.5,50,200);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta2Asa1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
junta2Asa1.castShadow = true;
junta2Asa1.receiveShadow = false;
baseAsa.add(junta2Asa1);

var sphereGeometry = new THREE.SphereGeometry(1.5,50,200);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta3Asa1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
junta3Asa1.castShadow = true;
junta3Asa1.receiveShadow = false;
baseAsa.add(junta3Asa1);

//create Asa 1
var largura = 18, comprimento = 75;

var shape = new THREE.Shape();
shape.moveTo( 0, 0 );
shape.lineTo( 32.5, 0);
shape.lineTo( 32.5 , -7.5);
shape.lineTo( 72.5 , -7.5);
shape.lineTo( 72.5 , 0);
shape.lineTo( comprimento, 0 );
shape.lineTo( comprimento, -largura + 0.5);
shape.lineTo( 0, -largura - 17.95 );

var extrudeSettings = {
	steps: 1,
	depth: 0.0000005,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 1,
	bevelSegments: 3
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var asa1 = new THREE.Mesh( geometry, material );
asa1.castShadow = true;
asa1.receiveShadow = false;
baseAsa.add( asa1 );

//create Aileron 1
var largura = 18, comprimento = 75;

var shape = new THREE.Shape();
shape.moveTo( 0, 0 );
shape.lineTo( 35, 0);
shape.lineTo( 35 , 5);
shape.lineTo( 0 , 5);
shape.lineTo( 0, 0);

var extrudeSettings = {
	steps: 1,
	depth: 0.0000001,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 1,
	bevelSegments: 3
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var aileron1 = new THREE.Mesh( geometry, material ) ;
aileron1.castShadow = true;
aileron1.receiveShadow = false;
asa1.add( aileron1 );

// //junta da base da asa com a asa 2
var geometry = new THREE.CylinderGeometry(1.5, 1.5, 38, 100);
var cylinderMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta1Asa2 = new THREE.Mesh(geometry, cylinderMaterial);
junta1Asa2.castShadow = true;
junta1Asa2.receiveShadow = false;
baseAsa.add(junta1Asa2);

var sphereGeometry = new THREE.SphereGeometry(1.5,50,200);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"100",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta2Asa2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
junta2Asa2.castShadow = true;
junta2Asa2.receiveShadow = false;
baseAsa.add(junta2Asa2);

var sphereGeometry = new THREE.SphereGeometry(1.5,50,200);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var junta3Asa2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
junta3Asa2.castShadow = true;
junta3Asa2.receiveShadow = false;
baseAsa.add(junta3Asa2);

//create Asa 2
var largura = 18, comprimento = 75;

var shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, -largura - 17.95);
shape.lineTo( -comprimento, -largura );
shape.lineTo( -comprimento, 0 );
shape.lineTo( -72.5, 0);
shape.lineTo( -72.5, -7.5);
shape.lineTo( -32.5, -7.5);
shape.lineTo( -32.5, 0);
shape.lineTo( 0, 0) ;

var extrudeSettings = {
	steps: 1,
	depth: 0.0000005,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 1,
	bevelSegments: 3
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var asa2 = new THREE.Mesh( geometry, material ) ;
asa2.castShadow = true;
asa2.receiveShadow = false;
baseAsa.add( asa2 );

//create Aileron 2
var largura = 18, comprimento = 75;

var shape = new THREE.Shape();
shape.moveTo( 0, 0 );
shape.lineTo( 35, 0);
shape.lineTo( 35 , 5);
shape.lineTo( 0 , 5);
shape.lineTo( 0, 0);

var extrudeSettings = {
	steps: 1,
	depth: 0.0000001,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 1,
	bevelSegments: 3
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(15,15,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var aileron2 = new THREE.Mesh( geometry, material ) ;
aileron2.castShadow = true;
aileron2.receiveShadow = false;
asa2.add( aileron2 );

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Cauda do Aviao
//Cauda
var geometry = new THREE.CylinderGeometry(7.5, 8, 8, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(15,15,15)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var cauda1 = new THREE.Mesh(geometry, cylinderMaterial);
cauda1.castShadow = true;
cauda1.receiveShadow = false;
body.add(cauda1);

var geometry = new THREE.CylinderGeometry(1.5, 7.5, 25, 100);
var cylinderMaterial =  new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var cauda2 = new THREE.Mesh(geometry, cylinderMaterial);
cauda2.castShadow = true;
cauda2.receiveShadow = false;
cauda1.add(cauda2);


 
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Estabilizadores
//Estabilizador 3
var base = 20, altura = 20;

var shape = new THREE.Shape();
shape.moveTo( -15, -2 );
shape.lineTo( base, 1);
shape.lineTo( base, altura );
shape.lineTo( base - 2, altura );
shape.lineTo( 0, 0 );

var extrudeSettings = {
	steps: 1,
	depth: 0.0000005,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 1,
	bevelSegments: 5
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var estabilizador3 = new THREE.Mesh( geometry, material ) ;
estabilizador3.castShadow = true;
estabilizador3.receiveShadow = false;
cauda2.add( estabilizador3 );

//Estabilizador 1
var length = 30, width = 16;

var shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, width );
shape.lineTo( length, width );
shape.lineTo( 0, 0 );

var extrudeSettings = {
	steps: 1,
	depth: 0.0000005,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 0.5,
	bevelSegments: 3
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var estabilizador1 = new THREE.Mesh( geometry, material ) ;
estabilizador1.castShadow = true;
estabilizador1.receiveShadow = false;
estabilizador3.add( estabilizador1 );

//Profundor1
var geometry = new THREE.CylinderGeometry(15, 15, 1, 64, 1, false,
   degreesToRadians(-1), degreesToRadians(182));
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var profundor1 = new THREE.Mesh( geometry, material );
profundor1.castShadow = true;
profundor1.receiveShadow = false;
estabilizador1.add( profundor1 );

//Estabilizador 2
var length = 30, width = 16;

var shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, width );
shape.lineTo( -length, width );
shape.lineTo( 0, 0 );

var extrudeSettings = {
	steps: 1,
	depth: 0.0000005,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0.5,
	bevelOffset: 0.5,
	bevelSegments: 3
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var estabilizador2 = new THREE.Mesh( geometry, material ) ;
estabilizador2.castShadow = true;
estabilizador2.receiveShadow = false;
estabilizador3.add( estabilizador2 );

//Profundor2
var geometry = new THREE.CylinderGeometry(15, 15, 1, 64, 1, false,
  degreesToRadians(-1), degreesToRadians(182));
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var profundor2 = new THREE.Mesh( geometry, material );
profundor2.castShadow = true;
profundor2.receiveShadow = false;
estabilizador2.add( profundor2 );

//Leme
var base = 12, altura = 22;

var shape = new THREE.Shape();
shape.moveTo( 0, -1.005 );
shape.lineTo( base, 4);
shape.lineTo( 0, altura );
shape.lineTo( -2.2, 19.5);
shape.lineTo( 0, 20.1 );

var extrudeSettings = {
	steps: 1,
	depth: 0.0000005,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 2,
	bevelOffset: 1,
	bevelSegments: 5
};

var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( {color:'rgb(255,255,0)',
shininess:"200",            // Shininess of the object
specular:"rgb(255,255,255)"
});
var leme = new THREE.Mesh( geometry, material ) ;
leme.castShadow = true;
leme.receiveShadow = false;
estabilizador3.add( leme );

constroiAviao();

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Constroi avião 2
var body2 = body.clone();
scene2.add(body2);
body2.matrixAutoUpdate = false;
body2.matrix.identity();
body2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(180)));
body2.matrix.multiply(mat4.makeTranslation(0,0,0));

function constroiAviao()
{
	planeHolder.matrixAutoUpdate = false;
	planeHolderHolder.matrixAutoUpdate = false;
	cameraHolder.matrixAutoUpdate = false;
	body.matrixAutoUpdate = false;
	faixa.matrixAutoUpdate = false;
	escapamento1.matrixAutoUpdate = false;
	bordaescapamento1.matrixAutoUpdate = false;
	tampaescapamento1.matrixAutoUpdate = false;
	escapamento2.matrixAutoUpdate = false;
	bordaescapamento2.matrixAutoUpdate = false;
	tampaescapamento2.matrixAutoUpdate = false;
	escapamento3.matrixAutoUpdate = false;
	bordaescapamento3.matrixAutoUpdate = false;
	tampaescapamento3.matrixAutoUpdate = false;
	basenose.matrixAutoUpdate = false;
	circle.matrixAutoUpdate = false;
	torus1.matrixAutoUpdate = false;
	torus2.matrixAutoUpdate = false;
	motor.matrixAutoUpdate = false;
	gradeMotor1.matrixAutoUpdate = false;
	gradeMotor2.matrixAutoUpdate = false;
	gradeMotor3.matrixAutoUpdate = false;
	gradeMotor4.matrixAutoUpdate = false;
	gradeMotor5.matrixAutoUpdate = false;
	gradeMotor6.matrixAutoUpdate = false;
	gradeMotor7.matrixAutoUpdate = false;
	gradeMotor8.matrixAutoUpdate = false;
	turbina.matrixAutoUpdate = false;
	apoioHelice.matrixAutoUpdate = false;
	basehelice1.matrixAutoUpdate = false;
	pahelice1.matrixAutoUpdate = false;
	fita1.matrixAutoUpdate = false;
	fita2.matrixAutoUpdate = false;
	junta1.matrixAutoUpdate = false;
	junta2.matrixAutoUpdate = false;
	basehelice2.matrixAutoUpdate = false;
	pahelice2.matrixAutoUpdate = false;
	fita12.matrixAutoUpdate = false;
	fita22.matrixAutoUpdate = false;
	junta12.matrixAutoUpdate = false;
	junta22.matrixAutoUpdate = false;
	cabine.matrixAutoUpdate = false;
	janela.matrixAutoUpdate = false;
	janela2.matrixAutoUpdate = false;
	grade1.matrixAutoUpdate = false;
	grade2.matrixAutoUpdate = false;
	grade3.matrixAutoUpdate = false;
	grade4.matrixAutoUpdate = false;
	grade5.matrixAutoUpdate = false;
	grade6.matrixAutoUpdate = false;
	grade7.matrixAutoUpdate = false;
	grade8.matrixAutoUpdate = false;
	grade9.matrixAutoUpdate = false;
	grade10.matrixAutoUpdate = false;
	baseAsa.matrixAutoUpdate = false;
	junta1Asa1.matrixAutoUpdate = false;
	junta2Asa1.matrixAutoUpdate = false;
	junta3Asa1.matrixAutoUpdate = false;
	asa1.matrixAutoUpdate = false;
	aileron1.matrixAutoUpdate = false;
	junta1Asa2.matrixAutoUpdate = false;
	junta2Asa2.matrixAutoUpdate = false;
	junta3Asa2.matrixAutoUpdate = false;
	asa2.matrixAutoUpdate = false;
	aileron2.matrixAutoUpdate = false;
	cauda1.matrixAutoUpdate = false;
	cauda2.matrixAutoUpdate = false;
	estabilizador1.matrixAutoUpdate = false;
	profundor1.matrixAutoUpdate = false;
	estabilizador2.matrixAutoUpdate = false;
	profundor2.matrixAutoUpdate = false;
	estabilizador3.matrixAutoUpdate = false;
	leme.matrixAutoUpdate = false;

	body.matrix.identity();
	faixa.matrix.identity();
	escapamento1.matrix.identity();
	bordaescapamento1.matrix.identity();
	tampaescapamento1.matrix.identity();
	escapamento2.matrix.identity();
	bordaescapamento2.matrix.identity();
	tampaescapamento2.matrix.identity();
	escapamento3.matrix.identity();
	bordaescapamento3.matrix.identity();
	tampaescapamento3.matrix.identity();
	basenose.matrix.identity();
	circle.matrix.identity();
	torus1.matrix.identity();
	torus2.matrix.identity();
	motor.matrix.identity();
	gradeMotor1.matrix.identity();
	gradeMotor2.matrix.identity();
	gradeMotor3.matrix.identity();
	gradeMotor4.matrix.identity();
	gradeMotor5.matrix.identity();
	gradeMotor6.matrix.identity();
	gradeMotor7.matrix.identity();
	gradeMotor8.matrix.identity();
	turbina.matrix.identity();
	apoioHelice.matrix.identity();
	basehelice1.matrix.identity();
	pahelice1.matrix.identity();
	fita1.matrix.identity();
	fita2.matrix.identity();
	junta1.matrix.identity();
	junta2.matrix.identity();
	basehelice2.matrix.identity();
	pahelice2.matrix.identity();
	fita12.matrix.identity();
	fita22.matrix.identity();
	junta12.matrix.identity();
	junta22.matrix.identity();
	cabine.matrix.identity();
	janela.matrix.identity();
	janela2.matrix.identity();
	grade1.matrix.identity();
	grade2.matrix.identity();
	grade3.matrix.identity();
	grade4.matrix.identity();
	grade5.matrix.identity();
	grade6.matrix.identity();
	grade7.matrix.identity();
	grade8.matrix.identity();
	grade9.matrix.identity();
	grade10.matrix.identity();
	baseAsa.matrix.identity();
	junta1Asa1.matrix.identity();
	junta2Asa1.matrix.identity();
	junta3Asa1.matrix.identity();
	asa1.matrix.identity();
	aileron1.matrix.identity();
	junta1Asa2.matrix.identity();
	junta2Asa2.matrix.identity();
	junta3Asa2.matrix.identity();
	asa2.matrix.identity();
	aileron2.matrix.identity();
	cauda1.matrix.identity();
	cauda2.matrix.identity();
	estabilizador1.matrix.identity();
	profundor1.matrix.identity();
	estabilizador2.matrix.identity();
	profundor2.matrix.identity();
	estabilizador3.matrix.identity();
	leme.matrix.identity();

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Posiciona o aviao
	body.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	body.matrix.multiply(mat4.makeRotationY(degreesToRadians(180)));
	body.matrix.multiply(mat4.makeRotationZ(degreesToRadians(0)));
	body.matrix.multiply(mat4.makeTranslation(0,0,20));

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Faz Motor e Nariz do aviao
	faixa.matrix.multiply(mat4.makeTranslation(0,-24.8,2.4));
	escapamento1.matrix.multiply(mat4.makeTranslation(9.5, -27.5, 0.0));
	bordaescapamento1.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	bordaescapamento1.matrix.multiply(mat4.makeTranslation(0, 0, 5));
	tampaescapamento1.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	tampaescapamento1.matrix.multiply(mat4.makeTranslation(0, 0, 5.05));
	escapamento2.matrix.multiply(mat4.makeTranslation(-9.5, -27.5, 0.0));
	bordaescapamento2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	bordaescapamento2.matrix.multiply(mat4.makeTranslation(0, 0, 5));
	tampaescapamento2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	tampaescapamento2.matrix.multiply(mat4.makeTranslation(0, 0, 5.05));
	escapamento3.matrix.multiply(mat4.makeTranslation(0.0, -27.5, -9.5));
	bordaescapamento3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	bordaescapamento3.matrix.multiply(mat4.makeTranslation(0, 0, 5));
	tampaescapamento3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	tampaescapamento3.matrix.multiply(mat4.makeTranslation(0, 0, 5.05));
	basenose.matrix.multiply(mat4.makeTranslation(0.0, -38, 0.0));
	torus1.matrix.multiply(mat4.makeTranslation(0.0, 5, 0.0));
	torus1.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	torus2.matrix.multiply(mat4.makeTranslation(0.0, -5, 0.0));
	torus2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	circle.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	circle.matrix.multiply(mat4.makeTranslation(0, 0, 5.1));
	motor.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor1.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor1.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor2.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	gradeMotor2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor2.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor3.matrix.multiply(mat4.makeRotationY(degreesToRadians(-90)));
	gradeMotor3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor3.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor4.matrix.multiply(mat4.makeRotationY(degreesToRadians(180)));
	gradeMotor4.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor4.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor5.matrix.multiply(mat4.makeRotationY(degreesToRadians(45)));
	gradeMotor5.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor5.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor6.matrix.multiply(mat4.makeRotationY(degreesToRadians(-45)));
	gradeMotor6.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor6.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor7.matrix.multiply(mat4.makeRotationY(degreesToRadians(135)));
	gradeMotor7.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor7.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	gradeMotor8.matrix.multiply(mat4.makeRotationY(degreesToRadians(-135)));
	gradeMotor8.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	gradeMotor8.matrix.multiply(mat4.makeTranslation(0, -5, 0));
	turbina.matrix.multiply(mat4.makeTranslation(0.0, -3, 0.0));
	apoioHelice.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
	apoioHelice.matrix.multiply(mat4.makeTranslation(-0.5, 0, 0.0));
	basehelice1.matrix.multiply(mat4.makeTranslation(0, -4, 0.0));
	pahelice1.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
	pahelice1.matrix.multiply(mat4.makeRotationX(degreesToRadians(-15)));
	pahelice1.matrix.multiply(mat4.makeTranslation(-7, 0, 0));
	fita1.matrix.multiply(mat4.makeTranslation(-7.5, 0, 0.0));
	fita2.matrix.multiply(mat4.makeTranslation(-6.8, 0, 0.0));
	junta1.matrix.multiply(mat4.makeTranslation(7.9, 0, 0.385));
	junta1.matrix.multiply(mat4.makeRotationY(degreesToRadians(120)));
	junta2.matrix.multiply(mat4.makeTranslation(7.9, 0, -0.385));
	junta2.matrix.multiply(mat4.makeRotationY(degreesToRadians(-120)));
	basehelice2.matrix.multiply(mat4.makeTranslation(0, 4, 0.0));
	pahelice2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
	pahelice2.matrix.multiply(mat4.makeRotationX(degreesToRadians(15)));
	pahelice2.matrix.multiply(mat4.makeTranslation(7, 0, 0));
	fita12.matrix.multiply(mat4.makeTranslation(7.5, 0, 0.0));
	fita22.matrix.multiply(mat4.makeTranslation(6.8, 0, 0.0));
	junta12.matrix.multiply(mat4.makeTranslation(-7.9, 0, 0.385));
	junta12.matrix.multiply(mat4.makeRotationY(degreesToRadians(-120)));
	junta22.matrix.multiply(mat4.makeTranslation(-7.9, 0, -0.385));
	junta22.matrix.multiply(mat4.makeRotationY(degreesToRadians(120)));

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Faz Cabine do Piloto 11.7
	cabine.matrix.multiply(mat4.makeTranslation(0.0, 5.8, 8));
	cabine.matrix.multiply(mat4.makeRotationX(degreesToRadians(-2)))
	janela.matrix.multiply(mat4.makeTranslation(0.0, -18, 0));
	janela.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-90))); 
	janela2.matrix.multiply(mat4.makeTranslation(0.0, 18, 0));
	janela2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
	grade1.matrix.multiply(mat4.makeTranslation(0.0, -17.8, 0));
	grade1.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	grade2.matrix.multiply(mat4.makeTranslation(0.0, -6.3, 0));
	grade2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	grade3.matrix.multiply(mat4.makeTranslation(0.0, 5.4, 0));
	grade3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	grade4.matrix.multiply(mat4.makeTranslation(0.0, 17.5, 0));
	grade4.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	grade5.matrix.multiply(mat4.makeTranslation(3.5, 0, 3.5));
	grade6.matrix.multiply(mat4.makeTranslation(-3.5, 0, 3.5));
	grade7.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)));
	grade7.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-100)));
	grade7.matrix.multiply(mat4.makeTranslation(0, 0, 3.5));
	grade8.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)));
	grade8.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-100)));
	grade8.matrix.multiply(mat4.makeTranslation(0, 0, -3.5));
	grade9.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	grade9.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-20)));
	grade9.matrix.multiply(mat4.makeTranslation(0, 0, 3.5));
	grade10.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	grade10.matrix.multiply(mat4.makeTranslation(0, 0, -3.5));
	grade10.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-20)));
	// grade10.matrix.multiply(mat4.makeRotationY(degreesToRadians(-90)));
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Faz Asas
	baseAsa.matrix.multiply(mat4.makeTranslation(0, -4, -7.1));
	junta1Asa1.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	junta1Asa1.matrix.multiply(mat4.makeTranslation(0, 0, 22));
	junta2Asa1.matrix.multiply(mat4.makeTranslation(22, -19, 0));
	junta3Asa1.matrix.multiply(mat4.makeTranslation(22, 19, 0));
	asa1.matrix.multiply(mat4.makeTranslation(22, 18, 0));
	asa1.matrix.multiply(mat4.makeRotationY(degreesToRadians(-5)));
	aileron1.matrix.multiply(mat4.makeTranslation(35,-5, 0));
	junta1Asa2.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	junta1Asa2.matrix.multiply(mat4.makeTranslation(0, 0, -22));
	junta2Asa2.matrix.multiply(mat4.makeTranslation(-22, -19, 0));
	junta3Asa2.matrix.multiply(mat4.makeTranslation(-22, 19, 0));
	asa2.matrix.multiply(mat4.makeTranslation(-22, 18, 0));
	asa2.matrix.multiply(mat4.makeRotationY(degreesToRadians(5)));
	aileron2.matrix.multiply(mat4.makeTranslation(-70,-5, 0));

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Faz cauda do aviao
	cauda1.matrix.multiply(mat4.makeTranslation(0, 38, 0));
	cauda2.matrix.multiply(mat4.makeTranslation(0, 16.5, 0));

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	//Faz Estabilizadores
	estabilizador1.matrix.multiply(mat4.makeTranslation(0.5, 6, -1.5));
	estabilizador1.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	estabilizador1.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	profundor1.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	profundor1.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
	profundor1.matrix.multiply(mat4.makeTranslation(16.5, 0, 15.5));
	estabilizador2.matrix.multiply(mat4.makeTranslation(0.5, 6, 1.5));
	estabilizador2.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	estabilizador2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	profundor2.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	profundor2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
	profundor2.matrix.multiply(mat4.makeTranslation(16.5, 0, -15.5));
	estabilizador3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
	estabilizador3.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
	estabilizador3.matrix.multiply(mat4.makeTranslation(-5, -5, 0));
	leme.matrix.multiply(mat4.makeTranslation(23, 3.8, 0));
}

function movimentaAviao() {
	
	turbina.matrix.multiply(mat4.makeRotationY(degreesToRadians(speed))); //Rotação Turbina
	aileron1.matrix.multiply(mat4.makeRotationX(degreesToRadians(-angle1+valAntigo[0]))); //Animação Roll
	aileron2.matrix.multiply(mat4.makeRotationX(degreesToRadians(angle1-valAntigo[0]))); //Animação Roll
	leme.matrix.multiply(mat4.makeRotationY(degreesToRadians(angle1-valAntigo[0]))); //Animação Yaw
	profundor1.matrix.multiply(mat4.makeRotationZ(degreesToRadians(angle2-valAntigo[1]))); //Animação Pitch
	profundor2.matrix.multiply(mat4.makeRotationZ(degreesToRadians(angle2-valAntigo[1]))); //Animação Pitch
	body.matrix.multiply(mat4.makeRotationY(degreesToRadians(-angle3+valAntigo[2]))); //Roll
	planeHolder.matrix.multiply(mat4.makeRotationX(degreesToRadians(-angle4+valAntigo[3]))); //Pitch
	planeHolderHolder.matrix.multiply(mat4.makeRotationY(degreesToRadians(-angle3/30))); //Yaw
	planeHolderHolder.matrix.multiply(mat4.makeTranslation(0,(-speed * Math.sin(degreesToRadians(angle4))), (-speed * Math.cos(degreesToRadians(angle4))))); //Movimentação
	valAntigo[0] = angle1;
	valAntigo[1] = angle2;
	valAntigo[2] = angle3;
	valAntigo[3] = angle4;

}

function trocaCamera() {
	if (cameraPos) {
		speed = valTrocaCam[0];
		angle1 = valTrocaCam[1];
		angle2 = valTrocaCam[2];
		angle3 = valTrocaCam[3];
		angle4 = valTrocaCam[4];
		valAntigo[0] = valTrocaCam[5];
		valAntigo[1] = valTrocaCam[6];
		valAntigo[2] = valTrocaCam[7];
		valAntigo[3] = valTrocaCam[8];
	}
	else {
		valTrocaCam[0] = speed;
		valTrocaCam[1] = angle1;
		valTrocaCam[2] = angle2;
		valTrocaCam[3] = angle3;
		valTrocaCam[4] = angle4;
		valTrocaCam[5] = valAntigo[0];
		valTrocaCam[6] = valAntigo[1];
		valTrocaCam[7] = valAntigo[2];
		valTrocaCam[8] = valAntigo[3];
		speed = 0;
		angle1 = 0;
		angle2 = 0;
		angle3 = 0;
		angle4 = 0;
		valAntigo[0] = 0;
		valAntigo[1] = 0;
		valAntigo[2] = 0;
		valAntigo[3] = 0;
	}
}

function ligacircuito() {
	if(circuitoVisao)
		curveObject.visible = true;
	else 
		curveObject.visible = false;
}

function keyboardUpdate() {

	keyboard.update();

	if( keyboard.pressed("enter"))
	{
		circuitoVisao = !circuitoVisao;
		ligacircuito();
	}
	if( keyboard.down("space"))
	{
		cameraPos = !cameraPos;
		trocaCamera();
	}
	if(cameraPos) {
		if ( keyboard.pressed("Q") ) {
			speed+=0.1;
			if(speed > 50) 
				speed = 50;
		}
		if ( keyboard.pressed("A") ) {
			speed-=0.1;
			if(speed < 0) 
				speed = 0;
		}

		
		if ( keyboard.pressed("right") ) {
			angle1+=0.5;
			if(angle1 > 15) 
				angle1 = 15;
			angle3+=1;
			if (angle3 > 90)
				angle3 = 90;
		}
		else if ( keyboard.pressed("left") ) {
			angle1-=0.5;
			if(angle1 < -15) 
				angle1 = -15;
			angle3-=1;
			if (angle3 < -90)
				angle3 = -90;
		}
		else {
			if(angle1 > 0)
				angle1 -=0.25;
			else if (angle1 < 0)
				angle1+=0.25;
			if(angle3 > 0)
				angle3-=0.5;
			if(angle3 < 0)
				angle3+=0.5;
		}

		if ( keyboard.pressed("up") ) {
			angle2+=0.5;
			if(angle2 > 15)
				angle2 = 15;
			angle4+=1;
			if(angle4 >= 360)
				angle4 = 0;
		}
		else if ( keyboard.pressed("down") ) {
			angle2-=0.5;
			if(angle2 < -15) 
				angle2 = -15;
			angle4-=1;
			if(angle4 <= -360)
				angle4 = 0;
		}
		else {
			if(angle2 > 0)
				angle2-=0.5;
			else if (angle2 < 0)
				angle2+=0.5;
			if(angle4 > 0 && angle4 <= 180)
				angle4-=0.5;
			else if (angle4 > 180 && angle4 < 360)
				angle4+=0.5;
			if (angle4 >= 360)
				angle4 = 0;
			if(angle4 < 0 && angle4 >= -180)
				angle4+=0.5;
			else if (angle4 < -180 && angle4 > -360)
				angle4-=0.5;
			if (angle4 <= -360)
				angle4 = 0;
		}
	}
}


// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
render()

function render()
{
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  movimentaAviao();
  keyboardUpdate();
  requestAnimationFrame(render);
  if(cameraPos)
  	renderer.render(scene, camera) // Render scene
  else 
	renderer.render(scene2, camera2) // Render scene2
}