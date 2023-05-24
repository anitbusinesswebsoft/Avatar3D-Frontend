import React, { useState, useEffect } from 'react'
import { ImageList, ImageListItem } from "@mui/material"
import axios from "axios"
import "./AvatarShirt.css"
import cap from "../assets/cap-nft.svg"

export default function SubCategoryList(props) {
    const [selectedCategoryList, setSelectedCategoryList] = useState([]);
    // console.log("out ",props);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/category/getsubcategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parentCategoryId: props.listId
            })
        })
            .then(response => response.json())
            .then(data => (setSelectedCategoryList(data.results.filter(value => value.categoryName.includes(props.bodyType.charAt(0).toUpperCase() + props.bodyType.slice(1))))))
            .catch(error => console.error(error));

    }, [props.listId]);

    let totalRows = Math.min(Math.ceil(selectedCategoryList.length / 3), 5)

    return (
        <>
            {/* <ImageList sx={{ width: 400, height: totalRows * 200 }} cols={3} rowHeight={150}>
                {selectedCategoryList.map((item) => (
                    <ImageListItem key={item._id} onClick={() => (props.setShirt(item))}>
                        <img
                            src={item.gblGuid !== "null" ?
                                `${import.meta.env.VITE_API_URL}/fileinfo/${item.categoryGuid}?w=164&h=164&fit=crop&auto=format`
                                : "https://upflockdigitalconference.readyplayer.me/assets/empty_icon.svg"}

                            srcSet={item.gblGuid !== "null" ?
                                `${import.meta.env.VITE_API_URL}/fileinfo/${item.categoryGuid}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`
                                : "https://upflockdigitalconference.readyplayer.me/assets/empty_icon.svg"}
                            alt={item.categoryGuid}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))} 
            </ImageList> */}

            <div className="col-5 p-3 py-0">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-cap" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <div className="row my-2">
                            {selectedCategoryList.map((item,i) => (
                                <div key={i} className="col-4 mb-3" onClick={() => (props.setShirt(item))}>
                                    <div className="border border-info border-2 rounded">
                                        <img className="img-fluid my-3 p-2"
                                            src={item.gblGuid !== "null" ?
                                                `${import.meta.env.VITE_API_URL}/fileinfo/${item.categoryGuid}`
                                                : "https://upflockdigitalconference.readyplayer.me/assets/empty_icon.svg"}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
