import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, CheckCircle2, X } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import logo from "@/assets/logo_highres_transparent.png";

interface PaymentReceiptProps {
    receiptData: {
        receiptNumber: string;
        date: string;
        studentName: string;
        email: string;
        courseName: string;
        amount: number;
        currency: string;
        paymentMethod: string;
        transactionId: string;
    };
    onClose: () => void;
}

const PaymentReceipt = ({ receiptData, onClose }: PaymentReceiptProps) => {
    const receiptRef = useRef<HTMLDivElement>(null);

    const downloadPDF = async () => {
        if (!receiptRef.current) return;

        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                backgroundColor: "#ffffff",
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(`Star9_Receipt_${receiptData.receiptNumber}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-emerald-500 flex items-center justify-center">
                            <CheckCircle2 className="size-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Payment Successful!</h2>
                            <p className="text-sm text-gray-600">Your enrollment is confirmed</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/50">
                        <X className="size-4" />
                    </Button>
                </CardHeader>

                <CardContent className="p-6">
                    {/* Receipt Content */}
                    <div ref={receiptRef} className="bg-white p-8 rounded-lg">
                        {/* Header */}
                        <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                            <img src={logo} alt="Star9" className="h-16 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-gray-900">PAYMENT RECEIPT</h1>
                            <p className="text-sm text-gray-600 mt-2">Star9 Freelancer Academy</p>
                        </div>

                        {/* Receipt Details */}
                        <div className="space-y-6">
                            {/* Receipt Info */}
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Receipt Number</p>
                                    <p className="font-mono font-bold text-gray-900">{receiptData.receiptNumber}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                                    <p className="font-semibold text-gray-900">{receiptData.date}</p>
                                </div>
                            </div>

                            {/* Student Info */}
                            <div className="pb-4 border-b border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Paid By</p>
                                <p className="font-bold text-gray-900">{receiptData.studentName}</p>
                                <p className="text-sm text-gray-600">{receiptData.email}</p>
                            </div>

                            {/* Course Info */}
                            <div className="pb-4 border-b border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Course Enrolled</p>
                                <p className="font-bold text-gray-900">{receiptData.courseName}</p>
                            </div>

                            {/* Payment Details */}
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Payment Method</span>
                                    <span className="font-semibold text-gray-900">{receiptData.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-mono text-sm text-gray-900">{receiptData.transactionId}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t-2 border-gray-300">
                                    <span className="text-lg font-bold text-gray-900">Total Paid</span>
                                    <span className="text-2xl font-bold text-emerald-600">
                                        {receiptData.currency} {receiptData.amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="pt-6 text-center text-xs text-gray-500">
                                <p>Thank you for enrolling with Star9 Freelancer Academy!</p>
                                <p className="mt-2">For support, contact us at support@star9freelancer.com</p>
                                <p className="mt-4 font-mono">Generated on {new Date().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-6">
                        <Button onClick={downloadPDF} className="w-full gap-2 h-12 text-base">
                            <Download className="size-5" />
                            Download Receipt (PDF)
                        </Button>
                        <Button onClick={onClose} variant="default" className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-700">
                            Continue to Course Dashboard →
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentReceipt;
