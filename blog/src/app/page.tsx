'use client';

import { FC } from 'react';
import { motion, Variants } from 'framer-motion';

// 动画配置
const containerVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.05, // 每个子元素延迟进入
      delay: 1.3,
    },
  },
};

const Index: FC = () => {
  return (
    <motion.div
      variants={containerVariants as Variants}
      initial="hidden"
      animate="visible"
      className="border dark:text-white dark:bg-zinc-900 overflow-y-auto opacity-90 h-[67vh] lg:h-[80vh] w-11/12 m-auto shadow-md shadow-black  dark:shadow-white rounded-2xl p-4 space-y-2 xl:w-full"
    >
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="p-3 dark:bg-zinc-800 rounded-md dark:hover:bg-zinc-700 transition"
        >
          内容 {i + 1}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Index;
