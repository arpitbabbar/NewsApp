import React from 'react'
import Loading from '../loading.gif';

function Spinner() {
    return (
        <div className="text-center">
            <img className="my-4" src={Loading} alt="loading" />
        </div>
    )
}

export default Spinner
