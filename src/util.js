import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';

import { 
    Routes, 
    Route, 
    Outlet, 
    Link
    } from "react-router-dom";


export class NavBar extends React.Component {
    render() {
        return (
            <div>
                <Outlet />
                <Footer />
            </div>
        )
    }
}


export class Footer extends React.Component {
    render() {
        return (
                <div>

                </div>
        )
    }
}

export class NotFound extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}