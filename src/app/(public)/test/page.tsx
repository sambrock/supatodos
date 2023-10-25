import { Button } from '@/components/common/Button';

export default async function Test() {
  return (
    <div className="container py-12 mx-auto flex gap-4">
      <Button>Test</Button>
      <Button variant="ghost">Test</Button>
      <Button variant="transparent"> Test</Button>
    </div>
  );
}
