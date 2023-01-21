import { Button } from '@mui/material';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../../components/Loading';
import SideMenu from '../../components/Menu';
import './Admin.scss';

export default function Admin({
    children
})
{
    return(
        <div id="admin">
            {children}
        </div>
    )
}