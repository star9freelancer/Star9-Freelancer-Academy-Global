import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, Award, Target } from "lucide-react";

interface CourseOverviewProps {
    courseTitle: string;
    description: string;
    duration: string;
    modulesCount: number;
    progress: number;
}

export const CourseOverview = ({ courseTitle, description, duration, modulesCount, progress }: CourseOverviewProps) => {
    return (
        <div className="space-y-8 bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 p-8 md:p-12">
                <div className="relative z-10">
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Course Dashboard</Badge>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">{courseTitle}</h1>
                    <p className="text-lg text-gray-700 max-w-2xl mb-6">{description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">Course Progress</span>
                            <span className="font-bold text-gray-900">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-3 bg-gray-200" />
                    </div>
                </div>

                {/* Decorative Elements - Removed */}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors bg-white">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-gray-600">Duration</CardTitle>
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Clock className="size-5 text-primary" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-900">{duration}</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors bg-white">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Modules</CardTitle>
                            <div className="p-2 rounded-lg bg-primary/10">
                                <BookOpen className="size-5 text-primary" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-900">{modulesCount}</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors bg-white">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-gray-600">Status</CardTitle>
                            <div className="p-2 rounded-lg bg-green-100">
                                <Award className="size-5 text-green-600" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Badge variant={progress === 100 ? "default" : "secondary"} className="text-sm px-3 py-1">
                            {progress === 100 ? "Completed" : "In Progress"}
                        </Badge>
                    </CardContent>
                </Card>
            </div>

            {/* Learning Outcomes */}
            <Card className="border-2 border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Target className="size-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl text-gray-900">What You'll Master</CardTitle>
                            <CardDescription className="text-gray-600">Key skills and outcomes from this course</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Understanding AI tools and their applications in freelancing",
                            "Advanced prompt engineering techniques",
                            "AI-powered service delivery workflows",
                            "Workflow automation with AI",
                            "Selling AI services to clients",
                            "Building sustainable AI-powered freelance business"
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors">
                                <div className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs font-bold shrink-0 mt-0.5">
                                    {index + 1}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
