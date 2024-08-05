<template>
asdfasdfsdf
  
</template>


<script setup>
import * as THREE from 'three'
import gasp from 'gsap'
// 引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// 加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 解压器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// 环境纹理(hdr)加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// 初始化场景
const scene = new THREE.Scene()
// 初始化相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1200
)
// 设置相机位置
camera.position.set(-3.23, 2.98, 4.06)
// 更新相机的投影矩阵
camera.updateProjectionMatrix()
// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
    // 设置狂锯齿
    antialias: true
})
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到页面
document.body.appendChild(renderer.domElement)

//设置色调映射与亮度
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.5

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置阻尼
controls.enableDamping = true

// 初始化解压模型
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('../static/draco/')
// 初始化加载模型
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader) 


// 加载环境纹理
const rgbeLoader = new RGBELoader()
rgbeLoader.load('../static/texture/metro_noord_1k.hdr', (texture) => { 
    //设置球形环境纹理
    texture.mapping = THREE.EquirectangularReflectionMapping

    scene.background = texture
    // 设置物体贴图
    scene.environment = texture

})



// 开始加载模型
gltfLoader.load('../static/models/AlphaBlendModeTest.glb', (gltf) => { 
    const module = gltf.scene
    scene.add(module)



})









//添加平行光
const light = new THREE.DirectionalLight(0xffffff, 10)
light.position.set(0, 50, 0)
scene.add(light)

// 动画
const animate = () => {
    // 启动动画帧
    requestAnimationFrame(animate)
    
    // 渲染
    renderer.render(scene, camera)
    // 更新控制器
    controls.update()


}

animate()




</script>