"use client";

import { useState } from "react";

const defaultFormData = {
  name: "",
  email: "",
  message: "",
  isHuman: false,
};

export default function Contact() {
  const [formData, setFormData] = useState(defaultFormData);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const showSuccessMessage = () => {
    setErrorMessage(false);
    setOpenSnackBar(true);
  };

  const showErrorMessage = () => {
    setErrorMessage(true);
    setOpenSnackBar(true);
  };

  const sendData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://fast-react-api.onrender.com/contact",
        {
          method: "post",
          headers: [
            ["Accept", "application/json"],
            ["Content-Type", "application/json"],
          ],
          body: JSON.stringify(formData),
        }
      );

      setIsLoading(false);

      if (response.ok) {
        showSuccessMessage();
        setFormData(defaultFormData);
      } else {
        showErrorMessage();
      }
    } catch (error) {
      setIsLoading(false);
      showErrorMessage();
    }
  };

  const isFormValid = () =>
    !!(formData.name && formData.email && formData.message && formData.isHuman);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8 font-[family-name:var(--font-geist-sans)]">
      <form
        className="w-full max-w-md bg-gray-800 shadow-lg p-8 rounded-lg"
        action=""
        method="post"
      >
        {/* Name Field */}
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Nome
        </label>
        <input
          id="name"
          className="w-full mb-4 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
          type="text"
          placeholder="Seu nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Email Field */}
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          E-mail
        </label>
        <input
          id="email"
          className="w-full mb-4 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
          type="email"
          placeholder="Seu e-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Message Field */}
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          className="w-full mb-4 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
          placeholder="Sua mensagem"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-4">
          <input
            id="isHuman"
            type="checkbox"
            className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
            name="isHuman"
            onChange={handleChange}
          />
          <label htmlFor="isHuman" className="text-sm text-gray-300">
            Sou humano
          </label>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-2 px-4 rounded-md font-medium shadow transition-all ${
            isLoading || !isFormValid()
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
          type="submit"
          disabled={isLoading || !isFormValid()}
          onClick={sendData}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
