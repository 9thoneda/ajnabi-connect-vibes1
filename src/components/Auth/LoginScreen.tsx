import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, ArrowRight } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setStep("otp");
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-warm border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💕</span>
            </div>
            <h1 className="text-3xl font-dancing font-bold text-foreground mb-2">
              AjnabiCam
            </h1>
            <p className="text-muted-foreground font-poppins">Connect. Chat. Care.</p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2 font-poppins">
                {step === "phone" ? "Enter your phone number" : "Verify OTP"}
              </h2>
              <p className="text-sm text-muted-foreground font-poppins">
                {step === "phone" 
                  ? "This is how others will see you" 
                  : `OTP sent to +91 ${phone}`
                }
              </p>
            </div>

            {step === "phone" ? (
              <div className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-10 h-12 font-poppins"
                    type="tel"
                    maxLength={10}
                  />
                </div>
                <Button
                  onClick={handlePhoneSubmit}
                  disabled={phone.length !== 10}
                  className="w-full h-12 font-poppins font-semibold"
                  variant="gradient"
                >
                  Send OTP
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-lg tracking-widest h-12 font-poppins"
                  type="tel"
                  maxLength={6}
                />
                <Button
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6}
                  className="w-full h-12 font-poppins font-semibold mb-3"
                  variant="gradient"
                >
                  Verify & Continue
                </Button>
                <Button
                  onClick={() => setStep("phone")}
                  variant="outline"
                  className="w-full h-12 font-poppins"
                >
                  Change Number
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}