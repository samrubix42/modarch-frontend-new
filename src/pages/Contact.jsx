import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const Contact = ({ settings }) => {
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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(formData.name)) tempErrors.name = "Name can only contain letters and spaces";

        if (!formData.email.trim()) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";

        if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
        else if (!/^\d{10,15}$/.test(formData.phone.replace(/[\s+-]/g, ''))) tempErrors.phone = "Phone number is invalid";

        if (!formData.message.trim()) tempErrors.message = "Message is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setStatus("");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log('test', response);
            if (response.ok) {
                setStatus('Thank you For Contacting Us. Our Team will contact you shortly');
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    phone: "",
                    message: "",
                });
            } else {
                setStatus("❌ Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("⚠️ Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    console.log('settings', settings);
    return (
        <>
            <section className="contactSection">
                <div className="container">
                    <div className="row" data-aos="fade-up" data-aos-delay="200">
                        <div className="col-md-4">
                            <div className="contactBox">
                                <div className="row">
                                    <div className="col-md-3 col-3">
                                        <i className="fa fa-envelope"></i>
                                    </div>
                                    <div className="col-md-9 col-9">
                                        <h3>Useful Links</h3>
                                        <div>Inquiry: <a href={`mailto:${settings?.email_1}`}>{settings?.email_1}</a></div>
                                        <div>Careers: <a href={`mailto:${settings?.email_2}`}>{settings?.email_2}</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contactBox">
                                <div className="row">
                                    <div className="col-md-3 col-3">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="col-md-9 col-9">
                                        <h3>Reception Desk</h3>
                                        <div><a href={`tel:${settings?.phone_1}`}>{settings?.phone_1}</a></div>
                                        <div><a href={`tel:${settings?.phone_2}`}>{settings?.phone_2}</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contactBox">
                                <div className="row">
                                    <div className="col-md-3 col-3">
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                    <div className="col-md-9 col-9">
                                        <h3>Address</h3>
                                        <div><strong>India Address:</strong> {settings?.address_1}</div>
                                        <div><strong>Vietnam Address:</strong> {settings?.address_2}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contactForm">
                <div className="container">
                    <div className="row" data-aos="fade-up" data-aos-delay="200">
                        <div className="col-md-12">
                            <h2>Send Message</h2>
                        </div>
                        <div className="col-md-12">
                            {status && <div className="alert alert-success">{status}</div>}
                            <form className="contacts" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && <div className="invalid-feedback text-start">{errors.name}</div>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <div className="invalid-feedback text-start">{errors.email}</div>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="subject"
                                                id="subject"
                                                className="form-control"
                                                placeholder="Subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                placeholder="Phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            {errors.phone && <div className="invalid-feedback text-start">{errors.phone}</div>}
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows="4"
                                                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                                placeholder="Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                            ></textarea>
                                            {errors.message && <div className="invalid-feedback text-start">{errors.message}</div>}
                                        </div>
                                    </div>

                                    <div className="col-md-12 m-auto text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-success px-4 py-2 mt-3 rounded-pill fw-semibold"
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Send Message"}
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="map p-0" data-aos="fade-up" data-aos-delay="200">
                <iframe frameborder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.90416028390865!2d77.37778727116441!3d28.61577560712765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef80c8d65073%3A0x680786c8b54e5215!2sModarch!5e0!3m2!1sen!2sin!4v1395923706121" width="100%" height="400"></iframe>
            </section>
        </>
    );
}
export default Contact;
