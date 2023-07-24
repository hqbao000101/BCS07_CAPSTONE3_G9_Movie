import React from 'react';
import fade from '../assets/img/11.png';
export default function Loader() {
    return (
        <div className='logo-loading'>
            <img className='animated tada' src={fade} />
        </div>
    );
}
