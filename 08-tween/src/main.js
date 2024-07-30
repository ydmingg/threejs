import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 导入补间动画
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
// renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 场景
const scene = new THREE.Scene()
scene.background = new THREE.Color("#666")

// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// 创建小球
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshMatcapMaterial({color: "red"})
)
sphere.position.x = -4
scene.add(sphere);


// 实例化补间动画
const tween = new TWEEN.Tween(sphere.position)
  .to({ x: 4 }, 1000)
  .easing(TWEEN.Easing.Quadratic.InOut)
  // .repeat(Infinity) // 循环 （number时为次数）
  // .yoyo(true) // 循环往复
  // .delay(1000) // 延迟
  .start() // 启动动画
  .onStart(() => {
    console.log("开始")
  })
  .onComplete(() => {
    console.log("结束")
  })
  .onStop(() => {
    console.log("停止")
  })
  .onUpdate(() => {
    console.log("更新")
  });


  

// 第二次运动
const tween2 = new TWEEN.Tween(sphere.position)
  // .to({ y: -4 }, 1000)
  .to({ x: -4 }, 1000)
  .onUpdate(() => {});

  

//
tween.chain(tween2)
tween2.chain(tween)

// 添加辅助坐标系
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 添加轨道器
const orbitControls = new OrbitControls(camera, renderer.domElement)

// 渲染
function animate() {
  requestAnimationFrame(animate)
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  renderer.render(scene, camera)
  
  // 更新补间动画
  TWEEN.update()

}
animate()


const params = { 
  stop: () => { 
    tween.stop();
  }
}
// 设置停止gui
const gui = new GUI()
gui.add(params, "stop").name("停止运动")
