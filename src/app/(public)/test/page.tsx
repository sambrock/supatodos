import { MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { ButtonIcon } from '@/components/common/ButtonIcon';

export default async function Test() {
  return (
    <div className="container py-12 mx-auto flex gap-4">
      <Button>Test</Button>
      <Button variant="ghost">Test</Button>

      <ButtonIcon icon={<X className="h-4 w-4" />} />
      <ButtonIcon variant="ghost" icon={<MoreHorizontal className="h-4 w-4" />} />
    </div>
  );
}
