import { getPostList } from '@/app/service/modules/index';
import Wrapper from './Wrapper';

export default async function ProjectsPage() {
  await new Promise((res) => setTimeout(res, 3000));

  return <Wrapper />;
}
