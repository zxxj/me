'use client';

import {
  MagnifyingGlassIcon,
  MoonIcon,
  SpeakerWaveIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { FC, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const categories = ['首页', '文章分类', '作品集', '关于我'];

const TopBar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const iconVariants = {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, delay: 0.5 },
    },
    hover: {
      scale: 1.2,
      color: '#3b82f6',
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: { scale: 0.9 },
  };

  return (
    <header className="relative text-white mt-5 my-8">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 h-14">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          className="text-xl font-bold cursor-default"
        >
          Zhang Xinxin
        </motion.div>

        {/* 大屏菜单 */}
        <ul className="hidden md:flex gap-12 text-sm font-semibold">
          {categories.map((item, idx) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1, color: '#3b82f6' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.1 * idx }}
              className="cursor-pointer"
            >
              {item}
            </motion.li>
          ))}
        </ul>

        {/* 图标栏 */}
        <div className="flex items-center md:gap-6 gap-4">
          {[MagnifyingGlassIcon, MoonIcon, SpeakerWaveIcon].map((Icon, idx) => (
            <motion.div
              key={idx}
              variants={iconVariants as Variants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer text-white"
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          ))}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <motion.div
              key={menuOpen ? 'close' : 'open'}
              initial={{ rotate: 0 }}
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* 下拉菜单（小屏幕） */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-black overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-4 py-4">
              {categories.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="text-sm font-semibold hover:text-blue-500 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopBar;
