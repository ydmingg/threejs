<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

// 创建场景
const scene = new THREE.Scene()
const { innerWidth, innerHeight } = window
const oCanvas = ref(null)

onMounted(()=>{
    init();
})
console.log(oCanvas);
function init() {
    // 创建相机并设置位置
    const camera = new THREE.PerspectiveCamera(
        60,
        innerWidth / innerHeight,
        0.1,
        1500
    )
    camera.position.set(0, 0, 3)
    // 创建渲染器并设置大小并挂载
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(innerWidth, innerHeight)
    oCanvas.value.appendChild(renderer.domElement)

    // 创建元素
    const geometry = new THREE.CapsuleGeometry(0.5, 0.5, 4, 8)
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, // 颜色
        wireframe: true // 线框渲染
    })
    // 创建网格，并将元素和材质嵌入
    const capsule = new THREE.Mesh(geometry, material)
    // 将网格添加到场景中
    scene.add(capsule)
    // 渲染
    const animate = () => { 
        capsule.rotation.x += 0.01
        capsule.rotation.y += 0.01
        // 渲染
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }
    animate();
}






</script>

<template>
    <div id="canvas-box" ref="oCanvas"></div>

</template>