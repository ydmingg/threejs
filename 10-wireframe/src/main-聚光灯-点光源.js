import * as THREE from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 导入draoc解压缩解析器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


const gui = new GUI()

// renderer
const renderer = new THREE.WebGLRenderer()
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true

// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 使用软阴影
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const scene = new THREE.Scene()
// scene.background = new THREE.Color("#666")
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)

/*************** 聚光灯 ******************/
// 添加一个基础球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// 添加标准材质球
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
//投射阴影
sphere.castShadow = true
scene.add(sphere)


// 创建平面
const planeGeometry = new THREE.PlaneGeometry(50, 50)
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

// 点光源
const spotLight = new THREE.SpotLight(0xffffff, 80)
spotLight.position.set(5, 5, 5)
spotLight.castShadow = true




//设置阴影贴图的模糊度
spotLight.shadow.radius = 20
//设置阴影分辨率
spotLight.shadow.mapSize.set(1024, 4096)
spotLight.target = sphere
spotLight.angle = Math.PI / 6
spotLight.distance = 0
spotLight.penumbra = 0
spotLight.decay = 0

// 设置透视相机的属性


scene.add(spotLight);


gui.add(sphere.position, 'x').min(-5).max(5).step(0.1);
gui.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01);
gui.add(spotLight, 'distance').min(0).max(10).step(0.01);
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.01);
gui.add(spotLight, 'decay').min(0).max(5).step(0.01);





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



