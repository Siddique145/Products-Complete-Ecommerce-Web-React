// import React, { useContext, useState, useEffect } from "react";
// import { CartContext } from "./CartContext";
// import { NavLink, useNavigate } from "react-router-dom";
// import { auth, firestore, storage } from "../firebase/Firebase";
// import { getDoc, doc } from "firebase/firestore";
// import { ref, getDownloadURL } from "firebase/storage";

// function Header() {
//   const { cart } = useContext(CartContext);
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       setLoading(true);
//       console.log("Fetching user info...");

//       try {
//         if (auth.currentUser) {
//           console.log("Fetching user data from Firestore...");
//           const userDoc = doc(firestore, `users/${auth.currentUser.uid}`);
//           const userSnap = await getDoc(userDoc);

//           if (userSnap.exists()) {
//             console.log("User document exists in Firestore");
//             const userData = userSnap.data();
//             let profilePicUrl = null;

//             if (userData.profilePic) {
//               try {
//                 profilePicUrl = await getDownloadURL(
//                   ref(storage, userData.profilePic)
//                 );
//                 console.log("Profile picture URL fetched");
//               } catch (err) {
//                 console.error("Error fetching profile picture URL:", err);
//               }
//             }

//             const userWithProfilePic = { ...userData, profilePicUrl };
//             setUserInfo(userWithProfilePic);
//             console.log("User data fetched and set");
//           } else {
//             console.log("User document does not exist");
//             setUserInfo(null);
//           }
//         } else {
//           console.log("No user is currently signed in");
//           setUserInfo(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//       } finally {
//         setLoading(false);
//         console.log("Loading finished");
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

//   const handleSignOut = async () => {
//     try {
//       console.log("Signing out...");
//       await auth.signOut();
//       setUserInfo(null);
//       navigate("/login");
//       console.log("Signed out successfully");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <>
//       {loading && (
//         <div className="loader-container">
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//         </div>
//       )}

//       <nav className="bg-white dark:bg-indigo-500 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <a
//             href="/"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <img
//               src="https://img.icons8.com/?size=160&id=MKU1TQCqFRQI&format=png"
//               className="h-10"
//               alt="Flowbite Logo"
//             />
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//               My Cart
//             </span>
//           </a>
//           <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//             <NavLink to="/cart">
//               <button
//                 disabled
//                 type="button"
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Cart ({totalItems})
//               </button>
//             </NavLink>
//             {userInfo ? (
//               <div className="relative flex items-center space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="flex items-center space-x-2"
//                 >
//                   {userInfo.profilePicUrl && (
//                     <img
//                       src={userInfo.profilePicUrl}
//                       alt="Profile"
//                       className="w-10 h-10 rounded-full"
//                     />
//                   )}
//                   <span className="text-white">{userInfo.username}</span>
//                 </button>
//                 {sidebarOpen && (
//                   <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
//                     <ul className="py-2">
//                       <li>
//                         <button
//                           onClick={handleSignOut}
//                           className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
//                         >
//                           Sign out
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <NavLink to="/login">
//                 <button
//                   type="button"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Login
//                 </button>
//               </NavLink>
//             )}
//             <button
//               data-collapse-toggle="navbar-sticky"
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//               aria-controls="navbar-sticky"
//               aria-expanded={sidebarOpen}
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ${
//               sidebarOpen ? "block" : "hidden"
//             }`}
//             id="navbar-sticky"
//           >
//             <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
//               <li>
//                 <NavLink
//                   to={"/main"}
//                   className={({ isActive }) =>
//                     `block py-2 px-3 rounded md:p-0 ${
//                       isActive
//                         ? "text-2xl font-extrabold text-white"
//                         : "text-white hover:font-extrabold"
//                     }`
//                   }
//                   aria-current="page"
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to={"/products"}
//                   className={({ isActive }) =>
//                     `block py-2 px-3 rounded md:p-0 ${
//                       isActive
//                         ? "text-2xl font-extrabold text-white"
//                         : "text-white hover:font-extrabold"
//                     }`
//                   }
//                 >
//                   Products
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to={"/services"}
//                   className={({ isActive }) =>
//                     `block py-2 px-3 rounded md:p-0 ${
//                       isActive
//                         ? "text-2xl font-extrabold text-white"
//                         : "text-white hover:font-extrabold"
//                     }`
//                   }
//                 >
//                   Services
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <style>
//         {`
//           .loader-container {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             background-color: rgba(255, 255, 255, 0.8);
//             z-index: 1000;
//           }

//           .dot {
//             position: relative;
//             width: 12px;
//             height: 12px;
//             margin: 0 5px;
//             border-radius: 50%;
//             background-color: #333;
//             animation: dot-flashing 1.5s infinite linear;
//           }

//           .dot:nth-child(1) {
//             animation-delay: -0.3s;
//           }

//           .dot:nth-child(2) {
//             animation-delay: -0.15s;
//           }

//           @keyframes dot-flashing {
//             0%, 100% {
//               opacity: 1;
//             }
//             50% {
//               opacity: 0.3;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default Header;
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, firestore, storage } from "../firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

