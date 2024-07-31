import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const scene = new THREE.Scene()
// scene.background = new THREE.Color("#666")
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)


const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshMatcapMaterial({ color: "red" })
)
sphere1.position.x = -3
scene.add(sphere1)

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshMatcapMaterial({ color: "green" })
)
sphere2.position.x = 0
scene.add(sphere2)

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshMatcapMaterial({ color: "yellow" })
)
sphere3.position.x = 3
scene.add(sphere3)



/*************** 获取多个物体的包围盒 ******************/
// 创建包围盒
const box = new THREE.Box3()
const arrSphere = [sphere1, sphere2, sphere3,]
for (let i = 0; i < arrSphere.length; i++) {
  // // 获取当前物体的包围盒
  // arrSphere[i].geometry.computeBoundingBox()
  // // 获取包围盒
  // const box3 = arrSphere[i].geometry.boundingBox
  // // 更新包围盒
  // arrSphere[i].updateWorldMatrix(true, true)
  // // 将包围盒转换到世界坐标系
  // box3.applyMatrix4(arrSphere[i].matrixWorld)
  // 第二种方式
  const box3 = new THREE.Box3().setFromObject(arrSphere[i])


  //合并包围盒
  box.union(box3)
}

// 创建包围盒辅助器
const boxHelper = new THREE.Box3Helper(box, "blue")
scene.add(boxHelper)
















/*************** 创建hdr贴图 ******************/
const rgbLoader = new RGBELoader()
rgbLoader.load("../static/texture/metro_noord_1k.hdr", (envMap) => {
  //设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping
  // 设置环境贴图
  scene.environment = envMap
  scene.background = envMap
  // pMaterial.envMap = envMap
  // gMaterial.envMap = envMap
})

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
