"use client"

import * as THREE from "three"
import { useState, useEffect, useRef, useCallback } from "react"
import { WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { loadGLTFModel } from "@/lib/gltf.loader"
import { easeOutCirc } from "@/utils/utility"
import SceneContainer from "./SceneContainer"
import CandleStickLoader from "./CandleStick.Loader" 

  
function ChineseCandleStick () {
    const refContainer = useRef<HTMLDivElement>(null);
    const refRenderer = useRef<WebGLRenderer | null>(null);
    const glbFilePath = "/candleStick.glb"

    const [loading, setLoading] = useState(true);

    const handleWindowResize = useCallback(() => {
        const container = refContainer.current;
        const renderer = refRenderer.current;
        if (container && renderer) {
            const scW = container.clientWidth
            const scH = container.clientHeight
            renderer.setSize(scW, scH)
        }
    }, [])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const container = refContainer.current;
        if (container) {
            const scW = container.clientWidth
            const scH = container.clientHeight

            // SCENE
            const scene = new THREE.Scene();
            
            const target = new THREE.Vector3(0, 1, 0)
            const initialCameraPosition = new THREE.Vector3(
                20 * Math.sin(0.2 * Math.PI),
                10,
                20 * Math.cos(0.2 * Math.PI)
            )
            // CAMERA
            const scale = scH * 0.015 + 8.8
            const camera = new THREE.OrthographicCamera(
                -scale,
                scale,
                scale,
                -scale,
                0.01,
                1000
            );
            camera.position.copy(initialCameraPosition)
            camera.lookAt(target)
            
            // make a plane to display shadow
            const planeGeometry = new THREE.PlaneGeometry(512, 512, 32, 32);
            const planeMaterial = new THREE.ShadowMaterial()
            planeMaterial.opacity = 0.3;
            const plane = new THREE.Mesh( planeGeometry, planeMaterial );
            plane.rotateX(-Math.PI / 2);
            plane.receiveShadow = true;
            
            // const axesHelper = new THREE.AxesHelper( 20 );
            // scene.add( axesHelper );
                      
            const spotLight1 = new THREE.SpotLight(0xffeeb1, 4)
            spotLight1.castShadow = true;
            spotLight1.shadow.bias = -0.0001
            spotLight1.shadow.camera.near = 0.5;
            spotLight1.shadow.camera.far = 500;
            spotLight1.shadow.camera.fov = 25;
            spotLight1.shadow.mapSize.width = 1024*4;
            spotLight1.shadow.mapSize.height = 1024*4;
            scene.add(spotLight1) 
              
            const spotLight2 = new THREE.SpotLight(0xffffff, 3, 0, Math.PI/4);
            spotLight2.position.set(-15, 5, 5);
            scene.add(spotLight2);
            
            const ambientLight = new THREE.AmbientLight(0xffffff,0.3)
            scene.add(ambientLight)

            // RENDERER
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            })
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(scW, scH)
            renderer.outputEncoding = THREE.sRGBEncoding
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            renderer.toneMappingExposure = 0.5
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                                 
            container.appendChild(renderer.domElement)
            refRenderer.current = renderer
            
            // for Post-processing but finally I won"t use for this project not worth the ressource cost
            // const composer = new EffectComposer(renderer);
            // composer.addPass(new RenderPass(scene, camera));
            // composer.addPass(new SSAARenderPass(scene, camera, 0x202020));
            // composer.addPass(new AdaptiveToneMappingPass());
        
            // CONTROLS
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.autoRotate = true
            controls.target = target
      
            // Load 3D Model from custom lib
            loadGLTFModel(scene, glbFilePath, {
                receiveShadow: true,
                castShadow: true
            }).then((candleStick) => {
                candleStick.position.y +=2;
                candleStick.position.z +=2;
                //set the shadow plane to match the model floor
                const boundingBox = new THREE.Box3().setFromObject(candleStick);
                const modelBottom = boundingBox.min.y;
                plane.position.y = modelBottom;
                scene.add(plane);
                // call the function once loadGLTFModel return the Promise
                animate();
                setLoading(false)
            })

            // Render & animate the scene with a custom spin at start
            let req: number | null = null
            let frame = 0
            
            const animate = () => {
                req = requestAnimationFrame(animate)

                frame = frame <= 100 ? frame + 1 : frame
                if (frame <= 100) {
                    const p = initialCameraPosition
                    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
                    camera.position.y = 10
                    camera.position.x =
                        p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
                    camera.position.z =
                        p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
                    camera.lookAt(target)
                } else {
                    controls.update()
                }
                spotLight1.position.set(
                    camera.position.x + 10,
                    camera.position.y + 20,
                    camera.position.z + 10,
                )
                renderer.render(scene, camera);
                // composer.render();
            }
            return () => {
                if (req !== null) {
                  cancelAnimationFrame(req)  
                }
                renderer.domElement.remove()
                renderer.dispose()
                // composer.reset()
                // composer.dispose();
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize, false)
        return () => {
            window.removeEventListener("resize", handleWindowResize, false)
        }
    }, [handleWindowResize])

    return (
        <SceneContainer ref={refContainer}>
            { loading && <CandleStickLoader /> }
        </SceneContainer>
    )
}
  
export default ChineseCandleStick;