import React from 'react'
import { CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <div className='d-flex justify-content-center' >
            <CircularProgress
                size={80} // Specify the size of the loader
                color="primary" // Specify the color of the loader (primary, secondary, or any valid CSS color value)
                thickness={1} // Specify the thickness of the loader
            />
        </div>
    )
}

export default Loader