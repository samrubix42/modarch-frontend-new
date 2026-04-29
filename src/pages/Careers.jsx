
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
    const [errors, setErrors] = useState({});

    // ✅ handle text/select/textarea changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // ✅ handle file uploads
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "resume") {
            setResume(files[0]);
            if (errors.resume) setErrors((prev) => ({ ...prev, resume: "" }));
        }
        if (name === "portfolio_upload") setPortfolioFile(files[0]);
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.job_title) tempErrors.job_title = "Please select a job position";

        if (!formData.name.trim()) tempErrors.name = "Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(formData.name)) tempErrors.name = "Name can only contain letters and spaces";

        if (!formData.email.trim()) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";

        if (!formData.phone?.trim()) tempErrors.phone = "Phone number is required";
        else if (!/^\d{10,15}$/.test(formData.phone.replace(/[\s+-]/g, ''))) tempErrors.phone = "Phone number is invalid";

        if (formData.portfolio_url && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.portfolio_url)) tempErrors.portfolio_url = "Portfolio URL is invalid";

        if (!resume) tempErrors.resume = "Resume is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // ✅ handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setStatus({ type: "info", message: "Submitting..." });
        try {
            const data = new FormData();
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
                                                className={`form-control ${errors.job_title ? 'is-invalid' : ''}`}
                                                name="job_title"
                                                value={formData.job_title}
                                                onChange={(e) => {
                                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        job_title: e.target.value,
                                                        job_profile_id: selectedOption.getAttribute("data-id"),
                                                    }));
                                                    if (errors.job_title) setErrors((prev) => ({ ...prev, job_title: "" }));
                                                }}
                                            >
                                                <option value="" disabled>
                                                    --Select--
                                                </option>
                                                {jobs?.map((job, index) => (
                                                    <option value={job.job_title} data-id={job.id} key={index}>{job.job_title}</option>
                                                ))}
                                            </select>
                                            {errors.job_title && <div className="invalid-feedback text-start">{errors.job_title}</div>}
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
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && <div className="invalid-feedback text-start">{errors.name}</div>}
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
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <div className="invalid-feedback text-start">{errors.email}</div>}
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
                                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                                placeholder="Phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            {errors.phone && <div className="invalid-feedback text-start">{errors.phone}</div>}
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
                                                name="portfolio_url"
                                                className={`form-control ${errors.portfolio_url ? 'is-invalid' : ''}`}
                                                placeholder="Portfolio Link"
                                                value={formData.portfolio_url}
                                                onChange={handleChange}
                                            />
                                            {errors.portfolio_url && <div className="invalid-feedback text-start">{errors.portfolio_url}</div>}
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
                                                className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.jpg,.png"
                                            />
                                            {errors.resume && <div className="invalid-feedback text-start">{errors.resume}</div>}
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