function Header() {
  const { cart } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      console.log("Fetching user info...");

      try {
        const storedUserInfo = localStorage.getItem("userInfo");
        
        if (storedUserInfo) {
          console.log("Using user data from local storage...");
          setUserInfo(JSON.parse(storedUserInfo));
        } else if (auth.currentUser) {
          console.log("Fetching user data from Firestore...");
          const userDoc = doc(firestore, `users/${auth.currentUser.uid}`);
          const userSnap = await getDoc(userDoc);

          if (userSnap.exists()) {
            console.log("User document exists in Firestore");
            const userData = userSnap.data();
            let profilePicUrl = null;

            if (userData.profilePic) {
              try {
                profilePicUrl = await getDownloadURL(
                  ref(storage, userData.profilePic)
                );
                console.log("Profile picture URL fetched");
              } catch (err) {
                console.error("Error fetching profile picture URL:", err);
              }
            }

            const userWithProfilePic = { ...userData, profilePicUrl };
            setUserInfo(userWithProfilePic);

            // Save user data to local storage
            localStorage.setItem("userInfo", JSON.stringify(userWithProfilePic));
            console.log("User data fetched and set");
          } else {
            console.log("User document does not exist");
            setUserInfo(null);
          }
        } else {
          console.log("No user is currently signed in");
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
        console.log("Loading finished");
      }
    };

    fetchUserInfo();
  }, []);

  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      console.log("Signing out...");
      await auth.signOut();
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      navigate("/login");
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}

      <nav className="bg-white dark:bg-indigo-500 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://img.icons8.com/?size=160&id=MKU1TQCqFRQI&format=png"
              className="h-10"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              My Cart
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <NavLink to="/cart">
              <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cart ({totalItems})
              </button>
            </NavLink>
            {userInfo ? (
              <div className="relative flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center space-x-2"
                >
                  {userInfo.profilePicUrl && (
                    <img
                      src={userInfo.profilePicUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <span className="text-black">{userInfo.username}</span>
                </button>
                {sidebarOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </NavLink>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ${
              sidebarOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <NavLink
                  to={"/main"}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded md:p-0 ${
                      isActive
                        ? "text-2xl font-extrabold text-white"
                        : "text-white hover:font-extrabold"
                    }`
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded md:p-0 ${
                      isActive
                        ? "text-2xl font-extrabold text-white"
                        : "text-white hover:font-extrabold"
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/services"}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded md:p-0 ${
                      isActive
                        ? "text-2xl font-extrabold text-white"
                        : "text-white hover:font-extrabold"
                    }`
                  }
                >
                  Services
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
            width: 12px;
            height: 12px;
            margin: 0 5px;
            border-radius: 50%;
            background-color: #333;
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
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }
        `}
      </style>
    </>
  );
}

export default Header;
