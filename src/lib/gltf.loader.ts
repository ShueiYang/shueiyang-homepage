import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export function loadGLTFModel (
  scene: THREE.Scene,
  glbPath: string,
  loadProgress: (progress: number) => void,
  options = { receiveShadow: true, castShadow: true }
): Promise<THREE.Object3D> {
  
const { receiveShadow, castShadow } = options

  return new Promise((resolve, reject) => {
    // use loadingManager to show the progress bar
    const loadingManager = new THREE.LoadingManager();
    const gltfLoader = new GLTFLoader(loadingManager);
   
    // Set up the loadProgress callback
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const currentProgress = (itemsLoaded / itemsTotal) * 100;
      loadProgress(currentProgress);
    }

    gltfLoader.load(
      glbPath,
      gltf => {
        const obj = gltf.scene
        obj.name = 'candleStick'
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        gltf.scene.scale.multiplyScalar(100);
        const box = new THREE.Box3().setFromObject(obj);
        const center = new THREE.Vector3();
        box.getCenter(center);
        obj.position.sub(center); //center the model
        scene.add(obj) // add the model to the scene
        
        obj.traverse(node => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = castShadow
            node.receiveShadow = receiveShadow
          }
        })
        resolve(obj)
      },
      undefined,
      function (error) {
        reject(error)
      }
    )
  })
}