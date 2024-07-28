import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const app = document.querySelector("#app")
const { clientWidth, clientHeight } = app

/**************** 设置基础参数 ****************/
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
// controls.autoRotate = true

/**************** 设置元素参数 ****************/
// 创建元素
const elements = new THREE.SphereGeometry(0.5, 50, 50);
const elementsChild = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00a0ff,
  wireframe: true
})
const materialChild = new THREE.MeshBasicMaterial({
  color: 0xF0a0ff,
  wireframe: true
})
// 创建网格
const geometry = new THREE.Mesh(elements, material)
geometry.position.set(1, 0, 0)
// geometry.scale.set(0.5, 0.5, 0.5)
const geometryChild = new THREE.Mesh(elementsChild, materialChild)
geometry.add(geometryChild)
geometryChild.position.set(-1, 0, 0) // 位置（三维）
geometryChild.scale.set(0.5, 0.5, 0.5) // 缩放（三维）
geometryChild.rotation.x = Math.PI / 4 // 旋转（弧度）
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
window.addEventListener('resize', (event) => { 
  // 重置窗口宽高
  const { clientWidth, clientHeight } = app
  // 重置渲染器宽高比
  renderer.setSize(clientWidth, clientHeight)
  // 重置相机宽高比
  camera.aspect = clientWidth / clientHeight
  // 重置相机投影矩阵
  camera.updateProjectionMatrix()
})

/**************** 设置自定义事件参数 ****************/
const tool = document.createElement("div")
const btn = document.createElement("button")
const btn1 = document.createElement("button")
tool.className = "tool"
btn.className = "button"
btn1.className = "button"
btn.textContent = "全屏预览"
btn1.textContent = "退出全屏"
app.appendChild(tool)
tool.appendChild(btn)
tool.appendChild(btn1)
// 全屏
btn.addEventListener("click", () => { 
  // renderer.domElement.requestFullscreen()
  app.requestFullscreen()
  
})
// 退出全屏
btn1.addEventListener("click", () => { 
  document.exitFullscreen()
  
})