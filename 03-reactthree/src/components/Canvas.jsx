import * as THREE from "three";
import { useRef, useEffect } from 'react';
// import { Component, createRef } from 'react';

// 函数式组件
function Canvas() {
    // 获取元素
    const oCanvas = useRef(null)
    
    useEffect(() => {
        const { innerWidth, innerHeight } = window
        // 创建渲染
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(innerWidth, innerHeight)
        // 将画布放入dom
        oCanvas.current.appendChild(renderer.domElement)

        // 创建场景
        const scene = new THREE.Scene();
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            60,
            innerWidth / innerHeight,
            0.1,
            1200
        )
        camera.position.set(0, 0, 3)

        // 创建元素
        const geometry = new THREE.SphereGeometry( 1, 20, 12 )
        // 创建材质
        const material = new THREE.MeshBasicMaterial({
            color: "red",
            wireframe: true
        })
        // 创建网格
        const capsule = new THREE.Mesh(geometry, material)
        // 将网格添加到场景
        scene.add(capsule)
        
        // 动画
        const animate = () => {
            capsule.rotation.x += 0.01
            capsule.rotation.y += 0.01
            // 渲染
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        animate()
        
    })

    return (
        <div id="canvas" ref={oCanvas}></div>
    )
}




// 类组件
// class Canvas extends Component { 
//     constructor() { 
//         super();
//         this.oCanvas = createRef()
//     }
//     render() { 
//         return (
//             <div id="canvas" ref={this.oCanvas}></div>
//         )
//     }
//     getDom() { 
//         console.log(this.oCanvas.current);
//     }

//     // 挂载
//     componentDidMount() { 
//         const { innerWidth, innerHeight } = window
//         // 创建渲染
//         const renderer = new THREE.WebGLRenderer()
//         renderer.setSize(innerWidth, innerHeight)
//         // 将画布放入dom
//         console.log(this.oCanvas.current);

//         this.oCanvas.current.appendChild(renderer.domElement)

//         // 创建场景
//         const scene = new THREE.Scene();
//         // 创建相机
//         const camera = new THREE.PerspectiveCamera(
//             60,
//             innerWidth / innerHeight,
//             0.1,
//             1200
//         )
//         camera.position.set(0, 0, 3)

//         // 创建元素
//         const geometry = new THREE.SphereGeometry( 1, 20, 12 )
//         // 创建材质
//         const material = new THREE.MeshBasicMaterial({
//             color: "red",
//             wireframe: true
//         })
//         // 创建网格
//         const capsule = new THREE.Mesh(geometry, material)
//         // 将网格添加到场景
//         scene.add(capsule)
        
//         // 动画
//         const animate = () => {
//             capsule.rotation.x += 0.01
//             capsule.rotation.y += 0.01
//             // 渲染
//             renderer.render(scene, camera)
//             requestAnimationFrame(animate)
//         }

//         animate()
//     }
// }





export default Canvas
