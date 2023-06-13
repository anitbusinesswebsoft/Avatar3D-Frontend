import React, { Suspense, useState, useEffect } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import SubCategoryList from '../../components/SubCategoryList';
import ColorsComponent from '../../components/ColorsComponent/ColorsComponent';
import DynamicShirt from '../../components/character/DynamicShirt';
import Character from '../../components/character/Character';
import { body, assetmental, bgImg, avtar, capNft, cap, coin, nfts, pent, polygon, shades, shoes, tabbg, tshirt, vip } from "../../assets/img/index"
import "./avtarcss.css"
const parentCategoriess = [
    {
        _id: "646dc370dc82ede383b3ae85",
        categoryName: "Cap",
        parentCategoryId: null,
        isColorAvailable: true,
        categoryGuid: cap,
        colorCode: [
            "#000000",
            "#7e3619",
            "#6d5454",
            "#A0866B",
            "#e19e83",
            "#e1a891",
            "#efa282",
            "#d9b5a6"
        ]
    },
    {
        _id: "646dda9adc82ede383b3b237",
        categoryName: "Glasses",
        isColorAvailable: false,
        categoryGuid: shades,
    },
    {
        _id: "646ddab4dc82ede383b3b23f",
        categoryName: "TShirt",
        isColorAvailable: false,
        categoryGuid: tshirt,
    },
    {
        _id: "646ddad2dc82ede383b3b24f",
        categoryName: "Pent",
        isColorAvailable: false,
        categoryGuid: pent,
    },
    {
        _id: "646ddadedc82ede383b3b259",
        categoryName: "Shoes",
        isColorAvailable: false,
        categoryGuid: shoes,
    },
    {
        _id: "646ddaf5dc82ede383b3b264",
        categoryName: "Body",
        isColorAvailable: false,
        categoryGuid: body,
    },
    {
        _id: "646ddb2adc82ede383b3b270",
        categoryName: "NFTs",
        isColorAvailable: false,
        categoryGuid: nfts,
    }
]

const NewCanvas = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector((state) => state.character.isLoading)
    const bodyType = useSelector((state) => state.character.bodyType)
    const selectedCharacter = useSelector((state) => state.character.characterValue)

    const [bodyColor, setBodyColor] = useState("rgb(225, 69, 0)")
    const [shirt, setShirt] = useState([null, '1683528029682Hair.glb', '1683194255450Shirt_0.glb', '1682919305061Glasses.glb', '1683548305476Pant_0.glb'])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [parentCategories, setParentCategories] = useState([]);
    const [isColorComponenet, setisColorComponenet] = useState(false)
    let [keyy, setkeyy] = useState(0)


    useEffect(() => {
        if (!selectedCharacter) {
            navigate("/")
        }
    }, [selectedCharacter])
    const mynewFn = (value) => {
        console.log("new fn ", value);
        for (let i = 0; i < parentCategoriess.length; i++) {
            if (value.parentCategoryId === parentCategoriess[i]._id) {
                setShirt((arr) => {
                    arr[i] = value.gblGuid
                    return arr
                })
                setkeyy(keyy++)
            } else if (shirt[i] === undefined) {
                setShirt((arr) => {
                    arr[i] = null
                    return arr
                })
            }
        }
        setkeyy(keyy++)
    }

    return (
        <div className="container-fluid html">
            <div className="row">
                <div className="col-4">
                    <Canvas
                        camera={{ position: [0, 0, 12.25], fov: 15 }}
                    >
                        <ambientLight intensity={1.5} />
                        <ambientLight intensity={0.1} />
                        <directionalLight intensity={0.4} />

                        <Suspense fallback={null}>
                            <Character characterName={selectedCharacter.gblGuid} loadingValue={false} />
                            {selectedCharacter.characterType === 'Female' &&
                                <>
                                    <DynamicShirt shirtName={shirt[2]} scale={[1.1, 1.012, 1.3]} position={[.024, -.85, .04]} />
                                    <DynamicShirt shirtName={shirt[3]} scale={[1.01, 1.03, 1.09]} position={[.024, -.88, .026]} />
                                </>
                            }
                            {selectedCharacter.characterType === 'Male' &&
                                <>
                                    <DynamicShirt shirtName={shirt[2]} position={[0.025, -0.9, 0]}/>
                                    <DynamicShirt shirtName={shirt[3]} position={[0.025, -0.9, 0]}/>
                                    {/* <DynamicShirt shirtName={shirt[2]} scale={[1.02, 1.04, 1.1]} position={[0.025, -0.945, 0.03]} /> */}
                                    {/* <DynamicShirt shirtName={shirt[3]} scale={[1.1, 1, 1.2]} position={[0.025, -0.87, 0.03]} /> */}
                                </>
                            }
                            <DynamicShirt shirtName={shirt[4]} scale={[1, 1, 1.2]} position={[.024, -.89, .025]} />
                        </Suspense>

                        <OrbitControls
                            minPolarAngle={1}
                            maxPolarAngle={2}
                        />
                    </Canvas>
                </div>

                <ColorsComponent allColors={selectedCategory.colorCode} isColorComponenet={isColorComponenet} />

                <div className="col-1 p-0 tabbg text-center">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        {
                            parentCategoriess.map((parentCategory) => (
                                <button key={parentCategory._id} className="nav-link" id="v-pills-cap-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cap"
                                    type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"
                                    onClick={() => (setSelectedCategory(parentCategory), setisColorComponenet(parentCategory.isColorAvailable))}>
                                    <img src={parentCategory.categoryGuid} className="img-fluid" />
                                </button>
                            ))
                        }
                    </div>
                </div>
                <SubCategoryList listId={selectedCategory._id} setShirt={mynewFn} bodyType={selectedCharacter.characterType} />
            </div>
        </div>
    )
}

export default NewCanvas