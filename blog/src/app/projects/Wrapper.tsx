'use client';

import { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import Image from 'next/image'; // 引入 next/image

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
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

const Wrapper: FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border dark:text-white  overflow-y-auto opacity-90 h-[67vh] lg:h-[80vh] w-11/12 m-auto shadow-md shadow-black dark:shadow-white rounded-2xl  p-4 space-y-2 xl:w-full"
    >
      <div className="flex flex-wrap justify-start gap-y-4 ">
        <SpotlightCard></SpotlightCard>
      </div>
    </motion.div>
  );
};

export default Wrapper;
