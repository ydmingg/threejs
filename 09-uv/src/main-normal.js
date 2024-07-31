import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';

// renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const scene = new THREE.Scene()
// scene.background = new THREE.Color("#666")
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5



/*************** uv贴图 ******************/
// 创建uv贴图
const uvTexture = new THREE.TextureLoader().load('../static/texture/trianglify-lowres.png')
const pMaterial = new THREE.MeshBasicMaterial({
  map: uvTexture
})
// 创建平面几何体
const pGeometry = new THREE.PlaneGeometry(2, 2)
const pMesh = new THREE.Mesh(pGeometry ,pMaterial)
scene.add(pMesh) 
pMesh.position.x = -3





/*************** 创建顶点几何体 ******************/
const gGeometry = new THREE.BufferGeometry()
// 创建顶点数据
const vertices = new Float32Array([
  -1.0, -1.0, 0.0,1.0, -1.0, 0.0,1.0, 1.0, 0.0,-1.0,1.0,0.0
])
// 设置顶点属性
gGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
//创建索引（顶点序号）
const indices = new Uint32Array([0,1,2,2,3,0])
// 创建索引属性
gGeometry.setIndex(new THREE.BufferAttribute(indices, 1))
// 设置顶点材质
const gMaterial = new THREE.MeshBasicMaterial({
  map: uvTexture
})
const gMesh = new THREE.Mesh(gGeometry, gMaterial)
// const gMesh = new THREE.Mesh(gGeometry, pMaterial) // 设置同一个材质也无法反射
scene.add(gMesh)
gMesh.position.x = 3
// 创建uv坐标
const uv = new Float32Array([
  0,0,1,0,1,1,0,1
])
// 设置uv属性
gGeometry.setAttribute("uv",new THREE.BufferAttribute(uv,2)) // 2个一组的坐标
console.log(pGeometry,gGeometry);

// 手动计算顶点几何体的法线向量
// gGeometry.computeVertexNormals()

// 设置法向量（方法二）
const normals = new Float32Array([
  0,0,1,0,0,1,0,0,1,0,0,1 //正面
])
gGeometry.computeVertexNormals()

// 创建法向量辅助器
const helper = new VertexNormalsHelper(gMesh,0.2,"red",1)
scene.add(helper)












/*************** 创建hdr贴图 ******************/
const rgbLoader = new RGBELoader()
rgbLoader.load("../static/texture/metro_noord_1k.hdr", (envMap) => {
  //设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping
  // 设置环境贴图
  scene.environment = envMap
  scene.background = envMap
  pMaterial.envMap = envMap
  gMaterial.envMap = envMap
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
