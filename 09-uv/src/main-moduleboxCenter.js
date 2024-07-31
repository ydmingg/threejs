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


/*************** 包围盒和世界矩阵转换 ******************/
// 实例化加载器
const gltfLoader = new GLTFLoader()
// 加载没有压缩的模型
gltfLoader.load("../static/models/Duck.glb", (model) => { 
  scene.add(model.scene)

  // 通过名字获取物体
  const duckMesh = model.scene.getObjectByName("LOD3spShape")
  //获取物体的几何体 
  const duckGeometry = duckMesh.geometry
  // 计算包围盒
  duckGeometry.computeBoundingBox()

  // 设置物体居中
  duckGeometry.center();




  // 获取duck包围盒
  const duckBox = duckGeometry.boundingBox
  console.log(duckBox);
  // 更新世界矩阵
  duckMesh.updateWorldMatrix(true, true)
  // 更新包围盒
  duckBox.applyMatrix4(duckMesh.matrixWorld)

  //获取包围盒中心点
  const center = duckBox.getCenter(new THREE.Vector3()) // 传入三维向量
  console.log(center);



  // 创建包围盒辅助器
  const boxHelper = new THREE.Box3Helper(duckBox, "red")
  //在场景中添加
  scene.add(boxHelper)



  // 获取包围球
  const duckSphere = duckMesh.geometry.boundingSphere
  // 更新世界矩阵
  duckSphere.applyMatrix4(duckMesh.matrixWorld)
  // 创建包围球几何体
  // const sphere = new THREE.Sphere(duckSphere.center, duckSphere.radius)
  const sphereGeometry = new THREE.SphereGeometry(duckSphere.radius, 16, 16)
  // 创建包围球材质
  const sphereGeometryMaterial = new THREE.MeshBasicMaterial({
    color: "yellow",
    wireframe: true
  })
  const sphereGeometryMesh = new THREE.Mesh(sphereGeometry, sphereGeometryMaterial)
  // 设置包围球的位置
  sphereGeometryMesh.position.copy(duckSphere.center)
  // 在场景中添加
  scene.add(sphereGeometryMesh)

})



















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
