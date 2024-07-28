import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const app = document.querySelector("#app")
const { clientWidth, clientHeight } = app

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(clientWidth, clientHeight)
app.appendChild(renderer.domElement)
// 创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  clientWidth / clientHeight,
  0.01,
  10000
)
camera.position.set(3, 1, 3)
// 创建坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.autoRotate = true

// 创建元素
const elements = new THREE.SphereGeometry( 0.5, 50, 50 );
// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00a0ff,
  wireframe: true
})
// 创建网格
const geometry = new THREE.Mesh(elements, material)

// 在场景中添加网格，坐标辅助器
scene.add(geometry,axesHelper)

// 渲染
const animate = () => { 
  // 更新轨道控制器
  controls.update()
  geometry.rotation.x += 0.01
  geometry.rotation.y += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()





scene.add(geometry, camera)
// 创建元素
