import React, { useState } from "react";
import { Link } from "react-router-dom";

const inputCls = "w-full bg-[#0a0f14] border border-[#4682A9]/30 rounded-[10px] px-4 py-3 text-[13.5px] text-[#F6F4EB] placeholder-[#F6F4EB]/20 outline-none focus:border-[#749BC2] focus:ring-2 focus:ring-[#749BC2]/10 transition-all";


const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1520] px-4 py-10">
      <div
        className="loginPage w-full max-w-[380px] rounded-2xl p-8"
        style={{
          background: "linear-gradient(145deg, #162233 0%, #0f1c2d 100%)",
          border: "1px solid rgba(70,130,169,0.35)",
          boxShadow: "0 0 0 1px rgba(145,200,228,0.04), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(145,200,228,0.07)",
        }}
      >

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#91c8e4]" style={{ boxShadow: "0 0 6px #91C8E4" }} />
          <span className="text-[10.5px] tracking-[0.2em] uppercase font-bold text-[#749BC2]">
            Vexa-Core
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[30px] font-bold text-[#91C8E4] leading-tight mb-1">
          Create Your Account 
        </h1>
        

        {/* Fields */}
        <div className="mb-4">
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#F6F4EB]/80 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            className={inputCls}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#F6F4EB]/80 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={inputCls}
          />
        </div>

        <div className="mb-7">
          <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#F6F4EB]/80 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={inputCls}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg font-bold text-[15px] text-[#0d1520] cursor-pointer transition-all hover:brightness-110 active:scale-[0.99]"
          style={{
            background: "linear-gradient(180deg, #91C8E4 0%, #749BC2 100%)",
            boxShadow: "0 2px 16px rgba(145,200,228,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          Register
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-[13px] text-[#F6F4EB]/50">
          Already have an account?{" "}
          <Link to="/login" className="text-[#91C8E4] font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;