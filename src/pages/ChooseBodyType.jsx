import { Box, Stack, Typography, Button } from '@mui/material';
// import { Button } from '@mui/material';
import ChooseCharacter from './ChooseCharacter';
import { useSelector, useDispatch } from "react-redux"
import { bodyType, selectedCharacter } from "../features/counter/counterSlice"


const ChooseBodyType = () => {
    const dispatch = useDispatch()
    const characterType = useSelector((state) => state.character.value)

    return (
        <>
            {!characterType && <Box display='flex' justifyContent='center' alignItems='center' >
                <Stack direction={"column"} spacing={3} >
                    <Typography variant="h4">Choose your body type</Typography>
                    <Button className='p-2' style={{ background: "#0ff" }} variant='contained' onClick={() => dispatch(bodyType('Male'))} >Masculine</Button>
                    <Button className='p-2' style={{ background: "#0ff" }} variant='contained' onClick={() => dispatch(bodyType('Female'))} >Feminine</Button>
                    <Button className='p-2' style={{ background: "#0ff" }} variant='contained' onClick={() => dispatch(bodyType('all'))} >{`Don't specify`}</Button>
                </Stack>
            </Box>}
            <br />
            {characterType && <ChooseCharacter />}
        </>
    )
}

export default ChooseBodyType