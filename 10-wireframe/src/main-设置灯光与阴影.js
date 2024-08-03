import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 导入draoc解压缩解析器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// renderer
const renderer = new THREE.WebGLRenderer()
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const scene = new THREE.Scene()
// scene.background = new THREE.Color("#666")
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)


// 灯光与阴影
// 1.材质要满足对照光照有反应
// 2.设置渲染器开启阴影的计算： renderer.shadowMap.enabled = true
// 3.设置光照投射阴影：directionalLight.castShadow = true
// 4.设置物体投射阴影：sphere.castShadow = true
// 5.设置物体接受阴影：plane.receiveShadow = true
/*************** 设置灯光与阴影 ******************/
// 添加一个基础球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// 添加标准材质球
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
//投射阴影
sphere.castShadow = true
scene.add(sphere)


// 创建平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 接收阴影
plane.receiveShadow = true
// 接收阴影
scene.add(plane)




// 设置环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(10, 10, 10)
directionalLight.castShadow = true
scene.add(directionalLight)






/*************** 创建hdr贴图 ******************/
// const rgbLoader = new RGBELoader()
// rgbLoader.load("../static/texture/metro_noord_1k.hdr", (envMap) => {
//   //设置球形贴图
//   envMap.mapping = THREE.EquirectangularReflectionMapping
//   // 设置环境贴图
//   scene.environment = envMap
//   scene.background = envMap
//   // pMaterial.envMap = envMap
//   // gMaterial.envMap = envMap
// })

/*************** 渲染 ******************/
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const orbitControls = new OrbitControls(camera, renderer.domElement)
function animate() {
  requestAnimationFrame(animate)
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()
