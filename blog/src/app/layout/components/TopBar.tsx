'use client';

import {
  MagnifyingGlassIcon,
  MoonIcon,
  SpeakerWaveIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
} from '@heroicons/react/24/solid';
import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Github, LanguagesIcon } from 'lucide-react';
import { categories } from '@/data/topBar';
import { usePathname, useRouter } from 'next/navigation';

const TopBar: FC = () => {
  // 移动端菜单状态
  const [menuOpen, setMenuOpen] = useState(false);
  // 主题配置
  const { setTheme, theme } = useTheme();
  // 获取当前路由地址
  const currentPathName = usePathname();
  const router = useRouter();

  // 图标动画
  const iconVariants = {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, delay: 1 },
    },
    hover: {
      scale: 1.2,
      color: '#3b82f6',
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: { scale: 0.9 },
  };

  const handleClick = (v: string) => {
    if (v === 'theme') theme === 'dark' ? setTheme('light') : setTheme('dark');
    if (v === 'github') window.open('https://github.com/zxxj', '_blank');
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 lg:px-56 dark:text-white">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 h-14">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 300 }}
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push('/home')}
        >
          Zhang Xinxin
        </motion.div>

        {/* 大屏菜单 */}
        <ul className="hidden md:flex gap-12 text-sm font-semibold">
          {categories.map((item) => {
            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  delay: 1.5,
                }}
                className="cursor-pointer"
                onClick={() => handleMenuClick(item.path)}
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      delay: 0,
                      duration: 0.2,
                    },
                  }}
                >
                  <Button
                    variant="ghost"
                    className={
                      currentPathName.startsWith(item.path)
                        ? 'underline scale-[1.1] bg-[#f5f5f5] dark:text-black dark:hover:bg-[#f5f5f5]'
                        : ''
                    }
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>

        {/* 图标栏 */}
        <div className="flex items-center md:gap-6 gap-3">
          <motion.div
            variants={iconVariants as Variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer "
          >
            <LanguagesIcon
              className="w-5 h-5 dark:text-white text-black"
              onClick={() => handleClick('lang')}
            />
          </motion.div>

          <motion.div
            variants={iconVariants as Variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer "
          >
            <MagnifyingGlassIcon
              className="w-5 h-5 dark:text-white text-black"
              onClick={() => handleClick('search')}
            />
          </motion.div>

          <motion.div
            variants={iconVariants as Variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer "
          >
            <SpeakerWaveIcon
              className="w-5 h-5 dark:text-white text-black"
              onClick={() => handleClick('music')}
            />
          </motion.div>

          <motion.div
            variants={iconVariants as Variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer dark:text-white text-black"
          >
            {theme === 'dark' ? (
              <SunIcon
                className="w-5 h-5  dark:text-white text-black"
                onClick={() => handleClick('theme')}
              />
            ) : (
              <MoonIcon
                className="w-5 h-5  dark:text-white text-black"
                onClick={() => handleClick('theme')}
              />
            )}
          </motion.div>

          <motion.div
            variants={iconVariants as Variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="cursor-pointer "
          >
            <Github
              className="w-5 h-5 dark:text-white text-black"
              onClick={() => handleClick('github')}
            />
          </motion.div>

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

      {/* 移动端菜单 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white dark:bg-black dark:text-white  overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-4 py-4">
              {categories.map((item, idx) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="text-sm font-semibold  cursor-pointer flex items-center"
                  onClick={() => handleMenuClick(item.path)}
                >
                  <div className="mr-1">{item.icon}</div>
                  {item.name}
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
