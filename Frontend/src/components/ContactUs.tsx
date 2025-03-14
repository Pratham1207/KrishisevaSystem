import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you shortly.");
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>
        Thank you for your interest in KrishiSeva. We are dedicated to providing
        the best service to our clients, and your feedback is essential in
        helping us improve. If you have any questions, comments, or inquiries,
        please don't hesitate to reach out to us through the form below.
      </p>

      <p>
        Our team strives to respond to all inquiries within 48 hours. We look
        forward to hearing from you.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Let us know how we can assist you"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <div className="thank-you-message">
        <p>
          We appreciate your time and effort in reaching out to us. Rest
          assured, your inquiry is important to us, and we will get back to you
          as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
