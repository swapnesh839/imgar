import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import "./App.css"
import glbfile from "./asset.glb"

const Mindarviewer = () => {
  const sceneref = useRef(null);

  useEffect(() => {
    const scene1 = sceneref.current;
    const arSystem = scene1?.systems['mindar-image-system'];
    // console.log(arSystem.start());
    
    if (arSystem) {
      scene1.addEventListener('renderstart', () => {
        arSystem.start();
      });
    }
    // if (navigator.xr) {
    //   navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
    //     if (supported) {
    //       // Start the XR session with 'bounded-floor' if available
    //       navigator.xr.requestSession('immersive-vr', { requiredFeatures: ['bounded-floor'] })
    //         .then(
    //           console.log("onSessionStarted")              
    //         )
    //         .catch((err) => {
    //           console.warn('Bounded floor not supported, falling back:', err);
    //           // Fallback to other session or feature
    //         });
    //     }
    //   });
    // }

    return () => {
      if (arSystem) {
        arSystem.stop();
      }
    };
  }, []);

  return (
    <a-scene 
      ref={sceneref}  
      id="mainScene"
      mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.mind; uiLoading: no; uiError: no; uiScanning: no;" 
      color-space="sRGB" 
      embedded 
      renderer="colorManagement: true, physicallyCorrectLights" 
      vr-mode-ui="enabled: false" 
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        {/* <img id="card" alt="srcimg" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.0/examples/image-tracking/assets/card-example/card.png" /> */}
        <a-asset-item id="glbfile"
         src={glbfile}
        // src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/softmind/scene.gltf"
         ></a-asset-item>
      </a-assets>

      <a-camera position="0 3 3" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        {/* <a-plane 
          src="#card" 
          position="0 0 0" 
          height="0.552" 
          width="1" 
          rotation="0 0 0"
        ></a-plane> */}
        <a-gltf-model 
          rotation="0 0 0" 
          position="0 0 0" 
          scale=".3,.3,.3" 
          src="#glbfile" 
          animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>
      </a-entity>
    </a-scene>
  );
};

export default Mindarviewer;
