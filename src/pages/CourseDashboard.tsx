import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useAcademyData } from "@/hooks/useAcademyData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, CheckCircle, Upload, Mail, Phone, MapPin, Calendar, PlayCircle, Lock, Clock, Lightbulb, Wrench, CheckSquare, AlertTriangle, ClipboardList, ChevronDown, ChevronRight, Bell } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo_highres_transparent.png";

const CourseDashboard = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user, profile, refreshProfile } = useAuth();
    const { courses } = useAcademyData();
    const [activeTab, setActiveTab] = useState("overview");
    const [progress, setProgress] = useState(0);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [profileForm, setProfileForm] = useState({
        full_name: profile?.full_name || "",
        phone_number: profile?.phone_number || "",
        bio: profile?.bio || "",
        country: profile?.country || "",
        city: profile?.city || "",
        date_of_birth: profile?.date_of_birth || "",
    });
    const [uploading, setUploading] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(profile?.avatar_url || "");
    const [courseData, setCourseData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set(['week1'])); // Week 1 expanded by default
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set()); // Track expanded modules

    // Get course from CURRICULUM_LEDGER via useAcademyData
    const course = courses.find(c => c.id === courseId);

    // New structure: modules come from CURRICULUM_LEDGER
    const weeks = course?.modules || [];

    // Helper function to get all lessons in sequential order
    const getAllLessons = () => {
        const allLessons: any[] = [];
        weeks.forEach((week: any) => {
            week.modules?.forEach((module: any) => {
                module.lessons?.forEach((lesson: any) => {
                    allLessons.push(lesson);
                });
            });
        });
        return allLessons;
    };

    // Helper function to get next lesson
    const getNextLesson = (currentLessonId: string) => {
        const allLessons = getAllLessons();
        const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
        if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
            return allLessons[currentIndex + 1];
        }
        return null;
    };

    const toggleWeek = (weekId: string) => {
        const newExpanded = new Set(expandedWeeks);
        if (newExpanded.has(weekId)) {
            newExpanded.delete(weekId);
        } else {
            newExpanded.add(weekId);
        }
        setExpandedWeeks(newExpanded);
    };

    const toggleModule = (moduleId: string) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    };

    // Helper function to render lesson notes (plain text with markdown-style formatting)
    const renderLessonNotes = (notes: string) => {
        if (!notes) return null;

        // Normalize line endings (handle both \r\n and \n)
        const normalizedNotes = notes.replace(/\r\n/g, '\n');

        // Helper to format bold text
        const formatBoldText = (text: string) => {
            const parts = text.split('**');
            return parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
            );
        };

        // Split by double newlines for blocks
        const blocks = normalizedNotes.split('\n\n');
        const sections: any[] = [];
        let currentSection: any = null;

        blocks.forEach((block) => {
            const trimmedBlock = block.trim();
            if (!trimmedBlock) return;

            // Check if it's a heading (starts with **)
            if (trimmedBlock.startsWith('**') && trimmedBlock.includes('**')) {
                const headingMatch = trimmedBlock.match(/^\*\*(.+?)\*\*/);
                if (headingMatch) {
                    // Save previous section
                    if (currentSection) {
                        sections.push(currentSection);
                    }

                    // Start new section
                    const heading = headingMatch[1];
                    const rest = trimmedBlock.substring(headingMatch[0].length).trim();

                    currentSection = {
                        type: 'section',
                        heading: heading,
                        content: rest ? [rest] : []
                    };
                    return;
                }
            }

            // Check if it's a table
            if (trimmedBlock.includes('|') && trimmedBlock.split('\n').length > 2) {
                const lines = trimmedBlock.split('\n').filter(line => line.trim());
                if (lines.length >= 2 && lines[1].includes('---')) {
                    const tableData = {
                        type: 'table',
                        headers: lines[0].split('|').map(h => h.trim()).filter(h => h),
                        rows: lines.slice(2).map(line =>
                            line.split('|').map(cell => cell.trim()).filter(cell => cell)
                        )
                    };

                    if (currentSection) {
                        currentSection.content.push(tableData);
                    } else {
                        sections.push(tableData);
                    }
                    return;
                }
            }

            // Add content to current section or as standalone
            if (currentSection) {
                currentSection.content.push(trimmedBlock);
            } else {
                sections.push({ type: 'text', content: trimmedBlock });
            }
        });

        // Don't forget the last section
        if (currentSection) {
            sections.push(currentSection);
        }

        return (
            <div className="space-y-6">
                {sections.map((section, idx) => {
                    // Render table
                    if (section.type === 'table') {
                        return (
                            <div key={idx} className="overflow-hidden rounded-xl shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-primary/5 to-primary/10">
                                        <tr>
                                            {section.headers.map((header: string, i: number) => (
                                                <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                                    {formatBoldText(header)}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {section.rows.map((row: string[], i: number) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                {row.map((cell: string, j: number) => (
                                                    <td key={j} className="px-6 py-4 text-sm text-gray-700 leading-relaxed">
                                                        {formatBoldText(cell)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }

                    // Render section with heading
                    if (section.type === 'section') {
                        return (
                            <div key={idx} className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {section.heading}
                                </h3>
                                <div className="space-y-3">
                                    {section.content.map((item: any, i: number) => {
                                        // If it's a table object
                                        if (typeof item === 'object' && item.type === 'table') {
                                            return (
                                                <div key={i} className="overflow-hidden rounded-xl shadow-sm">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gradient-to-r from-primary/5 to-primary/10">
                                                            <tr>
                                                                {item.headers.map((header: string, hi: number) => (
                                                                    <th key={hi} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                                                                        {formatBoldText(header)}
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-100">
                                                            {item.rows.map((row: string[], ri: number) => (
                                                                <tr key={ri} className="hover:bg-gray-50 transition-colors">
                                                                    {row.map((cell: string, ci: number) => (
                                                                        <td key={ci} className="px-6 py-4 text-sm text-gray-700 leading-relaxed">
                                                                            {formatBoldText(cell)}
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        }

                                        // Check if it's a bullet list
                                        if (item.startsWith('•') || item.startsWith('-')) {
                                            const items = item.split('\n').filter((line: string) => line.trim());
                                            return (
                                                <ul key={i} className="space-y-2.5">
                                                    {items.map((listItem: string, li: number) => {
                                                        const cleanItem = listItem.replace(/^[•\-]\s*/, '');
                                                        return (
                                                            <li key={li} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                                                                <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                                                <span className="flex-1">{formatBoldText(cleanItem)}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            );
                                        }

                                        // Convert regular text to clean paragraph
                                        return (
                                            <p key={i} className="text-gray-700 leading-relaxed">
                                                {formatBoldText(item)}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    // Render standalone text
                    const content = section.content;
                    const sentences = content.split(/\.\s+|\:\s+/).filter((s: string) => s.trim());

                    if (sentences.length > 1) {
                        return (
                            <div key={idx} className="space-y-2.5">
                                {sentences.map((sentence: string, si: number) => (
                                    <div key={si} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                        <span className="flex-1">{formatBoldText(sentence.trim())}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    return (
                        <p key={idx} className="text-gray-700 leading-relaxed">
                            {formatBoldText(content)}
                        </p>
                    );
                })}
            </div>
        );
    };

    // Helper function to render structured lesson content (for backward compatibility)
    const renderLessonContent = (content: any) => {
        if (!content) return null;

        if (typeof content === 'string') {
            return renderLessonNotes(content);
        }

        // Handle structured content (new format from database)
        if (content.sections && Array.isArray(content.sections)) {
            return (
                <div className="space-y-8">
                    {content.sections.map((section: any, idx: number) => (
                        <div key={idx} className="space-y-4">
                            {section.heading && (
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.heading}</h3>
                            )}

                            {section.points && Array.isArray(section.points) && (
                                <ul className="space-y-3">
                                    {section.points.map((point: string, pidx: number) => (
                                        <li key={pidx} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            </div>
                                            <span className="text-gray-900 leading-relaxed flex-1 font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.formula && (
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Formula</p>
                                    <p className="font-mono text-sm text-gray-900 font-bold">{section.formula}</p>
                                </div>
                            )}

                            {section.example && (
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Lightbulb className="size-4 text-blue-700" />
                                        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Example</p>
                                    </div>
                                    <p className="text-gray-900 leading-relaxed font-medium">{section.example}</p>
                                </div>
                            )}

                            {section.tools && Array.isArray(section.tools) && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Wrench className="size-4 text-gray-900" />
                                        <p className="text-sm font-bold text-gray-900">Tools</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {section.tools.map((tool: string, tidx: number) => (
                                            <span
                                                key={tidx}
                                                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-semibold hover:border-primary/40 hover:bg-gray-50 transition-all"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {section.activities && Array.isArray(section.activities) && (
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckSquare className="size-4 text-green-900" />
                                        <p className="text-sm font-bold text-green-900">Quick Activities</p>
                                    </div>
                                    <ul className="space-y-2">
                                        {section.activities.map((activity: string, aidx: number) => (
                                            <li key={aidx} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                                                    {aidx + 1}
                                                </span>
                                                <span className="text-gray-900 leading-relaxed flex-1 font-medium">{activity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {section.rules && Array.isArray(section.rules) && (
                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertTriangle className="size-4 text-amber-900" />
                                        <p className="text-sm font-bold text-amber-900">Important Rules</p>
                                    </div>
                                    <ul className="space-y-2">
                                        {section.rules.map((rule: string, ridx: number) => (
                                            <li key={ridx} className="flex items-start gap-2">
                                                <span className="flex-shrink-0 text-amber-900 font-bold mt-0.5">•</span>
                                                <span className="text-amber-950 leading-relaxed flex-1 font-medium">{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {section.project && (
                                <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ClipboardList className="size-4 text-purple-900" />
                                        <p className="text-sm font-bold text-purple-900">Mini-Project</p>
                                    </div>
                                    <p className="text-gray-900 leading-relaxed font-medium">{section.project}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        return <p className="text-gray-500 text-center py-8">Content not available</p>;
    };

    // Fetch course data and progress
    useEffect(() => {
        const fetchCourseAndProgress = async () => {
            if (!courseId || !course) {
                setLoading(false);
                return;
            }

            try {
                // Set course data from CURRICULUM_LEDGER
                setCourseData(course);

                // Calculate progress if user is logged in
                if (user && course.modules && Array.isArray(course.modules)) {
                    // Get all lessons from all modules
                    const allLessons: any[] = [];
                    course.modules.forEach((module: any) => {
                        module.lessons?.forEach((lesson: any) => {
                            allLessons.push(lesson);
                        });
                    });

                    try {
                        const { data: progressData, error: progressError } = await supabase
                            .from('user_lesson_progress')
                            .select('lesson_id')
                            .eq('user_id', user.id)
                            .eq('course_id', courseId);

                        if (progressError) {
                            // Table might not exist yet - use localStorage fallback
                            console.warn('user_lesson_progress table not found, using localStorage');
                            const localKey = `course_progress_${user.id}_${courseId}`;
                            const localProgress = JSON.parse(localStorage.getItem(localKey) || '[]');
                            const completed = new Set(localProgress);
                            setCompletedLessons(completed);
                            const totalLessons = allLessons.length;
                            setProgress(totalLessons > 0 ? Math.round((completed.size / totalLessons) * 100) : 0);
                        } else if (progressData) {
                            const completed = new Set(progressData.map((p: any) => p.lesson_id));
                            setCompletedLessons(completed);
                            const totalLessons = allLessons.length;
                            setProgress(totalLessons > 0 ? Math.round((completed.size / totalLessons) * 100) : 0);
                        }
                    } catch (progressErr) {
                        console.error('Error fetching progress:', progressErr);
                        // Fallback to localStorage
                        const localKey = `course_progress_${user.id}_${courseId}`;
                        const localProgress = JSON.parse(localStorage.getItem(localKey) || '[]');
                        setCompletedLessons(new Set(localProgress));
                    }
                }
            } catch (error) {
                console.error('Error loading course:', error);
                toast.error('Failed to load course data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseAndProgress();
    }, [courseId, user, course]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('profile-images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('404')) {
                    throw new Error('Storage bucket not configured. Please contact support.');
                }
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('profile-images')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            setProfileImageUrl(publicUrl);
            await refreshProfile();
            toast.success('Profile picture updated successfully!');
        } catch (error: any) {
            toast.error(error.message || 'Failed to upload image');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/auth');
    };

    const handleSaveProfile = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update(profileForm)
                .eq('id', user.id);

            if (error) throw error;

            await refreshProfile();
            toast.success('Profile updated successfully!');
            setProfileModalOpen(false);
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleLessonClick = (lesson: any) => {
        setSelectedLesson(lesson);
        setActiveTab("lesson");
        setShowQuiz(false);
        setQuizAnswers({});
        setQuizSubmitted(false);
        setQuizScore(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMarkComplete = async () => {
        if (!user || !selectedLesson || !courseId) return;

        try {
            const { error } = await supabase
                .from('user_lesson_progress')
                .upsert({
                    user_id: user.id,
                    course_id: courseId,
                    lesson_id: selectedLesson.id,
                    completed_at: new Date().toISOString()
                }, { onConflict: 'user_id,lesson_id' });

            if (error) {
                // Fallback to localStorage if table doesn't exist
                console.warn('Using localStorage fallback for progress');
                const localKey = `course_progress_${user.id}_${courseId}`;
                const localProgress = JSON.parse(localStorage.getItem(localKey) || '[]');
                if (!localProgress.includes(selectedLesson.id)) {
                    localProgress.push(selectedLesson.id);
                    localStorage.setItem(localKey, JSON.stringify(localProgress));
                }
            }

            // Update completed lessons state
            const newCompletedLessons = new Set([...completedLessons, selectedLesson.id]);
            setCompletedLessons(newCompletedLessons);

            // Calculate total lessons across all weeks and modules
            let totalLessons = 0;
            weeks.forEach((week: any) => {
                week.modules?.forEach((module: any) => {
                    totalLessons += module.lessons?.length || 0;
                });
            });

            // Recalculate progress
            const newCompleted = newCompletedLessons.size;
            setProgress(totalLessons > 0 ? Math.round((newCompleted / totalLessons) * 100) : 0);

            toast.success("Lesson completed!", {
                description: "+10 Merit Points earned. Next lesson unlocked!",
            });

            // Auto-scroll back to top to see the completion badge
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error marking lesson complete:', error);
            toast.error('Failed to mark lesson as complete');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm">Loading course...</p>
                </div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Course Not Found</h1>
                    <p className="text-muted-foreground">The course you are looking for could not be found.</p>
                    <Button onClick={() => navigate('/academy')} variant="outline">Back to Academy</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 flex justify-center p-2 md:p-4 pointer-events-none">
                <div className="flex items-center justify-between w-full max-w-7xl px-6 py-2 rounded-full bg-white backdrop-blur-xl border border-gray-100 shadow-lg pointer-events-auto">
                    <Link to="/" className="flex items-center shrink-0">
                        <img src={logo} className="h-14 md:h-16 object-contain" alt="Star9" />
                    </Link>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
                            <Bell className="size-5 text-gray-700" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button
                            onClick={() => setProfileModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 hover:border-primary/50 transition-colors cursor-pointer"
                        >
                            <div className="relative">
                                <User className="size-4 text-primary" />
                                {profile?.verification_status === 'verified' && (
                                    <CheckCircle className="size-3 text-green-500 absolute -top-1 -right-1 bg-white rounded-full" />
                                )}
                            </div>
                            <span className="text-sm font-medium text-primary hidden md:inline">
                                {profile?.full_name || user?.email?.split('@')[0]}
                            </span>
                        </button>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <LogOut className="size-5 text-gray-700 hover:text-red-600" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-2 bg-white border border-gray-200 p-1">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-900 font-semibold text-xs md:text-sm py-2">Overview</TabsTrigger>
                        <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-900 font-semibold text-xs md:text-sm py-2">Modules</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4 md:space-y-6">
                        {/* Hero Section */}
                        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 md:p-8 border border-primary/20">
                            <div className="relative z-10">
                                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">{courseData.title}</h1>
                                <p className="text-base md:text-lg text-gray-900 font-semibold mb-4 md:mb-6">{courseData.category} • {courseData.duration}</p>

                                {/* Progress Bar */}
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-white/50 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs md:text-sm font-semibold text-gray-700">Your Progress</span>
                                        <span className="text-base md:text-lg font-bold text-primary">{progress}%</span>
                                    </div>
                                    <div className="w-full h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">
                                        {completedLessons.size} of {getAllLessons().length} lessons completed
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-2">
                                    <div className="p-1.5 md:p-2 bg-blue-50 rounded-lg">
                                        <Clock className="size-4 md:size-5 text-blue-600" />
                                    </div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-900">Duration</p>
                                </div>
                                <p className="text-xl md:text-2xl font-bold text-gray-900">{courseData.duration}</p>
                            </div>

                            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-2">
                                    <div className="p-1.5 md:p-2 bg-purple-50 rounded-lg">
                                        <ClipboardList className="size-4 md:size-5 text-purple-600" />
                                    </div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-900">Weeks</p>
                                </div>
                                <p className="text-xl md:text-2xl font-bold text-gray-900">{weeks.length}</p>
                            </div>

                            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-2">
                                    <div className="p-1.5 md:p-2 bg-green-50 rounded-lg">
                                        <CheckCircle className="size-4 md:size-5 text-green-600" />
                                    </div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-900">Completed</p>
                                </div>
                                <p className="text-xl md:text-2xl font-bold text-green-600">{completedLessons.size}</p>
                            </div>

                            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 mb-2">
                                    <div className="p-1.5 md:p-2 bg-orange-50 rounded-lg">
                                        <PlayCircle className="size-4 md:size-5 text-orange-600" />
                                    </div>
                                    <p className="text-xs md:text-sm font-semibold text-gray-900">Remaining</p>
                                </div>
                                <p className="text-xl md:text-2xl font-bold text-orange-600">{getAllLessons().length - completedLessons.size}</p>
                            </div>
                        </div>

                        {/* Course Overview */}
                        <Card className="bg-white border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2 text-gray-900">
                                    <Lightbulb className="size-5 text-primary" />
                                    What You'll Learn
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-900 leading-relaxed mb-6 font-medium">
                                    Master AI tools and techniques to transform your freelancing career. This comprehensive 4-week course teaches you how to leverage artificial intelligence to increase productivity, deliver better results, and grow your freelance business.
                                </p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                                            <CheckCircle className="size-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">AI Fundamentals</h4>
                                            <p className="text-sm font-medium text-gray-900">Learn prompt engineering and AI basics</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                                            <CheckCircle className="size-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Content Creation</h4>
                                            <p className="text-sm font-medium text-gray-900">Social media and marketing with AI</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
                                            <CheckCircle className="size-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Research & Writing</h4>
                                            <p className="text-sm font-medium text-gray-900">Data analysis and content writing</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-orange-50 rounded-lg flex-shrink-0">
                                            <CheckCircle className="size-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Website Building</h4>
                                            <p className="text-sm font-medium text-gray-900">Create sites without coding</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI Tools */}
                        {courseData.ai_tools_covered && courseData.ai_tools_covered.length > 0 && (
                            <Card className="bg-white border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2 text-gray-900">
                                        <Wrench className="size-5 text-primary" />
                                        AI Tools You'll Master
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {courseData.ai_tools_covered.map((tool: string, idx: number) => (
                                            <Badge key={idx} variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/30 px-3 py-1.5 text-sm font-semibold">
                                                {tool}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="content" className="space-y-4 md:space-y-6">
                        {/* Debug info */}
                        {!courseData.lessons && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-900">
                                    <strong>Debug:</strong> No lessons found in course data.
                                    Have you run the course setup SQL files?
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {weeks.length > 0 ? (
                                weeks.map((week: any) => {
                                    const isWeekExpanded = expandedWeeks.has(week.id);
                                    const weekModules = week.modules || [];

                                    return (
                                        <Card key={week.id} className="bg-white border-gray-200">
                                            <CardHeader
                                                className="cursor-pointer hover:bg-gray-50 transition-colors"
                                                onClick={() => toggleWeek(week.id)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        {isWeekExpanded ? (
                                                            <ChevronDown className="size-5 text-primary" />
                                                        ) : (
                                                            <ChevronRight className="size-5 text-gray-400" />
                                                        )}
                                                        <div>
                                                            <CardTitle className="text-lg text-gray-900">{week.title}</CardTitle>
                                                            <CardDescription className="text-sm font-semibold text-gray-900">{week.duration}</CardDescription>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            {isWeekExpanded && (
                                                <CardContent className="pt-0 space-y-3">
                                                    {weekModules.map((module: any) => {
                                                        const isModuleExpanded = expandedModules.has(module.id);
                                                        const moduleLessons = module.lessons || [];

                                                        return (
                                                            <div key={module.id} className="border border-gray-200 rounded-lg">
                                                                <div
                                                                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                                                    onClick={() => toggleModule(module.id)}
                                                                >
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-3">
                                                                            {isModuleExpanded ? (
                                                                                <ChevronDown className="size-4 text-primary" />
                                                                            ) : (
                                                                                <ChevronRight className="size-4 text-gray-400" />
                                                                            )}
                                                                            <div>
                                                                                <h4 className="font-semibold text-gray-900">{module.title}</h4>
                                                                                <p className="text-xs font-semibold text-gray-900">{module.duration}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {isModuleExpanded && (
                                                                    <div className="px-4 pb-4 space-y-2">
                                                                        {moduleLessons.map((lesson: any, idx: number) => {
                                                                            const isCompleted = completedLessons.has(lesson.id);
                                                                            const prevLesson = idx > 0 ? moduleLessons[idx - 1] : null;
                                                                            const isLocked = prevLesson && !completedLessons.has(prevLesson.id);

                                                                            return (
                                                                                <div
                                                                                    key={lesson.id}
                                                                                    className={`p-3 rounded-lg border-2 transition-all ${isLocked
                                                                                        ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                                                                                        : 'border-gray-200 hover:border-primary/40 hover:shadow-md cursor-pointer bg-white'
                                                                                        }`}
                                                                                    onClick={() => !isLocked && handleLessonClick(lesson)}
                                                                                >
                                                                                    <div className="flex items-center justify-between gap-3">
                                                                                        <div className="flex items-center gap-2">
                                                                                            {isCompleted ? (
                                                                                                <CheckCircle className="size-4 text-green-500" />
                                                                                            ) : isLocked ? (
                                                                                                <Lock className="size-4 text-gray-400" />
                                                                                            ) : (
                                                                                                <PlayCircle className="size-4 text-primary" />
                                                                                            )}
                                                                                            <span className="text-sm font-medium text-gray-900">{lesson.title}</span>
                                                                                        </div>
                                                                                        {lesson.duration && (
                                                                                            <Badge variant="outline" className="gap-1 text-xs border-primary/30 bg-primary/5 font-bold text-primary px-2.5 py-0.5">
                                                                                                <Clock className="size-3 text-primary" />
                                                                                                {lesson.duration}
                                                                                            </Badge>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </CardContent>
                                            )}
                                        </Card>
                                    );
                                })
                            ) : (
                                <Card className="p-8 text-center bg-white">
                                    <p className="text-gray-600 mb-4">No modules found for this course.</p>
                                    <p className="text-sm text-gray-500">
                                        Please run the course setup SQL files in Supabase SQL Editor to add course content.
                                    </p>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="lesson" className="space-y-6">
                        {selectedLesson && (
                            <div className="space-y-6">
                                {/* Lesson Header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white border border-gray-200 rounded-xl">
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold text-gray-900">{selectedLesson.title}</h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {completedLessons.has(selectedLesson.id) ? (
                                            <Badge className="bg-green-500 text-white gap-1 px-4 py-2">
                                                <CheckCircle className="size-4" />
                                                Completed
                                            </Badge>
                                        ) : (
                                            <Button onClick={handleMarkComplete} size="lg" className="px-6">
                                                Mark Complete
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Video Player */}
                                {selectedLesson.videoUrl && (
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border-2 border-gray-200">
                                        <iframe
                                            src={selectedLesson.videoUrl.replace('watch?v=', 'embed/')}
                                            title={selectedLesson.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                )}

                                {/* Course Notes */}
                                {selectedLesson.notes && !showQuiz && (
                                    <Card className="bg-white border-0 shadow-sm">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center gap-2">
                                                <Lightbulb className="size-5 text-primary" />
                                                <CardTitle className="text-xl text-gray-900">Lesson Notes</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            {renderLessonContent(selectedLesson.notes)}
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Quiz Section */}
                                {selectedLesson.quiz && (
                                    <Card className="bg-white border-gray-200">
                                        <CardHeader className="border-b border-gray-200 bg-purple-50">
                                            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                                                <ClipboardList className="size-5 text-purple-600" />
                                                Module Quiz
                                            </CardTitle>
                                            <CardDescription>Test your knowledge with 5 questions</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            {!showQuiz ? (
                                                <div className="text-center py-8">
                                                    <p className="text-gray-600 mb-4">Ready to test what you've learned?</p>
                                                    <Button onClick={() => setShowQuiz(true)} size="lg" className="gap-2">
                                                        <CheckSquare className="size-4" />
                                                        Start Quiz
                                                    </Button>
                                                </div>
                                            ) : !quizSubmitted ? (
                                                <div className="space-y-6">
                                                    {selectedLesson.quiz.questions.map((q: any, idx: number) => (
                                                        <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                            <p className="font-semibold text-gray-900 mb-3">
                                                                {idx + 1}. {q.question}
                                                            </p>
                                                            <div className="space-y-2">
                                                                {q.options.map((option: string, optIdx: number) => (
                                                                    <label
                                                                        key={optIdx}
                                                                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${quizAnswers[idx] === optIdx
                                                                            ? 'border-primary bg-primary/5'
                                                                            : 'border-gray-200 hover:border-gray-300'
                                                                            }`}
                                                                    >
                                                                        <input
                                                                            type="radio"
                                                                            name={`question-${idx}`}
                                                                            checked={quizAnswers[idx] === optIdx}
                                                                            onChange={() => setQuizAnswers({ ...quizAnswers, [idx]: optIdx })}
                                                                            className="text-primary"
                                                                        />
                                                                        <span className="text-gray-700">{option}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="flex gap-3 pt-4">
                                                        <Button
                                                            onClick={async () => {
                                                                const score = selectedLesson.quiz.questions.reduce((acc: number, q: any, idx: number) => {
                                                                    return acc + (quizAnswers[idx] === q.correctAnswer ? 1 : 0);
                                                                }, 0);
                                                                setQuizScore(score);
                                                                setQuizSubmitted(true);

                                                                // Auto-complete if passed (80% = 4/5 or more)
                                                                const passingScore = Math.ceil(selectedLesson.quiz.questions.length * 0.8);
                                                                if (score >= passingScore && !completedLessons.has(selectedLesson.id)) {
                                                                    await handleMarkComplete();
                                                                }
                                                            }}
                                                            disabled={Object.keys(quizAnswers).length < selectedLesson.quiz.questions.length}
                                                            size="lg"
                                                            className="flex-1"
                                                        >
                                                            Submit Quiz
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setShowQuiz(false);
                                                                setQuizAnswers({});
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 space-y-4">
                                                    <div className={`text-6xl mb-4 ${quizScore >= Math.ceil(selectedLesson.quiz.questions.length * 0.8) ? 'text-green-500' : 'text-red-500'}`}>
                                                        {quizScore >= Math.ceil(selectedLesson.quiz.questions.length * 0.8) ? '🎉' : '📚'}
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-900">
                                                        Score: {quizScore} / {selectedLesson.quiz.questions.length} ({Math.round((quizScore / selectedLesson.quiz.questions.length) * 100)}%)
                                                    </h3>
                                                    {quizScore >= Math.ceil(selectedLesson.quiz.questions.length * 0.8) ? (
                                                        <div className="space-y-3">
                                                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                                                <p className="text-green-800 font-semibold">✅ Passed! (80% required)</p>
                                                                <p className="text-green-700 text-sm mt-1">Module completed automatically. Next module unlocked!</p>
                                                            </div>
                                                            <Button
                                                                size="lg"
                                                                onClick={() => {
                                                                    const nextLesson = getNextLesson(selectedLesson.id);
                                                                    if (nextLesson) {
                                                                        handleLessonClick(nextLesson);
                                                                        setShowQuiz(false);
                                                                        setQuizSubmitted(false);
                                                                        setQuizAnswers({});
                                                                        setQuizScore(0);
                                                                    } else {
                                                                        setActiveTab("content");
                                                                    }
                                                                }}
                                                            >
                                                                {getNextLesson(selectedLesson.id)
                                                                    ? 'Continue to Next Lesson →'
                                                                    : 'Back to Course Overview'}
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                                                <p className="text-red-800 font-semibold">❌ Not Passed (80% required)</p>
                                                                <p className="text-red-700 text-sm mt-1">You need at least {Math.ceil(selectedLesson.quiz.questions.length * 0.8)} out of {selectedLesson.quiz.questions.length} correct to proceed.</p>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setShowQuiz(false);
                                                                    setQuizSubmitted(false);
                                                                    setQuizAnswers({});
                                                                    setQuizScore(0);
                                                                }}
                                                            >
                                                                Review Notes & Try Again
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Navigation */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            if (showQuiz) {
                                                setShowQuiz(false);
                                                setQuizAnswers({});
                                                setQuizSubmitted(false);
                                            } else {
                                                setActiveTab("content");
                                            }
                                        }}
                                        className="border-gray-300"
                                    >
                                        {showQuiz ? '← Back to Content' : '← Back to Modules'}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const nextLesson = getNextLesson(selectedLesson.id);
                                            if (nextLesson) {
                                                handleLessonClick(nextLesson);
                                            }
                                        }}
                                        disabled={!getNextLesson(selectedLesson.id)}
                                    >
                                        Next Lesson →
                                    </Button>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs >
            </main >

            {/* Profile Modal */}
            < Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen} >
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            My Profile
                            {profile?.verification_status === 'verified' && (
                                <Badge className="bg-green-500 text-white gap-1">
                                    <CheckCircle className="size-3" />
                                    Verified
                                </Badge>
                            )}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            View and update your profile information
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Profile Picture Section */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="relative">
                                {profileImageUrl ? (
                                    <img
                                        src={profileImageUrl}
                                        alt="Profile"
                                        className="size-20 rounded-full object-cover border-2 border-primary/20"
                                    />
                                ) : (
                                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border-2 border-primary/20">
                                        {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                {profile?.verification_status === 'verified' && (
                                    <div className="absolute -bottom-1 -right-1 size-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                        <CheckCircle className="size-4 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{profile?.full_name || 'No name set'}</h3>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Mail className="size-3" />
                                    {user?.email}
                                </p>
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                        disabled={uploading}
                                    >
                                        <Upload className="size-4" />
                                        {uploading ? 'Uploading...' : 'Upload Photo'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full_name" className="text-gray-700">Full Name</Label>
                                <Input
                                    id="full_name"
                                    value={profileForm.full_name}
                                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                                    placeholder="e.g., John Doe"
                                    className="border-gray-300 bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone_number" className="text-gray-700 flex items-center gap-1">
                                    <Phone className="size-3" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone_number"
                                    value={profileForm.phone_number}
                                    onChange={(e) => setProfileForm({ ...profileForm, phone_number: e.target.value })}
                                    placeholder="e.g., +254 712 345 678"
                                    className="border-gray-300 bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-gray-700 flex items-center gap-1">
                                    <MapPin className="size-3" />
                                    Country
                                </Label>
                                <Input
                                    id="country"
                                    value={profileForm.country}
                                    onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                                    placeholder="e.g., Kenya, Nigeria, Ghana"
                                    className="border-gray-300 bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-gray-700">City</Label>
                                <Input
                                    id="city"
                                    value={profileForm.city}
                                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                                    placeholder="e.g., Nairobi, Lagos, Accra"
                                    className="border-gray-300 bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date_of_birth" className="text-gray-700 flex items-center gap-1">
                                    <Calendar className="size-3" />
                                    Date of Birth
                                </Label>
                                <Input
                                    id="date_of_birth"
                                    type="date"
                                    value={profileForm.date_of_birth}
                                    onChange={(e) => setProfileForm({ ...profileForm, date_of_birth: e.target.value })}
                                    className="border-gray-300 bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                            <Textarea
                                id="bio"
                                value={profileForm.bio}
                                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                                placeholder="Share a bit about yourself, your skills, and what you're learning..."
                                rows={4}
                                className="border-gray-300 bg-white"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t">
                            <Button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="flex-1"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setProfileModalOpen(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog >
        </div >
    );
};

export default CourseDashboard;
