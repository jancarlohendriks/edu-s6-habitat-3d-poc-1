import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene() // SCENE
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

// RENDERER
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// controls.enableZoom = false

// LOADER
let model
const loader = new GLTFLoader()
loader.load(
	'models/model-4.glb',
	function (gltf) {
		model = gltf.scene
		scene.add(gltf.scene)
	},
	(xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
	(error) => console.log(error)
)

// RENDER
function render() { renderer.render(scene, camera) }

// ANIMATE
function animate() {
	requestAnimationFrame(animate)
	render()
	stats.update()
}
animate()

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
	render()
}