'use client';

import { motion } from 'framer-motion';

const letters = ['x', 'i', 'n'];

export default function XinHandLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-transparent select-none">
      {/* “xin” 字母 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          y: [0, -15, 0],
          opacity: 1,
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror', // 关键
          duration: 2,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="flex space-x-8 text-8xl font-bold text-black dark:text-white"
      >
        {letters.map((letter) => (
          <div key={letter}>{letter}</div>
        ))}
      </motion.div>

      {/* 手掌 SVG 托举 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          y: [0, 5, 0],
          opacity: 1,
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror', // 关键
          duration: 2,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="mt-6"
        aria-hidden="true"
      >
        <svg
          width="100"
          height="60"
          viewBox="0 0 100 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black dark:text-white"
        >
          <path d="M10 50 Q30 20 50 50 T90 50" />
          <line x1="10" y1="50" x2="90" y2="50" />
        </svg>
      </motion.div>
    </div>
  );
}
