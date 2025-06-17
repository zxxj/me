'use client';

import {
  MagnifyingGlassIcon,
  MoonIcon,
  SpeakerWaveIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { FC, useState } from 'react';

const TopBar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ['首页', '文章分类', '作品集', '关于我'];

  return (
    <header className="relative text-white mt-5 my-8">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between px-4 h-14">
        <div className="text-xl font-bold">Zhang Xinxin</div>

        {/* 大屏菜单 */}
        <ul className="hidden md:flex gap-12 text-sm font-semibold">
          {categories.map((item) => (
            <li key={item} className="hover:text-blue-500 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>

        {/* 图标栏 */}
        <div className="flex items-center md:gap-6 gap-4">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <MoonIcon className="w-5 h-5" />
          <SpeakerWaveIcon className="w-5 h-5" />
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 下拉菜单（小屏幕） */}
      <div
        className={`
          md:hidden
          overflow-hidden
          bg-black
          transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-60 py-4' : 'max-h-0 py-0'}
        `}
      >
        <ul className="flex flex-col items-center gap-4">
          {categories.map((item) => (
            <li
              key={item}
              className="text-sm font-semibold hover:text-blue-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default TopBar;
