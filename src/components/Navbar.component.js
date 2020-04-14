import React, { Component } from 'react';
import { ReactComponent as Logo } from '../filter_drama.svg';


export default class Navbar extends Component {
    render() {
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <a className="mr-1 navbar-brand" href="/">
                    <Logo className="d-inline-block align-top logo" />
                </a>
                <span className="text-light">DNS Rebel</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">DNS Lookup <span className="sr-only">(current)</span></a>
                </li>
{/*                 <li className="nav-item">
                    <a className="nav-link" href="/historical">Previous Lookups</a>
                </li> */}
            </ul>
            </div>
        </div>
        );
    }
}