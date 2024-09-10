// import React, { useState } from "react";
// import { auth } from "../firebase/Firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Swal.fire({
//         title: "Logged In!",
//         text: "You have successfully logged in.",
//         icon: "success",
//         confirmButtonText: "OK"
//       }).then(() => {
//         navigate("/main"); // Redirect after successful login
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: error.message,
//         icon: "error",
//         confirmButtonText: "OK"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
//       {loading && (
//         <div className="loader-container">
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//         </div>
//       )}
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
//           Login
//         </h2>

//         <div className="mb-5">
//           <label
//             htmlFor="email"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Your email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             placeholder="name@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label
//             htmlFor="password"
//             className="block mb-2 text-sm font-medium text-gray-900"
//           >
//             Your password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex items-center mb-5">
//           <input
//             id="remember"
//             type="checkbox"
//             className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
//           />
//           <label
//             htmlFor="remember"
//             className="ml-2 text-sm font-medium text-gray-900"
//           >
//             Remember me
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="w-full px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         <a href="" className="text text-blue-700"><Link to={'/'}>Not Registerd Click me!</Link></a>
//       </form>

//       <style jsx>{`
//         .loader-container {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background-color: rgba(255, 255, 255, 0.8);
//           z-index: 1000;
//         }

//         .dot {
//           position: relative;
//           width: 20px;
//           height: 20px;
//           margin: 5px;
//           border-radius: 50%;
//           background-color: black;
//           animation: bounce 1.2s infinite ease-in-out;
//         }

//         .dot:nth-child(2) {
//           animation-delay: -0.4s;
//         }

//         .dot:nth-child(3) {
//           animation-delay: -0.8s;
//         }

//         @keyframes bounce {
//           0%, 20%, 50%, 80%, 100% {
//             transform: translateY(0);
//           }
//           40% {
//             transform: translateY(-30px);
//           }
//           60% {
//             transform: translateY(-15px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { auth, provider } from "../firebase/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Logged In!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/main"); // Redirect after successful login
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      Swal.fire({
        title: "Logged In!",
        text: `Welcome ${user.displayName || "User"}!`,
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/main"); // Redirect after successful login
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {loading && (
          <div className="loader-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center px-4 py-2 border border-black text-black bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black-500 font-medium rounded-md text-sm"
            disabled={loading}
          >
            <img
              className="h-6 mr-2"
              src="https://img.icons8.com/?size=512&id=17949&format=png"
              alt="Google icon"
            />
            {loading ? "Logging in with Google..." : "Login with Google"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            Sign Up
          </Link>
        </p>
      </div>
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

export default Login;
