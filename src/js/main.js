import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import model from '@/models/model-13.glb?url'

var camera, mixer, action
var animationScroll = 0;

// const gridHelper = new THREE.GridHelper(10, 10);
const stats = Stats()
document.body.appendChild(stats.dom)

var scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5)) // AXES HELPER
// scene.add( gridHelper );

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const title = document.getElementById('title')

// // CAMERA
// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000)
// camera.position.z = 2

// // CONTROLS
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const raycaster = new THREE.Raycaster()
const sceneMeshes = []
var intersectedObject;

const loader = new GLTFLoader()
loader.load(
	model,
	function (gltf) {
		const plane = gltf.scene.children.find(x => x.name == "Cube")
		const path = gltf.scene.children.find(x => x.name == "NurbsPath")

		gltf.scene.traverse(function (child) {
			if ((child).isMesh && child.name.startsWith('Cube')) {
				sceneMeshes.push(child)
			}
	})
		
		camera = gltf.cameras[0]

		const pointLight = new THREE.PointLight()
		pointLight.position.set(2.5, 7.5, 15)

		const ambientLight = new THREE.AmbientLight()
		ambientLight.position.set(2.5, 7.5, 15)
		
		const clip = THREE.AnimationClip.findByName( gltf.animations, 'Action' )
		mixer = new THREE.AnimationMixer(camera)
		action = mixer.clipAction(clip)
		action.play()

		scene.add(gltf.scene, ambientLight, pointLight)
		renderer.render(scene, camera)
	},
	(xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
	(error) => console.log(error)
)

renderer.domElement.addEventListener('mousemove', onMouseMove, false)
function onMouseMove(event) {
	const mouse = {
			x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
			y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
	}
	
	raycaster.setFromCamera(mouse, camera)
	
	const intersects = raycaster.intersectObjects(sceneMeshes, false)
	if(intersects[0]?.object?.name) {
		title.innerText = intersects[0]?.object?.name
		intersects[0]?.object?.material.color.set( 0xffffff );
	}
}

function animate() {
	requestAnimationFrame(animate)
	if (mixer) {
		// mixer.update(clock.getDelta())
		mixer.setTime(animationScroll)
	}
	if (camera) renderer.render(scene, camera)
	stats.update()
}
animate()

// UPDATE ON RESIZE
window.addEventListener('resize', onWindowResize, false)
window.addEventListener('load', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.render(scene, camera)
}

window.addEventListener('wheel', onScroll, false)
function onScroll(e) {
	if (animationScroll > 0.1 && e.deltaY < 0) animationScroll = animationScroll - 0.1
	if (animationScroll < 4.1 && e.deltaY > 0) animationScroll = animationScroll + 0.1
}