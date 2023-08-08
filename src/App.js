import React from "react";
import ParticleAnimation from "./ParticleAnimation";
import {getCatalog} from "./ServerUtils";
import {FaInstagram, FaTiktok, FaLinkedin} from "react-icons/fa";
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
                    <div className="catalog-title">
                        <p>Catalog</p>
                    </div>

                    <div className="catalog">
                        {catalogItems.map(value =>
                            <CatalogItem
                                key={value.id}
                                image={value.image}
                                name={value.name}
                                amazonLink={value.amazonLink}
                                description={value.description}
                            />
                        )}
                    </div>
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

const Footer = () => {
    const currentYear = new Date().getFullYear()
    let dateString;
    if (currentYear === 2022) {
        dateString = "2022"
    }else {
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

const CatalogItem = ({image, name, description, amazonLink}) => (
    <div className="catalog-item">
        <img className="catalog-item-image" src={image} alt='rug-preview' />

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
