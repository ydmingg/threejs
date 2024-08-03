import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 导入draoc解压缩解析器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


// renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const scene = new THREE.Scene()
// scene.background = new THREE.Color("#666")
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)



/*************** 边缘几何体和线框几何体 ******************/
const gltfLoader = new GLTFLoader()
// 加载draoc压缩过的模型
const dracoLoader = new DRACOLoader() // 实例化draoc解压缩器
dracoLoader.setDecoderPath('./draco/')
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load('../static/models/pistol.glb', (gltf) => { 
  // scene.add(gltf.scene)
  // 获取几何体
  const building = gltf.scene.getObjectByName("Scene")
  
  

  // 遍历所有的场景
  // for (let i = 0; i < building.children.length; i++) {
  //   const element = building.children[i];
  //   const geometry = element.geometry
  //   if (element) {
  //     // //获取边缘geometry几何体
  //     // const edgesGeometry = new THREE.EdgesGeometry(geometry)
  //     // // 创建线段材质
  //     // const edgesMaterial = new THREE.LineBasicMaterial({
  //     //   color:"red"
  //     // })
      
  //     // 创建线框edgesGeometry几何体
  //     const edgesGeometry = new THREE.WireframeGeometry(geometry)
  //     // 创建线段材质
  //     const edgesMaterial = new THREE.LineBasicMaterial({
  //       color:"red"
  //     })





  //     // 创建线段
  //     const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
  // 更新物体的世界矩阵
  // building.updateMatrixWorld(true, true)
  //     // 更新当前物体的变换矩阵
  //     edges.matrix.copy(element.matrixWorld)
  //     // 同步位置缩放旋转属性
  //     edges.matrix.decompose(edges.position, edges.quaternion, edges.scale)
     
  //     // 添加到场景
  //     scene.add(edges)
  //   }
    
  // }
  
  // 遍历所有的子场景物体
  gltf.scene.traverse((child) => { 
    if (child.isMesh) {
      const geometry = child.geometry
      // 创建边缘几何体
      const edgesGeometry = new THREE.EdgesGeometry(geometry)
      // 创建材质
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: "green"
      })
      // 创建线段
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
      // 更新物体的世界矩阵
      child.updateMatrixWorld(true, true)
      // 更新当前物体的变换矩阵
      edges.matrix.copy(child.matrixWorld)
      // 同步位置缩放旋转属性
      edges.matrix.decompose(edges.position, edges.quaternion, edges.scale)
      // 添加到场景
      scene.add(edges)



    }





  })
  
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
