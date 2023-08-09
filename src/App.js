import React from "react";
import {FaInstagram, FaTiktok, FaLinkedin} from "react-icons/fa";

import ParticleAnimation from "./ParticleAnimation";
import BlurryLoadingImage from "./BlurryLoadingImage";
import {getCatalog} from "./ServerUtils";
import './App.css';

class App extends React.Component {

    state = {
        catalogItems: []
    };

    componentDidMount() {
        getCatalog().then(result => this.setState({catalogItems: result}));
    }

    render() {
        const {catalogItems} = this.state;

        return (
            <div className="app">
                <HeadingPanel />

                <div className="site-content">
                    <CatalogSection items={catalogItems} />
                    <MaterialSection />
                </div>

                <Footer />
            </div>
        );
    }
}

const HeadingPanel = () => (
    <div className="heading-panel">
        <div className="heading-panel-content">
            <img src="/assets/images/logo_full.png" className="logo" alt="logo"/>
            <h1 className="heading-text">ELEGANCE IS HERE!</h1>
        </div>

        <ParticleAnimation className="particle-effect" innerWidth={1} innerHeight={0.75} />
    </div>
);

const CatalogSection = ({items}) => (
    <>
        <div className="catalog-header">
            <p>Catalog</p>
        </div>

        <div className="catalog">
            {items.map(value =>
                <CatalogItem
                    key={value.id}
                    imagePreview={value.imagePreview}
                    image={value.image}
                    name={value.name}
                    amazonLink={value.amazonLink}
                    description={value.description}
                />
            )}
        </div>
    </>
);

const MaterialSection = () => (
    <>
        <div className="materials-header">
            <p>Materials</p>
        </div>

        <div className="material-item">
            <div className="material-content material-content-spacing">
                <BlurryLoadingImage
                    className="material-image"
                    preview="https://firebasestorage.googleapis.com/v0/b/elegant-ag.appspot.com/o/material%2Frayon-material-tiny.jpg?alt=media"
                    image="https://firebasestorage.googleapis.com/v0/b/elegant-ag.appspot.com/o/material%2Frayon-material.jpg?alt=media"
                />
            </div>

            <div className="material-content">
                <h2>Rayon Material</h2>

                <p>
                    Introducing elegance with our meticulously crafted 10mm Rayon material, designed to elevate your space with both comfort and style. Not only does it provide an irresistibly cozy experience, but its easy-to-clean nature ensures lasting beauty, making it an appealing choice for those who appreciate both elegance and convenience.
                </p>
            </div>
        </div>

        <div className="material-item" style={{marginTop: '4rem'}}>
            <div className="material-content material-content-spacing">
                <BlurryLoadingImage
                    className="material-image"
                    preview="https://firebasestorage.googleapis.com/v0/b/elegant-ag.appspot.com/o/material%2Fanti-slip-tiny.jpg?alt=media"
                    image="https://firebasestorage.googleapis.com/v0/b/elegant-ag.appspot.com/o/material%2Fanti-slip.jpg?alt=media"
                />
            </div>

            <div className="material-content">
                <h2>Anti-Slip Technology</h2>

                <p>
                    Built-in anti-slip technology ensures both luxurious comfort and secure footing with our exquisite carpet. Step onto its lavish surface and elevating your space in every step.
                </p>
            </div>
        </div>
    </>
);

const Footer = () => {
    const currentYear = new Date().getFullYear()
    let dateString;
    if (currentYear === 2022) {
        dateString = "2022"
    } else {
        dateString = "2022 - " + currentYear;
    }

    return (
        <div className="footer">
            <div className="footer-title">
                <p>For any questions or inquiries please contact us!</p>
            </div>

            <div className="footer-content">
                <a className="social-link" href="https://www.instagram.com/elegantagllc/" target="_blank" rel="noreferrer">
                    <FaInstagram color="#f3f3f3" size={28} />
                </a>

                <a className="social-link" href="https://www.tiktok.com/@elegant_ag/" target="_blank" rel="noreferrer">
                    <FaTiktok color="#f3f3f3" size={28} />
                </a>

                <a className="social-link" href="https://www.linkedin.com/company/89918572" target="_blank" rel="noreferrer">
                    <FaLinkedin color="#f3f3f3" size={28} />
                </a>
            </div>

            <div className="copyright">
                <p>&#169; {dateString} Elegant A&G LLC</p>
            </div>
        </div>
    )
};

const CatalogItem = ({imagePreview, image, name, description, amazonLink}) => (
    <div className="catalog-item">
        <BlurryLoadingImage className="catalog-item-image" preview={imagePreview} image={image} />

        <div className="catalog-item-content">
            <div>
                <div className="catalog-item-title">
                    <h2 style={{margin: 0}}>{name}</h2>
                </div>

                <div className="catalog-item-desc">
                    <p>{description}</p>
                </div>
            </div>

            <div className="catalog-item-purchase">
                <button className="buy-button" onClick={e => {
                    window.open(amazonLink, "_blank");
                }}>
                    Buy On Amazon
                </button>
            </div>
        </div>
    </div>
);

export default App;
