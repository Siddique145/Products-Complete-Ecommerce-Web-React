import React, { useState } from "react";
import { auth } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "User registered successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect after alert
        navigate("/login");
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-14 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Sign Up
        </h2>

        {error && (
          <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="floating_email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <input
            type="email"
            id="floating_email"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="floating_password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="floating_password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="floating_repeat_password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="floating_repeat_password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div>
            <label
              htmlFor="floating_first_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First name
            </label>
            <input
              type="text"
              id="floating_first_name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label
              htmlFor="floating_last_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last name
            </label>
            <input
              type="text"
              id="floating_last_name"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <div>
            <label
              htmlFor="floating_phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="floating_phone"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="123-456-7890"
              required
            />
          </div>

          <div>
            <label
              htmlFor="floating_company"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company
            </label>
            <input
              type="text"
              id="floating_company"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Google"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium rounded-md text-sm"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <a href="" className="text-blue-700"><Link to={'/login'}>Already Account Click me!</Link></a>
      </form>

      {loading && (
        <div className="loader-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}

      <style>
        {`
          .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.8);
            z-index: 1000;
          }
          
          .dot {
            position: relative;
            width: 20px;
            height: 20px;
            margin: 5px;
            border-radius: 50%;
            background-color: black;
            animation: bounce 1.2s infinite ease-in-out;
          }
          
          .dot:nth-child(2) {
            animation-delay: -0.4s;
          }
          
          .dot:nth-child(3) {
            animation-delay: -0.8s;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-30px);
            }
            60% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
    </>
  );
}

export default Signup;
