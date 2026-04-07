import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Send, Hash, Users, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CommunityChatProps {
  user: any;
  profile: any;
}

interface ChatGroup {
  id: string;
  name: string;
  type: "general" | "course";
  course_id: string | null;
}

interface ChatMessage {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  created_at: string;
  sender_name?: string;
}

const CommunityChat = ({ user, profile }: CommunityChatProps) => {
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [myGroupIds, setMyGroupIds] = useState<Set<string>>(new Set());
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [profileCache, setProfileCache] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Load groups and memberships
  useEffect(() => {
    if (!user) return;

    const loadGroups = async () => {
      // Get all groups
      const { data: allGroups } = await supabase
        .from("chat_groups")
        .select("*")
        .order("type", { ascending: true })
        .order("name", { ascending: true });

      // Get my enrollments to filter course groups
      const { data: enrollments } = await supabase
        .from("user_enrollments")
        .select("course_id")
        .eq("user_id", user.id);

      const enrolledIds = new Set((enrollments || []).map(e => e.course_id));

      if (allGroups) {
        // Only show general groups OR course groups you are enrolled in
        const filteredGroups = allGroups.filter(g => 
          g.type === "general" || enrolledIds.has(g.course_id)
        );
        setGroups(filteredGroups);
      }

      // Get my memberships
      const { data: memberships } = await supabase
        .from("chat_members")
        .select("group_id")
        .eq("user_id", user.id);

      const memberSet = new Set((memberships || []).map((m: any) => m.group_id));

      // Auto-join General if not already a member
      const generalGroup = (allGroups || []).find((g: ChatGroup) => g.type === "general");
      if (generalGroup && !memberSet.has(generalGroup.id)) {
        const { error } = await supabase
          .from("chat_members")
          .insert({ group_id: generalGroup.id, user_id: user.id });
        if (!error) memberSet.add(generalGroup.id);
      }

      setMyGroupIds(memberSet);

      // Auto-select General
      if (generalGroup) setActiveGroupId(generalGroup.id);
    };

    loadGroups();
  }, [user]);

  // Load messages for active group
  useEffect(() => {
    if (!activeGroupId) return;

    const loadMessages = async () => {
      setLoadingMessages(true);
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("group_id", activeGroupId)
        .order("created_at", { ascending: true })
        .limit(100);

      if (data) {
        // Fetch sender names for all unique user IDs
        const userIds = [...new Set(data.map((m: any) => m.user_id))];
        const unknownIds = userIds.filter((id) => !profileCache[id]);

        if (unknownIds.length > 0) {
          const { data: profiles } = await supabase
            .from("profiles")
            .select("id, full_name")
            .in("id", unknownIds);

          if (profiles) {
            const newCache = { ...profileCache };
            profiles.forEach((p: any) => {
              newCache[p.id] = p.full_name || "Anonymous";
            });
            setProfileCache(newCache);
          }
        }

        setMessages(data);
      }
      setLoadingMessages(false);
    };

    loadMessages();
  }, [activeGroupId]);

  // Realtime subscription
  useEffect(() => {
    if (!activeGroupId) return;

    const channel = supabase
      .channel(`chat-${activeGroupId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `group_id=eq.${activeGroupId}`,
        },
        async (payload: any) => {
          const newMsg = payload.new as ChatMessage;

          // Fetch sender name if not cached
          if (!profileCache[newMsg.user_id]) {
            const { data: senderProfile } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", newMsg.user_id)
              .single();

            if (senderProfile) {
              setProfileCache((prev) => ({
                ...prev,
                [newMsg.user_id]: senderProfile.full_name || "Anonymous",
              }));
            }
          }

          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeGroupId, profileCache]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async () => {
    if (!newMessage.trim() || !activeGroupId || sending) return;

    const content = newMessage.trim();
    setNewMessage("");
    setSending(true);

    const { error } = await supabase.from("chat_messages").insert({
      group_id: activeGroupId,
      user_id: user.id,
      content,
    });

    if (error) {
      toast.error("Failed to send message");
      setNewMessage(content); // restore
    }

    setSending(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const activeGroup = groups.find((g) => g.id === activeGroupId);
  const myGroups = groups.filter((g) => myGroupIds.has(g.id));

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return d.toLocaleDateString([], { month: "short", day: "numeric" }) + " " +
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6 max-w-full relative z-10 shrink-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">
          Chat with fellow students, share insights, and connect.
        </p>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-4 h-[600px]">
        {/* Sidebar: Groups */}
        <Card className="glass border-border/50 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/50">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Users className="size-3" /> Your Groups
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {myGroups.length === 0 ? (
              <p className="text-xs text-muted-foreground p-4 text-center">
                No groups yet. Join a course to unlock course chats!
              </p>
            ) : (
              myGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                    activeGroupId === group.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "hover:bg-muted/50 border border-transparent"
                  }`}
                >
                  <Hash className="size-4 shrink-0 opacity-50" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{group.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {group.type === "general" ? "Everyone" : "Course"}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Main Chat Area */}
        <Card className="glass border-border/50 overflow-hidden flex flex-col">
          {!activeGroupId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageSquare className="size-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-sm">
                Select a group to start chatting
              </p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="size-4 text-primary" />
                  <div>
                    <p className="text-sm font-bold">{activeGroup?.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {activeGroup?.type === "general"
                        ? "Open to all members"
                        : "Course discussion"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-[9px] font-mono uppercase tracking-widest"
                >
                  Live
                </Badge>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageSquare className="size-10 text-muted-foreground/20 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      No messages yet. Be the first to say something!
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.user_id === user.id;
                    const senderName =
                      profileCache[msg.user_id] ||
                      (isMe ? profile?.full_name : "Loading...");

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${
                          isMe ? "flex-row-reverse" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 uppercase ${
                            isMe
                              ? "bg-primary/20 text-primary"
                              : "bg-secondary/20 text-secondary"
                          }`}
                        >
                          {(senderName || "?").charAt(0)}
                        </div>

                        {/* Bubble */}
                        <div
                          className={`max-w-[70%] ${
                            isMe ? "text-right" : "text-left"
                          }`}
                        >
                          <div className="flex items-baseline gap-2 mb-0.5">
                            <span
                              className={`text-xs font-bold ${
                                isMe
                                  ? "text-primary"
                                  : "text-foreground"
                              }`}
                            >
                              {isMe ? "You" : senderName}
                            </span>
                            <span className="text-[9px] text-muted-foreground">
                              {formatTime(msg.created_at)}
                            </span>
                          </div>
                          <div
                            className={`inline-block px-3 py-2 rounded-xl text-sm leading-relaxed ${
                              isMe
                                ? "bg-primary/10 text-foreground rounded-tr-sm"
                                : "bg-muted/50 text-foreground rounded-tl-sm"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    placeholder={`Message #${activeGroup?.name || "channel"}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={2000}
                    className="flex-1 bg-muted/30 border-border/50"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!newMessage.trim() || sending}
                  >
                    {sending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CommunityChat;
