import Wrapper from './Wrapper';
import { Suspense } from 'react';

export default async function ProjectsPage() {
  await new Promise((res) => setTimeout(res, 3000));

  return (
    <Suspense>
      <Wrapper />
    </Suspense>
  );
}
