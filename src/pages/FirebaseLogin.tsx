import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebaseConfig";
import { FaGoogle, FaFacebookF, FaApple, FaMicrosoft } from "react-icons/fa";

const auth = getAuth(app);


const FirebaseAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Show popup after 2 minutes, but only once per user (per browser)
  useEffect(() => {
    const alreadyShown = localStorage.getItem("firebaseLoginPopupShown");
    if (alreadyShown) return;
    const timer = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem("firebaseLoginPopupShown", "true");
    }, 120000); // 2 minutes in ms
    return () => clearTimeout(timer);
  }, []);

  const getFriendlyError = (code: string) => {
            <div className="text-right">
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
    switch (code) {
      case "auth/user-not-found":
        return "No account found with that email.";
      case "auth/wrong-password":
        return "Invalid password. Please try again.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/");
    } catch (err: any) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      navigate("/");
    } catch (err: any) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err: any) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main login page content */}
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>

        {/* Email/Password form */}
  <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Continue" : "Sign up"}
          </button>
          {/* Show logged-in user email below the button if logged in */}
          {auth.currentUser && (
            <div className="mt-2 text-center text-sm text-gray-700">
              Logged in as: <span className="font-semibold">{auth.currentUser.email}</span>
            </div>
          )}
        </form>

        {/* Toggle between login/signup */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setMessage("");
            }}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social logins */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </button>

          <button
            onClick={() => alert("Microsoft login not implemented yet")}
            disabled={loading}
            className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaMicrosoft className="text-blue-600 text-lg" />
            Continue with Microsoft Account
          </button>

          <button
            onClick={() => alert("Apple login not implemented yet")}
            disabled={loading}
            className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaApple className="text-black text-lg" />
            Continue with Apple
          </button>

          <button
            onClick={handleFacebookLogin}
            disabled={loading}
            className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaFacebookF className="text-blue-600 text-lg" />
            Continue with Facebook
          </button>
        </div>

        {/* Error / Success messages */}
        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-center text-green-600 text-sm">{message}</p>
        )}
        </div>
      </div>

      {/* Popup modal after 2 minutes */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowPopup(false)}
              aria-label="Close"
            >   
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Login Required</h2>
            <p className="mb-4 text-center text-gray-600">Please log in to continue using the site.</p>
            <button
              className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900 transition"
              onClick={() => setShowPopup(false)}
            >
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FirebaseAuthPage;
