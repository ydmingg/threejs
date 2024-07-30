import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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


const colors = ["red", "blue", "green"]
// 创建三个球
const createSphere = (color, positionX) => { 
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshMatcapMaterial({ color });
  const sphere = new THREE.Mesh(geometry, material)
  sphere.position.x = positionX
  return sphere;
}

const spheres = [
  createSphere(colors[0], -3),
  createSphere(colors[1], 0),
  createSphere(colors[2], 3)
];

// 渲染小球
spheres.forEach(sphere => scene.add(sphere))
  
// 创建射线
const raycaster = new THREE.Raycaster()
// 创建鼠标向量
const mouse = new THREE.Vector2()


function changeColor(intersects, spheres, defaultColors) { 
  if (intersects.length > 0) {
    intersects[0].object.material.color.set("black")
  } else { 
    spheres.forEach((sphere, index) => sphere.material.color.set(defaultColors[index]));
  }
}

// 例：输入移入时变黑色，移出时恢复
window.addEventListener('mousemove', (event) => { 
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(spheres)
  
  // 
  changeColor(intersects, spheres, colors)
  
})
window.addEventListener('mouseout', (event) => { 
  // 鼠标移出时恢复颜色
  spheres.forEach((sphere, index) => sphere.material.color.set(colors[index]))
})





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
}
animate()

