'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 200,
        delay: 2,
      }}
      className="text-white mt-5 text-center"
    >
      <div>备案信息</div>
    </motion.footer>
  );
};

export default Footer;
