import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
//引入加载器
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// 导入draoc解压缩解析器
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add()

// 添加辅助坐标系
const axesHelper = new THREE.AxesHelper(5)
// 添加轨道器
const orbitControls = new OrbitControls(camera, renderer.domElement)

camera.position.z = 5
scene.background = new THREE.Color("#666")
scene.add(axesHelper)
 
// 实例化加载器
const gltfLoader = new GLTFLoader()
// 加载没有压缩的模型
const glb = "../static/models/Box.glb"
gltfLoader.load(glb, (model) => { 
  console.log(model);
  scene.add(model.scene)
})


const glb2 = "../static/models/BoxVertexColors.glb"
// 加载draoc压缩过的模型
const dracoLoader = new DRACOLoader() // 实例化draoc解压缩器
dracoLoader.setDecoderPath('../static/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(glb2, (model) => { 
  scene.add(model.scene)
})




// 加载环境贴图
const rgbLoader = new RGBELoader()
rgbLoader.load('../static/texture/metro_noord_1k.hdr', (envMap) => { 
  envMap.mapping = THREE.EquirectangularReflectionMapping
  // 设置环境贴图
  scene.environment = envMap
})






function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    renderer.render(scene, camera)
}
animate()

