import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Box, Stack, Typography, ImageList, ImageListItem, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { selectedCharacter, isLoading, bodyType } from "../features/counter/counterSlice"

import { useNavigate } from "react-router-dom"
const ChooseCharacter = () => {
    const [allCharacters, setAllCharacters] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const characterType = useSelector((state) => state.character.value)
    const characterTypee = useSelector((state) => state.character)


    // console.log("characterType ", characterType, characterTypee);
    // useSelector(state=>console.log(state.character))
    const getCharacters = async () => {
        const data = await axios.post(`${import.meta.env.VITE_API_URL}/character/`, { characterType })
        setAllCharacters(data.data.data)
    }
    // console.log("allCharacters", allCharacters);

    useEffect(() => {
        console.log("-----------------***-------------------");
        getCharacters()
    }, [characterType])

    return (
        <Box display='flex' justifyContent='center' alignItems='center' >
            {/* {characterType && <Stack> */}
            {<Stack>
                <Button onClick={() => dispatch(bodyType(""))} >Back</Button>
                <Typography variant="h4">Pick an Avatar</Typography>
                <Typography variant="body2">You'll be able to customize it later</Typography>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {allCharacters.map((character) => (
                        <ImageListItem key={character._id} onClick={() => (dispatch(selectedCharacter(character)),
                            dispatch(isLoading(true)),
                            dispatch(bodyType("")),
                            navigate("/canvas"))}
                        >
                            <img
                                src={`${import.meta.env.VITE_API_URL}/character/fileinfo/${character.characterGuid}`}
                                srcSet={`${import.meta.env.VITE_API_URL}/character/fileinfo/${character.characterGuid}`}
                                alt={character.characterName}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Stack>}
        </Box>
    )
}

export default ChooseCharacter