import React, { useState } from "react";
import { auth, firestore, storage, provider } from "../firebase/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailPasswordSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Handle profile picture upload
      let profilePicUrl = "";
      if (profilePic) {
        const picRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(picRef, profilePic);
        profilePicUrl = await getDownloadURL(picRef);
      }

      // Save user data to Firestore
      await setDoc(doc(firestore, `users/${user.uid}`), {
        username,
        email: user.email,
        profilePic: profilePicUrl,
      });

      // Save user data to local storage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          username,
          profilePic: profilePicUrl,
        })
      );

      Swal.fire({
        title: "Success!",
        text: `${username} registered successfully!`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/main"); // Redirect to the main page
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get profile picture URL if available
      const profilePicUrl = user.photoURL || "";

      await setDoc(doc(firestore, `users/${user.uid}`), {
        username: user.displayName || "",
        email: user.email,
        profilePic: profilePicUrl,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          username: user.displayName || "",
          profilePic: profilePicUrl,
        })
      );

      Swal.fire({
        title: "Success!",
        text: `${user.displayName || "User"} registered successfully!`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/main"); // Redirect to the main page
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleEmailPasswordSignup}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profile_pic"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profile_pic"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="mt-1 block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center px-4 py-2 border border-black text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black-500 font-medium rounded-md text-sm"
            disabled={loading}
          >
            <img
              className="h-6 mr-2"
              src="https://img.icons8.com/?size=512&id=17949&format=png"
              alt="Google icon"
            />
            {loading ? "Signing up with Google..." : "Sign up with Google"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
            Login
          </Link>
        </p>
      </div>
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
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            width: 100%;
          }
          .dot {
            width: 12px;
            height: 12px;
            margin: 0 5px;
            background-color: #333;
            border-radius: 50%;
            animation: dot-flashing 1.5s infinite linear;
          }
          .dot:nth-child(1) {
            animation-delay: -0.3s;
          }
          .dot:nth-child(2) {
            animation-delay: -0.15s;
          }
          @keyframes dot-flashing {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default SignUp;
