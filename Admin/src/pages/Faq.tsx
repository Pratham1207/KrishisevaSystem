import React, { useState } from "react";
import "../styles/Faq.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: 1,
      question: "What is Krishiseva?",
      answer:
        "Krishiseva is a platform that provides agricultural solutions to farmers and stakeholders.",
    },
    {
      id: 2,
      question: "How to contact support?",
      answer:
        "You can reach our support team via email at support@krishiseva.com or call +91-9876543210.",
    },
    {
      id: 3,
      question: "What services do you provide?",
      answer:
        "We provide agricultural insights, soil analysis, fertilizer recommendations, and cold storage management.",
    },
  ]);

  const [formData, setFormData] = useState<
    Omit<FaqItem, "id"> & { id: number | null }
  >({
    id: null,
    question: "",
    answer: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === formData.id ? (formData as FaqItem) : faq
        )
      );
      setIsEditing(false);
    } else {
      const newFaq: FaqItem = {
        id: faqs.length + 1,
        question: formData.question,
        answer: formData.answer,
      };
      setFaqs([...faqs, newFaq]);
    }
    setFormData({ id: null, question: "", answer: "" });
    setShowForm(false);
  };

  const handleEdit = (faq: FaqItem) => {
    setFormData(faq);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  };

  return (
    <div className="plant-page-wrapper">
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Krishiseva</h1>
          <p>Hello Admin, Welcome back!</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder="Search Dashboard" />
          <BiSearchAlt className="icon" />
        </div>

        <div className="adminDiv flex">
          <TbMessageCircle className="icon" />
          <MdOutlineNotificationsNone className="icon" />
          <div className="adminImage">
            <img src={img} alt="Admin Profile" />
          </div>
        </div>
      </div>

      <div className="content">
        <h2 className="page-title">Manage FAQs</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add FAQ
        </button>

        {showForm && (
          <div className="form-container">
            <h3>{isEditing ? "Edit FAQ" : "Add FAQ"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="question"
                placeholder="FAQ Question"
                value={formData.question}
                onChange={handleChange}
                required
              />
              <textarea
                name="answer"
                placeholder="FAQ Answer"
                value={formData.answer}
                onChange={handleChange}
                required
              />
              <button type="submit">{isEditing ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id}>
                  <td>{faq.id}</td>
                  <td>{faq.question}</td>
                  <td>{faq.answer}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(faq)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Faq;
