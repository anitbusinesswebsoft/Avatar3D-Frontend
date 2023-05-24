import {useState} from 'react';
import { Button, Stack } from '@mui/material';
import CategoryTable from "../components/categoryTable/Form"
import CharactersTable from "../components/charactersTable/CharactersForm"

const AdminSection = () => {
    const [isCategory, setIsCategory] = useState(true)
    const [isCharactrs, setIsCharactrs] = useState(false)

    return (
        <>
            <Stack direction={"row"} spacing={3} >
                <Button variant='text' onClick={()=>(setIsCategory(true), setIsCharactrs(false))} >Category</Button>
                <Button variant='text' onClick={()=>(setIsCategory(false), setIsCharactrs(true))} >Character</Button>
            </Stack>
            { isCategory && <CategoryTable/>}
            {isCharactrs && <CharactersTable/>}
        </>
    )
}

export default AdminSection