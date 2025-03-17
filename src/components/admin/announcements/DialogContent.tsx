
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent as ShadcnDialogContent
} from '@/components/ui/dialog';

interface DialogContentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const DialogContent = ({
  title,
  description,
  children,
  maxWidth = "max-w-md"
}: DialogContentProps) => {
  return (
    <ShadcnDialogContent className={maxWidth}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
    </ShadcnDialogContent>
  );
};
