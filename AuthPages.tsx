import React, { useState } from "react";
import { useAppContext } from "../App";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";

export function AuthPages() {
  const { currentPage, setCurrentPage, setUser } =
    useAppContext();
  const [authMode, setAuthMode] = useState("login"); // login, register, forgot-password, otp
  const [selectedRole, setSelectedRole] = useState<
    "freelancer" | "client"
  >("freelancer");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    otp: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === "login") {
      // Mock login
      setUser({
        isLoggedIn: true,
        role: selectedRole,
        name: "John Doe",
        email: formData.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      });
      setCurrentPage(
        selectedRole === "freelancer"
          ? "freelancer-dashboard"
          : "client-dashboard",
      );
    } else if (authMode === "register") {
      setAuthMode("otp");
    } else if (authMode === "otp") {
      // Mock OTP verification
      setUser({
        isLoggedIn: true,
        role: selectedRole,
        name: formData.fullName,
        email: formData.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      });
      setCurrentPage(
        selectedRole === "freelancer"
          ? "freelancer-dashboard"
          : "client-dashboard",
      );
    } else if (authMode === "forgot-password") {
      setAuthMode("otp");
    }
  };

  const renderLogin = () => (
    <Card className="w-full max-w-md nexlance-shadow border-0">
      <CardHeader className="text-center">
        <div className="text-2xl font-bold text-[#1B2C4A] mb-2">
          Welcome Back!
        </div>
        <CardTitle className="text-gray-600">
          Sign in to your account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-[#1B2C4A]">
              I am a:
            </Label>
            <RadioGroup
              value={selectedRole}
              onValueChange={(value: "freelancer" | "client") =>
                setSelectedRole(value)
              }
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem
                  value="freelancer"
                  id="freelancer-login"
                />
                <Label
                  htmlFor="freelancer-login"
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">Freelancer</div>
                  <div className="text-sm text-gray-500">
                    Looking for projects
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem
                  value="client"
                  id="client-login"
                />
                <Label
                  htmlFor="client-login"
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">Client</div>
                  <div className="text-sm text-gray-500">
                    Need to hire talent
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => setAuthMode("forgot-password")}
              className="text-sm text-[#4DAFFF] hover:text-[#4DAFFF]/80 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white nexlance-button-shadow"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6">
          <Separator className="mb-6" />
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => setAuthMode("register")}
              className="text-[#4DAFFF] hover:text-[#4DAFFF]/80 font-medium transition-colors"
            >
              Sign up now
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderRegister = () => (
    <Card className="w-full max-w-md nexlance-shadow border-0">
      <CardHeader className="text-center">
        <div className="text-2xl font-bold text-[#1B2C4A] mb-2">
          Join Nexlance
        </div>
        <CardTitle className="text-gray-600">
          Create your account
        </CardTitle>
        <Badge
          variant="secondary"
          className="bg-[#FFE5F1] text-[#FF4D6D] border-none mt-2"
        >
          🇮🇳 Welcome to India's Premier Freelance Platform
        </Badge>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-[#1B2C4A]">
              I want to:
            </Label>
            <RadioGroup
              value={selectedRole}
              onValueChange={(value: "freelancer" | "client") =>
                setSelectedRole(value)
              }
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem
                  value="freelancer"
                  id="freelancer-register"
                />
                <Label
                  htmlFor="freelancer-register"
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">Find Work</div>
                  <div className="text-sm text-gray-500">
                    Browse projects and apply to jobs
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem
                  value="client"
                  id="client-register"
                />
                <Label
                  htmlFor="client-register"
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">Hire Talent</div>
                  <div className="text-sm text-gray-500">
                    Post projects and find freelancers
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-register">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="email-register"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 Enter your phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-register">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password-register"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
            By creating an account, you agree to Nexlance's
            Terms of Service and Privacy Policy. KYC
            verification may be required for account activation.
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white nexlance-button-shadow"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6">
          <Separator className="mb-6" />
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => setAuthMode("login")}
              className="text-[#4DAFFF] hover:text-[#4DAFFF]/80 font-medium transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOTP = () => (
    <Card className="w-full max-w-md nexlance-shadow border-0">
      <CardHeader className="text-center">
        <div className="text-2xl font-bold text-[#1B2C4A] mb-2">
          Verify Your Account
        </div>
        <CardTitle className="text-gray-600">
          We've sent a verification code to
          <br />
          <span className="text-[#FF4D6D]">
            {formData.email}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter 6-digit code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={formData.otp}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otp: e.target.value,
                })
              }
              className="text-center text-2xl tracking-widest"
              maxLength={6}
              required
            />
          </div>

          <div className="text-center text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-[#4DAFFF] hover:text-[#4DAFFF]/80 font-medium transition-colors"
            >
              Resend Code
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white nexlance-button-shadow"
          >
            Verify & Continue
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() =>
              setAuthMode(
                authMode === "otp" && formData.fullName
                  ? "register"
                  : "forgot-password",
              )
            }
            className="flex items-center justify-center text-sm text-gray-600 hover:text-[#1B2C4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to{" "}
            {authMode === "otp" && formData.fullName
              ? "registration"
              : "login"}
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const renderForgotPassword = () => (
    <Card className="w-full max-w-md nexlance-shadow border-0">
      <CardHeader className="text-center">
        <div className="text-2xl font-bold text-[#1B2C4A] mb-2">
          Reset Password
        </div>
        <CardTitle className="text-gray-600">
          Enter your email address and we'll send you a reset
          code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-forgot">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                id="email-forgot"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white nexlance-button-shadow"
          >
            Send Reset Code
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode("login")}
            className="flex items-center justify-center text-sm text-gray-600 hover:text-[#1B2C4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const getCurrentAuthMode = () => {
    if (
      currentPage === "otp-verification" ||
      authMode === "otp"
    )
      return "otp";
    if (
      currentPage === "forgot-password" ||
      authMode === "forgot-password"
    )
      return "forgot-password";
    if (currentPage === "register" || authMode === "register")
      return "register";
    return "login";
  };

  const currentAuthMode = getCurrentAuthMode();

  return (
    <div className="min-h-screen nexlance-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-6">
          <button
            onClick={() => setCurrentPage("landing")}
            className="flex items-center text-[#1B2C4A] hover:text-[#FF4D6D] transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="space-y-6">
            <div className="text-4xl font-bold text-[#1B2C4A]">
              Nexlance
            </div>
            <div className="text-xl text-gray-600">
              Connect. Collaborate. Create.
            </div>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FF4D6D] rounded-full"></div>
                <span>50,000+ verified freelancers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#4DAFFF] rounded-full"></div>
                <span>10,000+ successful projects</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FF4D6D] rounded-full"></div>
                <span>₹50 Cr+ in total earnings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Mobile back button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setCurrentPage("landing")}
                className="flex items-center text-[#1B2C4A] hover:text-[#FF4D6D] transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>

            {currentAuthMode === "login" && renderLogin()}
            {currentAuthMode === "register" && renderRegister()}
            {currentAuthMode === "otp" && renderOTP()}
            {currentAuthMode === "forgot-password" &&
              renderForgotPassword()}
          </div>
        </div>
      </div>
    </div>
  );
}