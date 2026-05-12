import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X as XIcon, Cookie as CookieIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem("star9_cookie_consent");
        if (!consent) {
            // Show banner after a short delay
            setTimeout(() => setShowBanner(true), 1000);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("star9_cookie_consent", "accepted");
        setShowBanner(false);
    };

    const declineCookies = () => {
        localStorage.setItem("star9_cookie_consent", "declined");
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[100]"
                >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={declineCookies}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Close"
                        >
                            <XIcon className="size-4 text-gray-500" />
                        </button>

                        {/* Icon */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                                <CookieIcon className="size-6 text-primary" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">We use cookies</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.
                                    </p>
                                </div>

                                {/* Privacy link */}
                                <Link
                                    to="/privacy"
                                    className="text-xs text-primary hover:underline inline-block"
                                >
                                    Read our Privacy Policy
                                </Link>

                                {/* Action buttons */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        onClick={acceptCookies}
                                        size="sm"
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full"
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={declineCookies}
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 rounded-full border-gray-300"
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
