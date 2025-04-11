import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Faq.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import img from "../assets/user.png";
import Header from "../components/Header";

interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [formData, setFormData] = useState<FaqItem>({
    question: "",
    answer: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/faqs`
      );
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isEditing && formData._id) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/faqs/update/${formData._id}`,
          formData
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/faqs/add`,
          formData
        );
      }

      setShowForm(false);
      resetForm();
      setIsEditing(false);
      setFormData({ question: "", answer: "" });
      fetchFaqs();
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    }
  };

  const handleEdit = (faq: FaqItem) => {
    setFormData(faq);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/faqs/delete/${id}`
      );
      fetchFaqs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  const resetForm = () => {
    setFormData({ question: "", answer: "" });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="plant-page-wrapper">
      <Header />

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
              <button type="button" onClick={resetForm}>
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
              {faqs.map((faq, index) => (
                <tr key={faq._id}>
                  <td>{index + 1}</td>
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
                      onClick={() => handleDelete(faq._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        { }
        <div className="faq-cards-mobile">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="mobile-faq-card">
              <h4>{index + 1}. {faq.question}</h4>
              <p>{faq.answer}</p>
              <div className="mobile-faq-actions">
                <button className="edit-btn" onClick={() => handleEdit(faq)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(faq._id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Faq;
