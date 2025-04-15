
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  onClick?: () => void;
  hasNotification?: boolean;
  className?: string;
}

export const DashboardCard = ({
  title,
  value,
  description,
  icon: Icon,
  onClick,
  hasNotification = false,
  className = '',
}: DashboardCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card 
        className={`hover:shadow-md transition-shadow cursor-pointer border-[#333333] bg-[#111111] ${hasNotification ? 'border-white animate-pulse' : ''} ${className}`} 
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            {title}
          </CardTitle>
          <div className="relative">
            <Icon className="h-4 w-4 text-white" />
            {hasNotification && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-white rounded-full" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{value}</div>
          {description && <p className="text-xs text-[#999999]">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
};
