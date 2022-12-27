import React from "react";
import './App.css';

import ParticleAnimation from "./ParticleAnimation";

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <div className="gradient-effect"/>
                <ParticleAnimation className='content-effect' innerWidth={0.95} innerHeight={0.92} />

                <div className="content">
                    <div className="section section-column-center">
                        <img src="/assets/images/logo_full.png" className="logo" alt="logo"/>
                    </div>

                    <div className="section section-column-center">
                        <h1 className="coming-soon">ELEGANCE COMING SOON!</h1>
                        <h3 className="coming-soon-sub">ARE YOU READY</h3>
                    </div>

                    <div className="section" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingBottom: '1rem'
                    }}>
                        <a className="social" href="https://www.instagram.com/elegantagllc/" target="_blank"
                           rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
                        <a className="social" href="https://www.tiktok.com/@elegant_ag/" target="_blank"
                           rel="noreferrer"><i className="fa-brands fa-tiktok"></i></a>
                        <a className="social" href="https://www.linkedin.com/company/89918572" target="_blank"
                           rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                    </div>

                </div>
            </div>
        )
    }
}

export default App;
