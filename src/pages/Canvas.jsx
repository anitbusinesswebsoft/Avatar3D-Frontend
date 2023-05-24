// import React, { Suspense, useState, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei'
// import "./canvas.css"
// import { useSelector, useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import Loader from '../components/loaders/Loader';
// import Character from '../components/character/Character';
// import { Box } from '@mui/material';
// import ColorsComponent from '../components/ColorsComponent/ColorsComponent';
// import SubCategoryList from '../components/SubCategoryList';
// import Hair from "../components/character/Hair"
// import { bodyType } from '../features/counter/counterSlice';
// import DynamicShirt from '../components/character/DynamicShirt';
// const MyCanvas = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const isLoading = useSelector((state) => state.character.isLoading)
//     const bodyType = useSelector((state) => state.character.bodyType)
//     const selectedCharacter = useSelector((state) => state.character.characterValue)

//     // console.log("selectedCharacter", selectedCharacter);

//     useEffect(() => {
//         if (!selectedCharacter) {
//             navigate("/")
//         }
//     }, [selectedCharacter])


//     const [bodyColor, setBodyColor] = useState("rgb(225, 69, 0)")
//     const [shirt, setShirt] = useState([null, '1683528029682Hair.glb', '1683194255450Shirt_0.glb', '1682919305061Glasses.glb', '1683548305476Pant_0.glb'])

//     const [selectedCategory, setSelectedCategory] = useState("")
//     const [parentCategories, setParentCategories] = useState([]);
//     const [isColorComponenet, setisColorComponenet] = useState(false)
//     let [keyy, setkeyy] = useState(0)

//     useEffect(() => {
//         fetch(`${import.meta.env.VITE_API_URL}/category/getparentcategories`)
//             .then(response => response.json())
//             .then(data => setParentCategories(data.results))
//             .catch(error => console.error(error));
//     }, []);
//     const myVar = {
//         hairFile: shirt[1],
//         shirtFile: shirt[2],
//         glassesFile: shirt[3],
//         pantFile: shirt[4]
//     }

//     const mynewFn = (value) => {
//         for (let i = 0; i < parentCategories.length; i++) {
//             if (value.parentCategoryId === parentCategories[i]._id) {
//                 setShirt((arr) => {
//                     arr[i] = value.gblGuid
//                     return arr
//                 })
//                 setkeyy(keyy++)
//             } else if (shirt[i] === undefined) {
//                 setShirt((arr) => {
//                     arr[i] = null
//                     return arr
//                 })
//             }
//         }
//         setkeyy(keyy++)
//     }

//     return (
//         <div className='flex' style={{ height: "100vh", width: "100%" }} >

//             {<ColorsComponent allColors={selectedCategory.colorCode} isColorComponenet={isColorComponenet} setBodyColor={setBodyColor} />}

//             {isLoading &&
//                 <Box display='flex' justifyContent='center' alignItems='center' >
//                     <Loader />
//                 </Box>
//             }
//             <Canvas
//                 camera={{ position: [0, 0, 12.25], fov: 15 }}
//             >
//                 <ambientLight intensity={1.5} />
//                 <ambientLight intensity={0.1} />
//                 <directionalLight intensity={0.4} />


//                 <Suspense fallback={null}>
//                     <Character characterName={selectedCharacter.gblGuid} loadingValue={false} />
//                     {/* {!shirt[1] || shirt[1] === "null" || bodyType==="Female" ? "" : <Hair bodyColor={bodyColor} />} */}
//                     {selectedCharacter.characterType === 'Female' &&
//                         <>
//                             <DynamicShirt shirtName={shirt[2]} scale={[1.1, 1.01, 1.3]} position={[.024, -.85, .04]} />
//                             <DynamicShirt shirtName={shirt[4]} scale={[1.01, 1.01, 1.08]} position={[.024, -.88, .026]} />
//                             {/* <DynamicShirt shirtName={shirt[2]} scale={[1.1, 1.0, 1.2]} position={[.024, -.89, .04]} />
//                             <DynamicShirt shirtName={shirt[4]} scale={[1.0, 1.0, 1.02]} position={[.024, -.88, .026]} /> */}
//                         </>
//                     }
//                     {selectedCharacter.characterType === 'Male' &&
//                         <>
//                             <DynamicShirt shirtName={shirt[2]} scale={[1.01, 1.01, 1.08]} position={[0.025, -0.9, 0.03]} />
//                             <DynamicShirt shirtName={shirt[4]} scale={[1.1, 1, 1.2]} position={[0.025, -0.87, 0.03]} />
//                         </>
//                     }
//                     {/* <DynamicShirt shirtName={shirt[5]} scale={[1, 1, 1]} position={[.024, -.89, .025]} /> */}
//                     <DynamicShirt shirtName={shirt[5]} scale={[1, 1, 1.2]} position={[.024, -.89, .025]} />
//                 </Suspense>

//                 <OrbitControls
//                     minPolarAngle={1}
//                     maxPolarAngle={2}
//                 />
//             </Canvas>

//             <div className="display: flex">
//                 <div className='main_sidebar'>
//                     <div className="pointer-events-auto grid grid-cols-1 img_sidebar">
//                         {
//                             parentCategories.map((parentCategory) => (
//                                 <button key={parentCategory._id} type="button" className="btn_img"
//                                     onClick={() => (setSelectedCategory(parentCategory), setisColorComponenet(parentCategory.isColorAvailable))} >
//                                     <div className="relative" >
//                                         <img className="btn_img_div" src={`${import.meta.env.VITE_API_URL}/fileinfo/${parentCategory.categoryGuid}`} />
//                                     </div>
//                                 </button>
//                             ))
//                         }
//                     </div>
//                 </div>

//                 <SubCategoryList listId={selectedCategory._id} setShirt={mynewFn} bodyType={selectedCharacter.characterType} />
//             </div>
//         </div >
//     )
// }

// export default MyCanvas
import React from 'react'

const Canvas = () => {
  return (
    <div>Canvas</div>
  )
}

export default Canvas