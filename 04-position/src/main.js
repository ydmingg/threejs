import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 导入lil.gui 属性参数管理工具
import GUI from 'lil-gui'


/**************** 设置基础参数 ****************/
const app = document.querySelector("#app")
const { clientWidth, clientHeight } = app
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
camera.position.set(1, 0.5, 3)
// 创建坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
// controls.autoRotate = true


/**************** 设置元素材质参数 ****************/ 
const elementGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material1 = new THREE.MeshBasicMaterial({ color: "DarkRed" })
const material2 = new THREE.MeshBasicMaterial({ color: "FireBrick" })
const material3 = new THREE.MeshBasicMaterial({ color: "Crimson" })
const material4 = new THREE.MeshBasicMaterial({ color: "IndianRed" })
const material5 = new THREE.MeshBasicMaterial({ color: "LightCoral" })
const material6 = new THREE.MeshBasicMaterial({ color: "DarkSalmon"})
// 创建网格 
const geometry = new THREE.Mesh(elementGeometry, [
  material1,
  material2,
  material3,
  material4,
  material5,
  material6
])
console.log(geometry);
// 在场景中添加网格，坐标辅助器
scene.add(geometry, camera)
scene.add(geometry, axesHelper)

/**************** 设置渲染参数 ****************/
const animate = () => { 
  // 更新轨道控制器
  // controls.update()
  // geometry.rotation.x += 0.01
  // geometry.rotation.y += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()

/**************** 设置自适应窗口参数 ****************/
window.addEventListener('resize', () => { 
  // 重置窗口宽高
  const { clientWidth, clientHeight } = app
  // 重置渲染器宽高比
  renderer.setSize(clientWidth, clientHeight)
  // 重置相机宽高比
  camera.aspect = clientWidth / clientHeight
  // 重置相机投影矩阵
  camera.updateProjectionMatrix()

})
