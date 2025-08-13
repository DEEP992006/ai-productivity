// ./app/(root)/new/page.tsx
"use client"
import React, { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

const SecondMindLanding = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };
  
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <motion.header 
        className="container mx-auto px-4 py-6 flex justify-between items-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
            animate={pulseAnimation}
          >
            <span className="font-bold text-white">2M</span>
          </motion.div>
          <motion.span 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            whileHover={{ scale: 1.05 }}
          >
            2nd Mind
          </motion.span>
        </motion.div>
        <nav className="hidden md:flex space-x-8">
          {['Features', 'Solutions', 'Pricing'].map((item, index) => (
            <motion.a 
              key={index}
              href="#"
              className="hover:text-blue-500 transition-colors font-medium relative"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {item}
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <motion.button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} shadow-md`}
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
          <motion.button 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 30px rgba(99, 102, 241, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href='./signin'>Get Started</Link>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ x: 0 }}
              whileHover={{ 
                x: 5,
                transition: { type: "spring", stiffness: 500 }
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-12 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            variants={fadeInUp}
          >
            Your <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
            >
              AI-Powered
            </motion.span> Life Manager
          </motion.h1>
          <motion.p 
            className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            variants={fadeInUp}
          >
            Transform your productivity with intelligent journaling, mood-aware planning, and personalized habit tracking.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={fadeInUp}
          >
            <Link href="./signin">
            <motion.button 
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-lg hover:opacity-90 transition-opacity shadow-xl flex items-center justify-center space-x-2 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.5)" 
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span
                className="absolute inset-0 bg-white opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
             <span>Get Started</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                whileHover={{ 
                  x: 8,
                  transition: { type: "spring", stiffness: 500, mass: 0.5 }
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.button></Link>
            <motion.button 
              className={`px-8 py-4 rounded-xl font-medium text-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition-colors flex items-center justify-center space-x-2 shadow-lg`}
              whileHover={{ 
                scale: 1.05,
                x: 5,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span>Learn More</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ rotate: 0 }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 500 }
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Dashboard Preview from the provided file */}
          <motion.div 
            className="relative"
            animate={floatAnimation}
          >
            <div className="absolute -top-6 -right-6 w-full h-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-2xl"></div>
            <motion.div 
              className={`rounded-2xl p-6 shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-medium">Dashboard Preview</div>
              </div>
              {/* Dashboard Preview */}
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Today&#39;s Focus</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>3 tasks • 2 completed</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">Good Mood</div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Optimistic today</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Morning Routine", status: "80% complete", color: "green" },
                    { title: "Project Launch", status: "In progress", color: "blue" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold">{item.title}</div>
                          <div className={`text-sm ${item.color === 'green' ? 'text-green-500' : 'text-blue-500'}`}>{item.status}</div>
                        </div>
                        <div className={`w-10 h-10 rounded-full ${item.color === 'green' ? 'bg-green-500/20' : 'bg-blue-500/20'} flex items-center justify-center`}>
                          {item.color === 'green' ? '✓' : '⏳'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="font-bold mb-2">Mood Trend</div>
                  <div className="h-20 flex items-end space-x-1">
                    {[40, 60, 80, 50, 70, 90, 65].map((height, index) => (
                      <motion.div 
                        key={index} 
                        className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                        style={{ height: `${height}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 0.7 + index * 0.05 }}
                      ></motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          {/* AI Chat Popup from the provided file */}
          <motion.div 
            className={`absolute -bottom-6 -left-6 w-64 rounded-2xl p-4 shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-3">
              <motion.div 
                className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                AI
              </motion.div>
              <div className="font-bold">2nd Mind Assistant</div>
            </div>
            <motion.div 
              className={`text-sm p-3 rounded-lg mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Based on your mood, I suggest focusing on creative tasks today.
            </motion.div>
            <motion.div 
              className={`text-sm p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Would you like me to reschedule your meeting to tomorrow?
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={fadeInUp}
          >
            Intelligent Productivity Features
          </motion.h2>
          <motion.p 
            className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            variants={fadeInUp}
          >
            Designed for students, entrepreneurs, and anyone seeking peak performance
          </motion.p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
        >
          {[
            { 
              title: "Smart Journaling", 
              description: "AI-powered reflection that adapts to your thoughts and emotions",
              icon: "📝"
            },
            { 
              title: "Mood-Aware Planning", 
              description: "Task scheduling that considers your emotional state and energy levels",
              icon: "🧠"
            },
            { 
              title: "Habit Tracking", 
              description: "Personalized habit formation with predictive success modeling",
              icon: "🔁"
            },
            { 
              title: "Daily Intelligence", 
              description: "Proactive suggestions based on patterns in your behavior",
              icon: "⚡"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className={`rounded-2xl p-6 transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg hover:shadow-xl relative overflow-hidden group`}
              variants={fadeInUp}
              whileHover={{ 
                y: -12, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 rounded-2xl"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="text-3xl mb-4"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-2"
                  whileHover={{ x: 5 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className={darkMode ? 'text-gray-400' : 'text-gray-600'}
                  whileHover={{ color: darkMode ? '#93c5fd' : '#3b82f6' }}
                >
                  {feature.description}
                </motion.p>
              </div>
              {/* Animated border effect */}
              <motion.div 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} relative overflow-hidden`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <motion.div 
            className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" as const }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-purple-500"
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              How 2nd Mind Works
            </motion.h2>
            <motion.p 
              className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              variants={fadeInUp}
            >
              Simple steps to transform your daily productivity
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                step: "01",
                title: "Connect Your Life",
                description: "Sync your calendar, habits, and goals in one place"
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our system learns your patterns and preferences"
              },
              {
                step: "03",
                title: "Smart Guidance",
                description: "Receive personalized recommendations daily"
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center relative overflow-hidden group`}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated corner element */}
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  {step.step}
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className={darkMode ? 'text-gray-400' : 'text-gray-600'}
                  whileHover={{ y: -2 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="container mx-auto px-4 py-24 text-center relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* Animated background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-20"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.div 
          className="max-w-3xl mx-auto relative z-10"
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={fadeInUp}
          >
            Ready to Amplify Your Mind?
          </motion.h2>
          <motion.p 
            className={`text-xl mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            variants={fadeInUp}
          >
            Join thousands of students and entrepreneurs who have transformed their productivity
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            variants={fadeInUp}
          ><Link href="./signin">
            <motion.button 
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-lg hover:opacity-90 transition-opacity shadow-2xl flex items-center justify-center space-x-2 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 30px 60px -15px rgba(99, 102, 241, 0.6)" 
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
             <span>Get Started</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: 0 }}
                whileHover={{ 
                  x: 8,
                  transition: { type: "spring", stiffness: 500, mass: 0.5 }
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.button></Link>
            <motion.button 
              className={`px-8 py-4 rounded-xl font-medium text-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition-colors flex items-center justify-center space-x-2 shadow-lg`}
              whileHover={{ 
                scale: 1.05,
                x: 5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span>Learn More</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ rotate: 0 }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 500 }
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center space-x-2 mb-4">
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="font-bold text-white text-sm">2M</span>
                </motion.div>
                <span className="text-xl font-bold">2nd Mind</span>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Your AI-powered personal life manager for peak productivity.
              </p>
            </motion.div>
            {[
              {
                title: "Product",
                items: ["Features", "Solutions", "Pricing", "Integrations"]
              },
              {
                title: "Resources",
                items: ["Documentation", "Blog", "Tutorials", "Support"]
              },
              {
                title: "Company",
                items: ["About", "Careers", "Contact", "Privacy Policy"]
              }
            ].map((section, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {section.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex items-center"
                    >
                      <a href="#" className="hover:text-blue-500 transition-colors flex items-center">
                        {item}
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          initial={{ opacity: 0, x: -5 }}
                          whileHover={{ 
                            opacity: 1,
                            x: 0,
                            scale: 1.2,
                            transition: { type: "spring", stiffness: 500 }
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className={`border-t mt-12 pt-8 text-center ${darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            &copy; 2025 2nd Mind. All rights reserved.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default SecondMindLanding;