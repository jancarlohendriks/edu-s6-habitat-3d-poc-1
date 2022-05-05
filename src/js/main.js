import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as dat from 'dat.gui'

const scene = new THREE.Scene() // SCENE
const gui = new dat.GUI() // GUI
scene.add(new THREE.AxesHelper(5)) // AXES HELPER
const stats = Stats() // STATS
document.body.appendChild(stats.dom)

// LIGTH
const pointLight = new THREE.PointLight()
pointLight.position.set(2.5, 7.5, 15)
scene.add(pointLight)
const ambientLight = new THREE.AmbientLight()
ambientLight.position.set(2.5, 7.5, 15)
scene.add(ambientLight)

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000)
camera.position.z = 2
gui.add(camera.position, 'z').min(-5).max(10)

// RENDERER
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// controls.enableZoom = false

// LOADER
let model, sceneCamera, clip, mixer
const loader = new GLTFLoader()
loader.load(
	'models/model-4.glb',
	function (gltf) {
		model = gltf.scene
		sceneCamera = gltf.cameras[0]
		clip = THREE.AnimationClip.findByName( gltf.animations, 'Action' )  //get the animation name by console.log(gltf.animations)
		mixer = new THREE.AnimationMixer(sceneCamera)
		const action = mixer.clipAction(clip)
		action.play()
		scene.add(gltf.scene)
	},
	(xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
	(error) => console.log(error)
)

// CLOCK
const clock = new THREE.Clock()
let previousTime = 0

// RENDER
function render() { renderer.render(scene, camera) }

// ANIMATE
function animate() {
	requestAnimationFrame(animate)
	// controls.update()
	render()
	stats.update()
	// camera.updateProjectionMatrix()
	// console.log(camera.position.z)

	const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
	// console.log(deltaTime)
	// mixer.update(deltaTime / 1000)
	// if(mixer !== null){
	// }

	//Don't forget to render with the blender camera
	if(model !== null){
		// renderer.render(scene, sceneCamera)
		// sceneCamera.updateProjectionMatrix()
	}
}
animate()

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	render()
}

let i = 0;
window.addEventListener('wheel', onScroll, false)
function onScroll(e) {
	if (i > 0 && e.deltaY < 0) i--
	if (i < 100 && e.deltaY > 0) i++
	// console.log(i)
}