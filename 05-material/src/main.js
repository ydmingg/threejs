import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 导入hdr加载器(环境贴图)
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement) 
// 添加辅助坐标
const axesHelper = new THREE.AxesHelper(5)
// 添加轨道控制器
const orbitControls = new OrbitControls(camera, renderer.domElement)

orbitControls.enableDamping = true
orbitControls.dampingFactor = 0.05
camera.position.z = 5


/******************** 贴图和环境遮蔽贴图强度 *********************/
const gui = new GUI()
const url1 = "../static/texture/watercover/1K-abstract_colorglass-specular.jpg"
const url2 = "../static/texture/watercover/1K-abstract_colorglass-ao.jpg"
const url3 = "../static/texture/watercover/1K-abstract_colorglass-diffuse.jpg"
const url4 = "../static/texture/watercover/1K-abstract_colorglass-normal.jpg"
const url5 = "../static/texture/symmetrical_garden_02_8k.hdr"
// 创建纹理加载器
const TextureLoader = new THREE.TextureLoader().load(url1)
// 加载纹理
// const texture = TextureLoader
// const texture = TextureLoader.load(require())
// 创建ao贴图
const aoTexture = new THREE.TextureLoader().load(url2)
// 创建透明度贴图
const alphaTexture = new THREE.TextureLoader().load(url3)
// 创建光照贴图
const lightTexture = new THREE.TextureLoader().load(url4)
// 创建环境贴图
const rgbLoader = new RGBELoader().load(url5, (envTexture) => { 
    scene.background = envTexture
    // 设置球形映射
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    // 设置场景的环境贴图
    scene.environment = envTexture
    // 设置平面材质的环境贴图
    planeMaterial.envTexture = envTexture
    
    

    
})




// 创建平面几何体
const planeGeometry = new THREE.PlaneGeometry(2, 2)
let planeMaterial = new THREE.MeshBasicMaterial({
    color: "#f0f0f0",
    // 设置纹理
    map: TextureLoader,
    transparent: true, 
    // 设置ao贴图
    aoMap: aoTexture,
    aoMapIntensity: 1,
    // 设置透明度贴图
    alphaMap: alphaTexture,
    lightMap: lightTexture,
    
})
const cube = new THREE.Mesh(planeGeometry, planeMaterial)


// 设置gui
gui.add(planeMaterial, "aoMapIntensity")
    .min(0)
    .max(1)
    .name("ao贴图强度");






/******************** 渲染 *********************/
scene.add(cube, axesHelper)
function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
}

window.addEventListener('resize', () => { 
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

animate()
