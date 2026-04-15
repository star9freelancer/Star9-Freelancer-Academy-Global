import React from "react";
import { 
  Bell as BellIcon, 
  Award as AwardIcon, 
  BookOpen as BookOpenIcon, 
  CheckCircle2 as CheckCircle2Icon, 
  MessageSquare as MessageSquareIcon, 
  Clock as ClockIcon, 
  X as XIcon 
} from "lucide-react";
import { motion } from "framer-motion";

interface Notification {
  id: string;
  type: "merit" | "system" | "course" | "community";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const NotificationPanel = ({ notifications, onClose }: { notifications: Notification[], onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-[100]"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellIcon className="size-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        </div>
        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          <XIcon className="size-4" />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-10 text-center space-y-2">
            <BellIcon className="size-8 text-muted-foreground/30 mx-auto" />
            <p className="text-sm text-muted-foreground">No new notifications</p>
          </div>
        ) : (
          notifications.map((n, i) => (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              key={n.id} 
              className={`p-4 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-default ${!n.isRead ? 'bg-primary/5' : ''}`}
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg shrink-0 size-9 flex items-center justify-center ${
                  n.type === 'merit' ? 'bg-amber-500/10 text-amber-500' :
                  n.type === 'system' ? 'bg-blue-500/10 text-blue-500' :
                  n.type === 'course' ? 'bg-green-500/10 text-green-500' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {n.type === 'merit' && <AwardIcon className="size-4" />}
                  {n.type === 'system' && <BookOpenIcon className="size-4" />}
                  {n.type === 'course' && <CheckCircle2Icon className="size-4" />}
                  {n.type === 'community' && <MessageSquareIcon className="size-4" />}
                </div>
                
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                  <div className="flex items-center gap-1 pt-1">
                    <ClockIcon className="size-3 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  </div>
                </div>
                {!n.isRead && <div className="size-2 rounded-full bg-primary shrink-0 mt-1" />}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
