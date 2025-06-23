'use client';

import { FC, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { toast } from 'sonner';
import { Post } from '@/app/service/modules/post/type';
import Image from 'next/image';
import { EyeIcon, ThumbsUpIcon, MessageCircleMoreIcon } from 'lucide-react';

interface Props {
  data: Post[];
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
  useEffect(() => {
    if (!data) toast.error('文章列表请求失败!');
  }, [data]);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border dark:text-white  overflow-y-auto opacity-90 h-[67vh] lg:h-[80vh] w-11/12 m-auto shadow-md shadow-black dark:shadow-white rounded-2xl p-4 space-y-2 xl:w-full"
    >
      {data.length > 0 ? (
        data.map((item) => (
          <motion.div
            key={item.cover}
            className="
              lg:flex p-3 rounded-md transition-all duration-300 ease-in-out cursor-pointer
              border border-transparent
              hover:border-b-[1px] hover:border-b-black
              dark:hover:border-b-white
              hover:scale-[1.01]
              border-b-[1px]
              border-b-gray-300
              dark:border-b-gray-700
            "
          >
            <img
              src={`http://localhost:9000/${item.cover.replaceAll('\\', '/')}`}
              className="w-full h-32 lg:h-20 rounded-md lg:w-40"
            />
            <div className="lg:ml-4 mt-2 lg:mt-0 lg:flex lg:flex-col justify-between">
              <div className="text-lg font-bold">{item.title}</div>
              <div className="text-sm text-gray-500 mt-[-5px] dark:text-gray-100">
                {item.summary}
              </div>
              <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-100">
                <div>{item.author.username}</div>
                <div className="flex gap-x-1 items-center">
                  <EyeIcon className="w-4 h-4" />
                  {item.viewCount}
                </div>
                <div className="flex gap-x-1">
                  <ThumbsUpIcon className="w-4 h-4" />
                  {item.likeCount}
                </div>
                <div className="flex gap-x-1">
                  <MessageCircleMoreIcon className="w-4 h-4" />
                  {item.commentCount}
                </div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/state/noData.svg"
            width={600}
            height={500}
            alt="暂无数据"
          />
          <div className="mt-10">暂无数据</div>
        </div>
      )}
    </motion.div>
  );
};

export default PostList;
