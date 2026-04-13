
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import api from "../api/api";
const Contact = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        api
            .get("/job-profiles")
            .then((response) => {
                if (response.data.status) {
                    setJobs(response?.data?.data);
                }
            })
            .catch((error) => console.error("Error fetching Jobs:", error));
    }, []);
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
        job_profile_id: "",
        job_title: "",
        name: "",
        email: "",
        phone: "",
        city: "",
        portfolio_url: "",
        message: "",
    });

    const [resume, setResume] = useState(null);
    const [portfolio_file, setPortfolioFile] = useState(null);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    // ✅ handle text/select/textarea changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ handle file uploads
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "resume") setResume(files[0]);
        if (name === "portfolio_file") setPortfolioFile(files[0]);
    };

    // ✅ handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "info", message: "Submitting..." });
        try {
            const data = new FormData();
            console.log('data', data);
            Object.keys(formData).forEach((key) => data.append(key, formData[key]));
            if (resume) data.append("resume", resume);
            if (portfolio_file) data.append("portfolio_file", portfolio_file);
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/job-applications`, {
                method: "POST",
                body: data,
            });
            const response = await res.json();
            if (res.ok) {
                setStatus({ type: "success", message: "Thank you applying. Our Team will contact you shortly" });
                setFormData({
                    job_profile_id: "",
                    job_title: "",
                    name: "",
                    email: "",
                    phone: "",
                    city: "",
                    portfolio_url: "",
                    message: "",
                });
                setResume(null);
                setPortfolioFile(null);
            } else {
                setStatus({
                    type: "error",
                    message: response.message || "Something went wrong.",
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Error submitting form. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className="contactSection" data-aos="fade-up" data-aos-delay="200">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Current Openings</h2>
                        </div>
                        <div className="col-md-12">
                            <div className="accordion pt-3" id="accordionExample">
                                {jobs?.map((job, index) => (
                                    <div className="accordion-item" key={job.id}>
                                        <h2 className="accordion-header" id={`heading${job.id}`}>
                                            <button
                                                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${job.id}`}
                                                aria-expanded={index === 0 ? 'true' : 'false'}
                                                aria-controls={`collapse${job.id}`}
                                            >
                                                {job.job_title}
                                            </button>
                                        </h2>

                                        <div
                                            id={`collapse${job.id}`}
                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                            aria-labelledby={`heading${job.id}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body" dangerouslySetInnerHTML={{ __html: job.job_description }}>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="contactForm" data-aos="fade-up" data-aos-delay="200">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Fill this form and we will contact you shortly</h2>
                        </div>
                        <div className="col-md-12">
                            {status.message && (
                                <div className="col-md-12 mt-3">
                                    <div
                                        className={`alert text-center ${status.type === "success"
                                            ? "alert-success"
                                            : status.type === "error"
                                                ? "alert-danger"
                                                : "alert-info"
                                            }`}
                                        role="alert"
                                    >
                                        {status.message}
                                    </div>
                                </div>
                            )}
                            <form className="contacts" onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Job Position */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-file"></i> Job Position
                                            </label>
                                            <select
                                                className="form-control"
                                                name="position"
                                                value={formData.job_title}
                                                // onChange={handleChange}
                                                onChange={(e) => {
                                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        job_title: e.target.value,
                                                        job_profile_id: selectedOption.getAttribute("data-id"),
                                                    }));
                                                }}
                                                required
                                            >
                                                <option value="" disabled>
                                                    --Select--
                                                </option>
                                                {jobs?.map((job, index) => (
                                                    <option value={job.job_title} data-id={job.id} key={index}>{job.job_title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-user"></i> Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-envelope"></i> Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-mobile"></i> Phone
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* City */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-building"></i> City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-control"
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Portfolio URL */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-link"></i> Portfolio URL
                                            </label>
                                            <input
                                                type="text"
                                                name="portfolio"
                                                className="form-control"
                                                placeholder="Portfolio Link"
                                                value={formData.portfolio}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Resume Upload */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-file"></i> Resume Upload (pdf, docx, jpg)
                                            </label>
                                            <input
                                                type="file"
                                                name="resume"
                                                className="form-control"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.jpg,.png"
                                            />
                                        </div>
                                    </div>

                                    {/* Portfolio Upload */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-file"></i> Portfolio Upload
                                            </label>
                                            <input
                                                type="file"
                                                name="portfolio_upload"
                                                className="form-control"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.jpg,.png"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>
                                                <i className="fa fa-message"></i> Message (If any)
                                            </label>
                                            <textarea
                                                name="message"
                                                rows="4"
                                                className="form-control"
                                                placeholder="Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-md-12 m-auto">
                                        <button
                                            type="submit"
                                            className="btn btn-success px-4 py-2 mt-3 rounded-pill fw-semibold"
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Contact;
