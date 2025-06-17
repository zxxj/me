'use client';

import { FC } from 'react';
import { delay, motion } from 'framer-motion';

// 动画配置
const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.05, // 每个子元素延迟进入
      delay: 1.5,
    },
  },
};

const Home: FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border text-white bg-zinc-900 overflow-y-auto opacity-90 max-h-[80vh] w-11/12 m-auto shadow-lg shadow-white rounded-2xl p-4 space-y-2 xl:w-full"
    >
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="p-3 bg-zinc-800 rounded-md hover:bg-zinc-700 transition"
        >
          内容 {i + 1}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Home;
