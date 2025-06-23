'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeTransitionOverlay = () => {
  const [show, setShow] = useState(true);
  const { resolvedTheme } = useTheme(); // 读取当前生效主题
  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 1000); // 动画时长
    return () => clearTimeout(timeout);
  }, []);
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none dark:border-e-gray-950 bg-amber-50 bg-cover bg-center bg-no-repeat	 bg-origin-border	"
      initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
      animate={{ clipPath: 'circle(150% at 50% 50%)', opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      style={{
        backgroundImage: `url(/bg5.jpg)`,
      }}
    />
  );
};

export default ThemeTransitionOverlay;
