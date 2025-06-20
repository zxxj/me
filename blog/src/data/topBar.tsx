import {
  HomeIcon,
  PawPrintIcon,
  ShapesIcon,
  SquareUserRoundIcon,
} from 'lucide-react';

export const categories = [
  {
    icon: <HomeIcon />,
    name: '首页',
    path: '/home',
  },
  {
    icon: <ShapesIcon />,
    name: '文章分类',
    path: '/category',
  },
  {
    icon: <PawPrintIcon />,
    name: '作品集',
    path: '/projects',
  },
  {
    icon: <SquareUserRoundIcon />,
    name: '关于我',
    path: '/about',
  },
];
