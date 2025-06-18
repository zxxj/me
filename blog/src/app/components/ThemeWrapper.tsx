'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TopBar from './TopBar';
import Footer from './Footer';
import ThemeTransitionOverlay from './ThemeTransitionOverlay';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ThemeTransitionOverlay />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.4 }}
          className="md:w-9/12 m-auto "
        >
          <TopBar />
          {children}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ThemeWrapper;
