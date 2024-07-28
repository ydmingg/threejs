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

// /**************** 创建平面元素参数 ****************/
// // 创建缓冲区几何体
// const elementGeometry = new THREE.BufferGeometry();
// // 创建顶点数据
// const vertices = new Float32Array([
//   0, 0, 0,
//   0, 0.5, 0,
//   0, 0, 0.5,
// ])
// // 创建顶点属性，顶点有序，三个为一个顶点，逆时针为正面
// const verticesAttr = new THREE.BufferAttribute(vertices, 3)
// // 设置顶点属性
// elementGeometry.setAttribute("position", verticesAttr)

/**************** 创建立体元素参数（至少三个面） ****************/
// 创建缓冲区几何体
const elementGeometry = new THREE.BufferGeometry();
// ---->使用默认方法创建顶点
// // 创建顶点数据
// const vertices = new Float32Array([
//   0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
//   0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 1.0, 0.0, 0.0,
  
// ])
// // 创建顶点属性，顶点有序，三个为一个顶点，逆时针为正面
// const verticesAttr = new THREE.BufferAttribute(vertices, 3)
// // 设置顶点属性
// elementGeometry.setAttribute("position", verticesAttr)
// ---->使用索引方法创建顶点
const vertices = new Float32Array([
  0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
  // 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 1.0, 0.0, 0.0,
  0.0, -0.5, 1.0,
])
// 创建顶点属性，顶点有序，三个为一个顶点，逆时针为正面
const verticesAttr = new THREE.BufferAttribute(vertices, 3)
// 设置顶点属性
elementGeometry.setAttribute("position", verticesAttr)
// 创建索引(0,1,2,3代表顶点序号，一定记着构成元素时逆时针为正面)
const indices = new Uint16Array([
  0, 1, 2, 2, 3, 0
])
// 设置索引属性
const indicesAttr = new THREE.BufferAttribute(indices, 1)
elementGeometry.setIndex(indicesAttr)



/**************** 设置元素材质参数 ****************/
const material = new THREE.MeshBasicMaterial({
  color: "yellow",
  // wireframe: true,
  side: THREE.DoubleSide
})
// 创建网格
const geometry = new THREE.Mesh(elementGeometry, material)
// geometry.position.set(0, 0, 0)
// geometry.scale.set(0.5, 0.5, 0.5)
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
