import React, { useState, useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function DynamicShirt(props) {
    const [model, setModel] = useState({});

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load(`${import.meta.env.VITE_API_URL}/fileinfo/${props.shirtName }`, gltf => {
            setModel(gltf.scene);
        });
    }, [props.shirtName]);

    // console.log(props);

    return <primitive object={model} position={props.position} scale={props.scale} color={props.bodyColor} />
}
