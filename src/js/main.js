import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

var camera, mixer, action

let animationScroll = 0;

const gridHelper = new THREE.GridHelper(10, 10);
const stats = Stats()
document.body.appendChild(stats.dom)

var scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5)) // AXES HELPER
scene.add( gridHelper );

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader()
loader.load(
	'models/model-7.glb',
	function (gltf) {
		const plane = gltf.scene.children.find(x => x.name == "Plane002")
		
		camera = gltf.cameras[0]
		camera.setFocalLength(3)

		const pointLight = new THREE.PointLight()
		pointLight.position.set(2.5, 7.5, 15)
		scene.add(pointLight)

		const ambientLight = new THREE.AmbientLight()
		ambientLight.position.set(2.5, 7.5, 15)
		
		const clip = THREE.AnimationClip.findByName( gltf.animations, 'Action' )
		mixer = new THREE.AnimationMixer(camera)		
		action = mixer.clipAction(clip)
		action.play()
		// gui.add(camera.position, 'z', 0, 10)

		scene.add(gltf.scene, ambientLight)
		renderer.render(scene, camera)
	},
	(xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
	(error) => console.log(error)
)

function animate() {
	requestAnimationFrame(animate)
	console.log(animationScroll)
	// const controls = new OrbitControls(camera, renderer.domElement)
	if (mixer) {
		// mixer.update(clock.getDelta())
		mixer.setTime(animationScroll)
		// mixer.update(i)
		// console.log(camera.rotation.y)
		// camera.rotation.set(90,90,0)
	}
	if (camera) renderer.render(scene, camera)
	stats.update()
}
animate()

window.addEventListener('wheel', onScroll, false)
function onScroll(e) {
	if (animationScroll > 0.1 && e.deltaY < 0) animationScroll = animationScroll - 0.1
	if (animationScroll < 4.1 && e.deltaY > 0) animationScroll = animationScroll + 0.1
}