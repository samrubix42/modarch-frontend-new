import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const About = () => {
    useEffect(() => {
        AOS.init({
          duration: 1200,
          offset: 100,
          delay: 100,
          once: false,
          mirror: true,
          easing: "ease-in-out",
          anchorPlacement: "top-bottom",
        });
    }, []);
    return(
        <>
        <div className="container py-5 about">
            <h1 className="text-black">About</h1>
            <section className="aboutSection" >
                <div className="row">
                    <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                        <h2 className="text-black">Studio</h2>
                        <p className="text-black">MODARCHINDIA, believes in creating environments that are contemporary, multi-layered and sensitive to relative conditions, Established in Delhi 1997, under the vibrant leadership of Mr. Amit Gangal and since then worked hard toward providing world class townships, shopping malls, housing complexes, offices and hospitality.
                            <br /><br />The firm’s principals and staff have diversified knowledge and experience in the fields of Architecture, Interior Design, Site Planning, and Construction Administration. The practice has its own resource of qualified architects and designers and a large, fully computerized database of technical information.
                            <br /><br />The firm has extensive experience in all levels of group housing & commercial project design with major developers, private and corporate clients. This experience includes site evaluation and site planning, design and space planning, project management and construction administration.
                        </p>
                    </div>
                    <div className="col-md-8" data-aos="fade-up" data-aos-delay="200">
                        <h2 className="text-black">The way we work</h2>
                        <p className="text-black">We provide a wide range of architectural and interior design services; including land use and site master planning, value engineering and construction administration. Our solutions are designed to promote project efficiency and profitability. Our projects are completed within budget and on schedule. Our staff is accessible on phone calls as well as e-mails that are accepted immediately and returned promptly. We maintain strict client confidentiality on all work. Our value engineering reduces initial project cost.
                            <br /><br />We share our extensive experience in effectively dealing with corporate and private clients, and understand the diverse design solutions that each of these clients’ require. Our studios adaptability and school of thought has established a foot hold in each decade, evolving from post-modem to current global demands, from a unitary client to an organized development sector. We deem-Spontaneity can cause undesirable alterations whereas designed and controlled changes result in best products. More importantly, we provide our services for sustaining the environment, market demands and client wishes that enable our work, and we aim to attain an overlap of our goals and our client’s goals.
                            <br /><br />The studio booting to its technological know-how is a networked environment works, with the team displaying proficiency in top of the shelf designing, modeling and research software.
                        </p>
                        <h2 className="text-black">People</h2>
                        <p className="text-black">We would like to introduce ourselves as a group of young professionals rendering professional services in the field of architecture, interior – design, and environmental planning with a quality conscious attitude.Our professional staff offers broad experience and exceptional design talent.As an active part of the growing architectural culture, MODARCH continues to evolve technically, aesthetically, theoretically and technologically. MODARCH today comprises of a team of 225+ associated professional Architects, Engineers & Interior Designers.</p>
                    </div>
                </div>
            </section>
            <section className="leaderSection">
                <h1 className="text-black">Leadership</h1>
                <div className="row">
                    <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
                        <img src={`${import.meta.env.VITE_IMAGE_URL}frontend/images/modarchindia/leaders/CEO.png`} />
                    </div>
                    <div className="col-md-8" data-aos="fade-up" data-aos-delay="200">
                        <h2 className="text-black">Amit Gangal</h2>
                        <h3 className="text-black">FOUNDER OF “MODARCHINDIA”</h3>
                        <p className="text-black">Mr. Amit creates innovative design solutions, combining knowledge from a wide range of projects including, master planning, retail, leisure, mixed use real estate,residential,commercial development, transport and urban regeneration. As Principal Architect of Modarchindia, he manages all financial, design and personnel aspects of the Studio, leading diverse team of architects, technicians and interior designers. He dispenses advice, guidance , direction and authorization of Design Principles of the projects.</p>
                        <p className="text-black"><strong>Key Qualifications:</strong> Expertise in Design management of Multi-storey Mix-Land Use, Hospitality, Residential & Commercial Projects, Overall Organisation Management and Guidance.</p>
                        <p className="text-black">He worked on some of Modarch’s most significant projects like</p>
                        <ul>
                            <li><i className="fa fa-check"></i><strong>Pacific Fashion Mall,</strong> Tagore Garden, New Delhi, (Shopping Mall + Hotel).Plot Area = 8.3 acres.</li>
                            <li><i className="fa fa-check"></i><strong>Supertech Hues,</strong> Gurugram, Haryana (Group Housing).Plot Area = 70 acres.</li>
                            <li><i className="fa fa-check"></i><strong>Galaxy Blue Sapphire,</strong> (Retail, Residential, Commercial, Hotel & Office Spaces).Plot Area = 6.3 acres.</li>
                            <li><i className="fa fa-check"></i><strong>Supernova Noida,</strong> Mixed use development (Retail, Residential, Commercial, Hotel & Office Spaces).Plot Area = 17 acres.</li>
                            <li><i className="fa fa-check"></i><strong>Page Three,</strong> Jaypee Greens Golf course (Residential, Retail, ).Plot Area = 7.8 acres.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="teamSection">
                <div className="row">
                    <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                        <img src={`${import.meta.env.VITE_IMAGE_URL}frontend/images/modarchindia/leaders/partner1.png`} />
                        <h2 className="text-black">Hitesh Gupta</h2>
                        <h5 className="text-black">TEAM DESIGN & EXECUTION FOR COMMERCIAL AND HOTELS</h5>
                    </div>
                    <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                        <img src={`${import.meta.env.VITE_IMAGE_URL}frontend/images/modarchindia/leaders/partner2.png`} />
                        <h2 className="text-black">Anitesh Agarwal</h2>
                        <h5 className="text-black">TEAM DESIGN & EXECUTION FOR GROUP HOUSINGS AND TOWNSHIPS</h5>
                    </div>
                    <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                        <img src={`${import.meta.env.VITE_IMAGE_URL}frontend/images/modarchindia/leaders/partner3.png`} />
                        <h2 className="text-black">Krishna Agnihotri</h2>
                        <h5 className="text-black">TEAM DESIGN & EXECUTION FOR MIX LAND USE</h5>
                    </div>
                </div>
            </section>
        </div>

        </>
    );
}
export default About;
