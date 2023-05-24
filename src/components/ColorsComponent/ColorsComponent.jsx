import React from 'react'
import "./ColorsComponent.css"

export default function ColorsComponent(props) {

    return (
        <>
            {/* <div className="relative btn_style" style={{ width: "200px" }} >
                {props.isColorComponenet ? <div className="gap-4 lg:gap-4 grid grid-cols-2 py-4 px-3 lg:p-4 btnostyle" style={{ width: "100%" }} >
                    {
                        props.allColors.map((color, index) => (
                            <button key={index}
                                type="button"
                                className="w-8 h-8 xl:w-12 xl:h-12 rounded-full focus:outline-none z-0 relative rang"
                                onClick={() => props.setBodyColor(color)}
                                style={{ backgroundColor: color }}
                            />
                        ))
                    }
                </div> : ""}
            </div> */}
            <div className="col-2 p-3 d-flex align-items-center">
                {props.isColorComponenet &&
                    <div className="row">
                        {props.allColors.map((color, index) => (
                            <div className="col-6 mb-2 p-0" key={index} >
                                <button className="btn1" style={{ verticalAlign: "middle", backgroundColor: color }}
                                />
                            </div>
                        ))}

                    </div>
                }
            </div>
        </>
    )
}
