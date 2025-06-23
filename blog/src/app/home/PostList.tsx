'use client';

import { FC } from 'react';
import { motion, Variants } from 'framer-motion';

interface Props {
  data: any[];
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.7,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.05,
      stiffness: 100,
      delay: 1.3,
    },
  },
};

const PostList: FC<Props> = ({ data }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border dark:text-white  overflow-y-auto opacity-90 h-[67vh] lg:h-[80vh] w-11/12 m-auto shadow-md shadow-black dark:shadow-white rounded-2xl p-4 space-y-2 xl:w-full"
    >
      {data.map((_, i) => (
        <motion.div
          key={i}
          className="p-3 dark:bg-zinc-800 rounded-md dark:hover:bg-zinc-700 transition"
        >
          文章 {i + 1}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostList;
