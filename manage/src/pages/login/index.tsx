import { FC, lazy } from 'react';
import { motion } from 'framer-motion';

const LoginForm = lazy(() => import('./LoginForm'));

const Login: FC = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col md:flex-row w-full h-full !overflow-hidden">
        {/* 左侧 */}
        <motion.div
          className="flex-1 bg-violet-700"
          initial={{ x: -1600, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          1
        </motion.div>

        {/* 右侧登录表单 */}
        <motion.div
          className="w-full px-4 md:w-1/3 md:px-0 flex items-center justify-center	"
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
