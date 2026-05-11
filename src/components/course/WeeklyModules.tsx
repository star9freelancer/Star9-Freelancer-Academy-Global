import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    PlayCircle,
    CheckCircle,
    Lock,
    Clock,
    FileText,
    Video,
    ClipboardCheck
} from "lucide-react";

interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: "video" | "article" | "quiz";
    isCompleted: boolean;
    isLocked: boolean;
}

interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
}

interface Week {
    weekNumber: number;
    title: string;
    modules: Module[];
}

interface WeeklyModulesProps {
    weeks: Week[];
    onLessonClick: (lessonId: string) => void;
}

const getLessonIcon = (type: string, isCompleted: boolean, isLocked: boolean) => {
    if (isLocked) return <Lock className="size-4 text-muted-foreground" />;
    if (isCompleted) return <CheckCircle className="size-4 text-green-500" />;

    switch (type) {
        case "video":
            return <Video className="size-4 text-primary" />;
        case "article":
            return <FileText className="size-4 text-primary" />;
        case "quiz":
            return <ClipboardCheck className="size-4 text-primary" />;
        default:
            return <PlayCircle className="size-4 text-primary" />;
    }
};

const WeeklyModules = ({ weeks, onLessonClick }: WeeklyModulesProps) => {
    const [expandedWeeks, setExpandedWeeks] = useState<string[]>(["week-1"]);

    return (
        <div className="space-y-6 bg-white">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Content</h2>
                <p className="text-gray-600">
                    Navigate through weekly modules and lessons at your own pace
                </p>
            </div>

            <Accordion type="multiple" value={expandedWeeks} onValueChange={setExpandedWeeks}>
                {weeks.map((week) => {
                    const totalLessons = week.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
                    const completedLessons = week.modules.reduce(
                        (acc, mod) => acc + mod.lessons.filter(l => l.isCompleted).length,
                        0
                    );
                    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

                    return (
                        <AccordionItem key={`week-${week.weekNumber}`} value={`week-${week.weekNumber}`}>
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center justify-between w-full pr-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-bold">
                                            {week.weekNumber}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-lg text-gray-900">{week.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                {completedLessons} of {totalLessons} lessons completed
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant={progress === 100 ? "default" : "secondary"}>
                                        {progress}%
                                    </Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 pt-4">
                                    {week.modules.map((module) => (
                                        <Card key={module.id} className="bg-white border-gray-200">
                                            <CardHeader>
                                                <CardTitle className="text-base text-gray-900">{module.title}</CardTitle>
                                                <CardDescription className="text-gray-600">{module.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    {module.lessons.map((lesson) => (
                                                        <button
                                                            key={lesson.id}
                                                            onClick={() => !lesson.isLocked && onLessonClick(lesson.id)}
                                                            disabled={lesson.isLocked}
                                                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${lesson.isLocked
                                                                ? "bg-muted/50 cursor-not-allowed"
                                                                : lesson.isCompleted
                                                                    ? "bg-green-50 border-green-200 hover:bg-green-100"
                                                                    : "bg-white hover:bg-primary/5 border-gray-200"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                {getLessonIcon(lesson.type, lesson.isCompleted, lesson.isLocked)}
                                                                <div className="text-left">
                                                                    <p className={`font-medium text-sm ${lesson.isLocked ? "text-gray-400" : "text-gray-900"}`}>
                                                                        {lesson.title}
                                                                    </p>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <Clock className="size-3 text-gray-500" />
                                                                        <span className="text-xs text-gray-600">{lesson.duration}</span>
                                                                        <Badge variant="outline" className="text-xs text-gray-700 border-gray-300">
                                                                            {lesson.type}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {!lesson.isLocked && !lesson.isCompleted && (
                                                                <Button size="sm" variant="ghost">
                                                                    Start
                                                                </Button>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default WeeklyModules;
