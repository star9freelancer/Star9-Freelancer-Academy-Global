import React from "react";
import { Bell, Award, Cpu, ShieldCheck, XCircle, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="absolute top-full right-0 mt-4 w-80 md:w-96 glass-dark border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden z-[100]"
    >
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Bell className="size-4 text-primary" />
           <h3 className="font-mono text-xs uppercase tracking-[0.4em] text-white">System Alerts</h3>
        </div>
        <button className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Clear All</button>
      </div>

      <div className="max-h-[400px] overflow-y-auto no-scrollbar py-2">
        {notifications.length === 0 ? (
          <div className="p-12 text-center space-y-3">
             <ShieldCheck className="size-8 text-white/10 mx-auto" />
             <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">No new operational alerts in the current sector.</p>
          </div>
        ) : (
          notifications.map((n, i) => (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={n.id} 
              className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all cursor-default relative group ${!n.isRead ? 'bg-primary/[0.03]' : ''}`}
            >
              {!n.isRead && <div className="absolute top-4 right-4 size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />}
              
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg border flex-shrink-0 size-9 flex items-center justify-center ${
                  n.type === 'merit' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                  n.type === 'system' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                  n.type === 'course' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                  'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'
                }`}>
                  {n.type === 'merit' && <Award className="size-4" />}
                  {n.type === 'system' && <Cpu className="size-4" />}
                  {n.type === 'course' && <CheckCircle2 className="size-4" />}
                  {n.type === 'community' && <MessageSquare className="size-4" />}
                </div>
                
                <div className="space-y-1 pr-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-black text-white/90">{n.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {n.message}
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 opacity-50">
                     <Clock className="size-2.5" />
                     <span className="text-[9px] font-mono uppercase tracking-widest">{n.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-4 bg-zinc-950/40 border-t border-white/5">
         <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-mono uppercase tracking-widest text-zinc-400 transition-all active:scale-95">
           View All Log Entries
         </button>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
