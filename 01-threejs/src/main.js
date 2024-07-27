import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 挂载渲染器到dom
const app = document.querySelector("#app")
app.appendChild(renderer.domElement)


// 创建元素（立方体）
const geometry = new THREE.BoxGeometry(0.5, 0.5, 1)
 
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: "red" })

// 创建网格
const cube = new THREE.Mesh(geometry, material)

// 将网格添加到场景中
scene.add(cube)

// 设置相机的位置
camera.position.z = 3
camera.lookAt(0, 0, 0) // 默认

// 定义渲染函数
function animate() { 
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    // 渲染
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

animate()


