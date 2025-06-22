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
  const data = [
    {
      cover: '/projects/收费站.png',
    },
    {
      cover: '/projects/智慧小区.png',
    },
    {
      cover: '/projects/粮仓.png',
    },
    {
      cover: '/projects/机械.png',
    },
    {
      cover: '/projects/车.png',
    },
  ];
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border dark:text-white  overflow-y-auto opacity-90 h-[67vh] lg:h-[80vh] w-11/12 m-auto shadow-md shadow-black dark:shadow-white rounded-2xl  p-4 space-y-2 xl:w-full"
    >
      <div className="flex flex-wrap justify-start gap-6 ">
        {data.map((item) => (
          <SpotlightCard key={item.cover}>
            <Image
              src={item.cover}
              alt="收费站"
              width={500}
              height={100}
              className="w-full h-auto rounded-md"
            />
          </SpotlightCard>
        ))}
      </div>
    </motion.div>
  );
};

export default Wrapper;
