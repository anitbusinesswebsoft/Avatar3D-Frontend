import React, { useState, useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { isLoading } from '../../features/counter/counterSlice';
import { useDispatch } from 'react-redux';

const Character = (props) => {
    const [model, setModel] = useState({});
    const dispatch = useDispatch()

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load(`${import.meta.env.VITE_API_URL}/character/fileinfo/${props.characterName}`, gltf => {
            setModel(gltf.scene);
            dispatch(isLoading(props.loadingValue))
        });     
    }, [props.characterName]);
    return <primitive object={model} position={[.024, -.9, 0]} />
}

export default Character