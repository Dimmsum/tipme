import React, { useState, useRef, useLayoutEffect } from "react";
import tipmeLogo from "../assets/tipme.png";
import {
  DollarSign,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth height handling via layout transitions
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.height = "auto";
      }
    });
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full opacity-20 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side Branding */}
        <div className="hidden md:block space-y-8">

          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Start Earning
              <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                {" "}
                More Tips
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of service workers who've increased their earnings
              with instant digital tips.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-1">
                5,000+
              </div>
              <div className="text-gray-600 text-sm">Active Workers</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-1">
                $2M+
              </div>
              <div className="text-gray-600 text-sm">Tips Processed</div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <LayoutGroup>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-400 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                Tip Me
              </span>
            </div>

            {/* Smooth Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8 relative overflow-hidden">
              <motion.div
                layoutId="activeTab"
                className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-700 to-blue-400 rounded-lg shadow-md"
                initial={false}
                animate={{
                  left: isLogin ? "4px" : "50%",
                  width: "calc(50% - 8px)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
              />
              <button
                onClick={() => setIsLogin(true)}
                className={`relative flex-1 py-3 px-4 font-semibold z-10 transition-colors ${
                  isLogin ? "text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`relative flex-1 py-3 px-4 font-semibold z-10 transition-colors ${
                  !isLogin ? "text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Animated Form Content */}
            <div ref={containerRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Heading */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {isLogin ? "Welcome Back!" : "Create Account"}
                    </h2>
                    <p className="text-gray-600">
                      {isLogin
                        ? "Sign in to access your dashboard"
                        : "Start earning tips in minutes"}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Sign Up Only */}
                    {!isLogin && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Role
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Server, Barista, Driver, etc."
                              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Shared Fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Checkbox / Terms */}
                    {isLogin ? (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">
                            Remember me
                          </span>
                        </label>
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Forgot password?
                        </a>
                      </div>
                    ) : (
                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-700 to-blue-400 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center space-x-2 shadow-lg"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
