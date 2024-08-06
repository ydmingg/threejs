<template>
<div 
style="
    position: fixed;
    top:0;
    left: 0;
    z-index: 10;
    pointer-events: none;
    transition: all 1s;
    "
    :style = "{
        transform: `translate3d(0, ${-index * 100}vh, 0)`
    }"
>
    <div 
    v-for="item in scenes" 
    style="
        width: 100vw;
        height: 100vh;
        color: white;
    "
    >
        <h1 style="padding: 40px;">{{item.text}}</h1>
    </div>
</div>
  
</template>


<script setup>
import * as THREE from 'three'
import gsap from 'gsap'
// 引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// 加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 解压器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// 环境纹理(hdr)加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
//
import { ref } from 'vue';


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
    antialias: true,

})
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到页面
document.body.appendChild(renderer.domElement)

//设置色调映射与亮度
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.1
// 允许阴影
renderer.shadowMap.enabled = true
// 设置物理的光照效果
renderer.physicallyCorrectLights = true

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置阻尼
controls.enableDamping = true
// 自定义控制器位置
controls.target.set(-8,2,0)

// 初始化解压模型
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('../../11-app/static/draco/')
// 初始化加载模型
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader) 


// 加载环境纹理
const rgbeLoader = new RGBELoader()
rgbeLoader.load('../../11-app/static/texture/metro_noord_1k.hdr', (texture) => { 
    //设置球形环境纹理
    texture.mapping = THREE.EquirectangularReflectionMapping

    scene.background = texture
    // 设置物体贴图
    scene.environment = texture

})



// 开始加载模型
gltfLoader.load('../../11-app/static/models/pistol.glb', (gltf) => { 
    const module = gltf.scene
    module.traverse(child => {
        //遍历场景中的所有的元素
        // console.log(child);
        
        if (child.name === "Empty001") {
            child.visible = false
            
        }
        if (child.isMesh) {
            // 判断是否是物体，是就投射和接收阴影
            child.castShadow = true
            child.receiveShadow = true
        }
    });
    scene.add(module)
})


//添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 50, 0)
scene.add(light)

// 添加点光源
const pointLight = new THREE.PointLight("green", 40)
pointLight.position.set(0, -0.6, 0) 
// 设置投射阴影
pointLight.castShadow = true
scene.add(pointLight)

// 创建点光源集合
const pointLightGroup = new THREE.Group()
pointLightGroup.position.set(0,2,0)
const pointLightArr = []
let radius = 3
for (let i = 0; i < 4; i++) {
    // 创建球当光源
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        emissive: "white",
        emissiveIntensity: 10
    })

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    pointLightArr.push(sphere)
    sphere.position.set(
        radius * Math.cos((i * 2 * Math.PI) / 1),
        Math.cos((i * 2 * Math.PI) / 3),
        radius * Math.sin(i * 2 * Math.PI / 3)
    )
    
    const pointLight = new THREE.PointLight("white", 80)
    sphere.add(pointLight)
    pointLightGroup.add(sphere)
    
}
scene.add(pointLightGroup)


// 使用补件函数从0-2p，使球旋转
const options = {
    angle:0
}

gsap.to(options, {
    angle: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: "linear",
    onUpdate: () => { 
        pointLightGroup.rotation.y = options.angle;
        pointLightArr.forEach((item, index) => { 
            item.position.set(
                radius * Math.cos((index * 2 * Math.PI) / 3),
                Math.cos((index * 2 * Math.PI) / 3 + options.angle*5),
                radius * Math.sin(index * 2 * Math.PI / 3)
            )
        })
    }
})







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


//使用补间动画移动相机
const timeLine1 = gsap.timeline()
const timeLine2 = gsap.timeline()
// 定义相机移动的函数
const translateCamera = (position,target) => { 
    timeLine1.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 1,
        ease: "power2.inOut",

    });

    timeLine2.to(controls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1,
        ease: "power2.inOut",

    });

}


///
// 设置对象用来存储数组
const scenes = [
    {
        text: "首页",
        callback: () => { 
            //执行函数切换的位置
            translateCamera(
                new THREE.Vector3(-3, 3, 4),
                new THREE.Vector3(-8,2,0)
            )
        }
    },
    {
        text: "介绍页001",
        callback: () => { 
            //执行函数切换的位置
            translateCamera(
                new THREE.Vector3(7, 3, 23),
                new THREE.Vector3(0,0,0)
            )
        }
    },
    {
        text: "介绍页002",
        callback: () => { 
            //执行函数切换的位置
            translateCamera(
                new THREE.Vector3(10, 3, 0),
                new THREE.Vector3(5,2,0)
            )
        }
    },
    {
        text: "结尾",
        callback: () => { 
            //执行函数切换的位置
            translateCamera(
                new THREE.Vector3(0, 3, 0),
                new THREE.Vector3(0,0,0)
            )
        }
    },
]

// 记录
const index = ref(0)
//
let isAnimate = false
// 监听事件
window.addEventListener('wheel', (e) => { 
    console.log(e.deltaY);
    
    if (isAnimate) return;
    isAnimate = true
    if (e.deltaY > 0) {
        index.value++
        if (index.value > scenes.length - 1) {
            index.value = scenes.length - 1
        }
    } else { 
        index.value--
        if (index.value < 0) {
            index.value = 0
        }
    }

    scenes[index.value].callback()
    setTimeout(() => { isAnimate = false },1000)
},false)


</script>