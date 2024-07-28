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

/**************** 设置元素参数 ****************/
// 创建元素
const elements = new THREE.SphereGeometry(0.4, 20, 20);
const elementsChild = new THREE.BoxGeometry( 0.4, 0.4, 0.4 );
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
console.log(elementsChild);
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
// const tool = document.createElement("div")
// const btn = document.createElement("button")
// const btn1 = document.createElement("button")
// tool.className = "tool"
// btn.className = "button"
// btn1.className = "button"
// btn.textContent = "全屏预览"
// btn1.textContent = "退出全屏"
// app.appendChild(tool)
// tool.appendChild(btn)
// tool.appendChild(btn1)
// // 全屏
// btn.addEventListener("click", () => { 
//   // renderer.domElement.requestFullscreen()
//   app.requestFullscreen()
  
// })
// // 退出全屏
// btn1.addEventListener("click", () => { 
//   document.exitFullscreen()
  
// })

/**************** 使用gui属性管理工具 ****************/
const eventObj = {
  Fullscreen: () => { 
    renderer.domElement.requestFullscreen()
  },
  exitFullscreen: () => { 
    document.exitFullscreen()
  }
}

const gui = new GUI()
gui.add(eventObj, "Fullscreen").name("全屏")
gui.add(eventObj, "exitFullscreen").name("退出全屏")
// 添加元素的位置参数
// gui.add(geometryChild.position, "x").name("x")
// gui.add(geometryChild.position, "y").min(-10).max(10).step(0.05).name("y")
// gui.add(geometryChild.position, "z", -5, 8).name("z")
const folder = gui.addFolder("设置元素位置")
folder
  .add(geometryChild.position, "x")
  .name("x")
  .onChange((val) => { 
    console.log("x轴变化量",val); // val变化时触发
  })
folder
  .add(geometryChild.position, "y")
  .min(-10)
  .max(10)
  .step(0.05)
  .name("y")
  .onFinishChange((val) => { 
    console.log("x轴变化量",val); // val变化后触发
  })
folder.add(geometryChild.position, "z", -5, 8).name("z")
//
gui.add(materialChild, "wireframe").name("线框")

// 颜色
const colorParams = {
  elementsChild: "#00ff00"
}
gui
  .addColor(colorParams, "elementsChild")
  .name("颜色")
  .onChange((val) => { 
    geometryChild.material.color.set(val)
  })