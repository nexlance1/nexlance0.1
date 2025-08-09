import React from 'react';
import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-[#1B2C4A] via-[#2A3F5F] to-[#1B2C4A] flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-[#4DAFFF]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#FF4D6D]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] rounded-2xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(77, 175, 255, 0.3)",
                  "0 0 40px rgba(255, 77, 109, 0.3)",
                  "0 0 20px rgba(77, 175, 255, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.span 
                className="text-3xl font-bold text-white"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                N
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            {"Nexlance".split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.1,
                  duration: 0.5
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p 
            className="text-[#4DAFFF] font-medium text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Empowering India's Freelancers — One Project at a Time 🇮🇳
          </motion.p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center space-x-2 mb-4">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-[#FF4D6D] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto bg-white/10 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </div>
        </motion.div>

        {/* Status Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <motion.p 
            className="text-white/70 text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Loading your freelance journey...
          </motion.p>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#4DAFFF]/30 rounded-full"
              style={{
                left: `${20 + (i * 12)}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}