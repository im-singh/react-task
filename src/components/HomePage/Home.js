import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from '../Navbar/Navbar';
import DataListContainer from '../DataList/DataListContainer';
import { fetchProductList } from '../../redux/Products/actions';


export default function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <DataListContainer />
        </div>
    );
}
