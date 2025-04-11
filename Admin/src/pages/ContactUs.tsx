
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/Contactus.css";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/contact`
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching contact messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="plant-page-wrapper">
      <Header />

      <div className="content">
        <h2 className="page-title">Contact Us Messages</h2>

        {/* Desktop Table View */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Received At</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg._id}>
                  <td>{index + 1}</td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="contact-cards-mobile">
          {messages.map((msg, index) => (
            <div key={msg._id} className="mobile-contact-card">
              <h4>{index + 1}. {msg.name}</h4>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Received:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContactMessages;
