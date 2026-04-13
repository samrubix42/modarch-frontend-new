import { Link } from "react-router-dom";
const Footer = ({ setSelectedCategory, setting }) => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="footer-menu">
                                <ul>
                                    <li><Link to="/" onClick={() => setSelectedCategory('')}>Home</Link></li>
                                    <li><Link to="about">About Us</Link></li>
                                    <li><Link to="careers">Careers</Link></li>
                                    <li><Link to="contact">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="copyright">
                                <p>© Modarch India. All Rights Reserved.<br />Powered by <a href="https://www.techonika.com/" target="_blank">Techonika.</a></p>
                            </div>
                        </div>
                        <div className="col-md-3 justify-content-center" >
                            <div className="social">
                                <ul>
                                    <li><a href={setting?.facebook_url} target="_blank"><i className="fab fa-facebook"></i></a></li>
                                    <li><a href={setting?.linkedin_url} target="_blank"><i className="fab fa-linkedin"></i></a></li>
                                    <li><a href={setting?.instagram_url} target="_blank"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-5" >
                            <div className="contact">
                                <ul>
                                    <li>
                                        <i className="fa fa-phone"></i>
                                        <div className="contact-text">
                                            <a href={`tel:${setting?.phone_1}`} target="_blank">{setting?.phone_1}</a>,
                                            <a href={`tel:${setting?.phone_2}`} target="_blank">{setting?.phone_2}</a>
                                        </div>
                                    </li>
                                    <li>
                                        <i className="fa fa-envelope"></i>
                                        <div className="contact-text">
                                            <a href={`${setting?.email_1}`} target="_blank">{setting?.email_1}</a>,
                                            <a href={`${setting?.email_2}`} target="_blank">{setting?.email_2}</a>
                                        </div>
                                    </li>
                                    <li className="location">
                                        <i className="fa fa-map-marker"></i>
                                        <div className="contact-text">
                                            <span><strong>India Address:</strong> {setting?.address_1}</span>
                                            <span><strong>Vietnam Address:</strong> {setting?.address_2}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
export default Footer;