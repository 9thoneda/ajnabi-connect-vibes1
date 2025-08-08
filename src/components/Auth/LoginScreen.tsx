import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface LoginScreenProps {
  onLogin: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const insets = useSafeAreaInsets();

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
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={[styles.gradientBackground, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <View style={[styles.iconContainer, { 
                width: screenWidth * 0.15, 
                height: screenWidth * 0.15,
                marginBottom: screenHeight * 0.02
              }]}>
                <Ionicons name="heart" size={screenWidth * 0.08} color="#FFFFFF" />
              </View>
              <Text style={[styles.title, { fontSize: screenWidth * 0.08 }]}>
                AjnabiCam
              </Text>
              <Text style={[styles.subtitle, { fontSize: screenWidth * 0.04 }]}>
                Connect. Chat. Care.
              </Text>
            </View>

            {/* Card */}
            <View style={[styles.card, { 
              marginTop: screenHeight * 0.04,
              paddingHorizontal: screenWidth * 0.06,
              paddingVertical: screenHeight * 0.03
            }]}>
              <Text style={[styles.cardTitle, { fontSize: screenWidth * 0.045 }]}>
                {step === "phone" ? "Enter your phone number" : "Verify OTP"}
              </Text>

              <View style={styles.inputContainer}>
                {step === "phone" ? (
                  <>
                    <View style={styles.phoneInputContainer}>
                      <Ionicons 
                        name="call" 
                        size={screenWidth * 0.04} 
                        color="#666" 
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, { fontSize: screenWidth * 0.04 }]}
                        placeholder="Enter 10-digit mobile number"
                        value={phone}
                        onChangeText={(text) => setPhone(text.replace(/\D/g, "").slice(0, 10))}
                        keyboardType="numeric"
                        maxLength={10}
                      />
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { 
                          height: screenHeight * 0.06,
                          opacity: phone.length !== 10 ? 0.5 : 1
                        }
                      ]}
                      onPress={handlePhoneSubmit}
                      disabled={phone.length !== 10}
                    >
                      <Text style={[styles.buttonText, { fontSize: screenWidth * 0.04 }]}>
                        Send OTP
                      </Text>
                      <Ionicons name="arrow-forward" size={screenWidth * 0.04} color="#FFFFFF" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.otpContainer}>
                      <TextInput
                        style={[styles.otpInput, { 
                          fontSize: screenWidth * 0.045,
                          height: screenHeight * 0.06
                        }]}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChangeText={(text) => setOtp(text.replace(/\D/g, "").slice(0, 6))}
                        keyboardType="numeric"
                        maxLength={6}
                        textAlign="center"
                      />
                      <Text style={[styles.otpHint, { fontSize: screenWidth * 0.035 }]}>
                        OTP sent to +91 {phone}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { 
                          height: screenHeight * 0.06,
                          opacity: otp.length !== 6 ? 0.5 : 1,
                          marginBottom: screenHeight * 0.02
                        }
                      ]}
                      onPress={handleOtpSubmit}
                      disabled={otp.length !== 6}
                    >
                      <Text style={[styles.buttonText, { fontSize: screenWidth * 0.04 }]}>
                        Verify & Continue
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.secondaryButton, { height: screenHeight * 0.06 }]}
                      onPress={() => setStep("phone")}
                    >
                      <Text style={[styles.secondaryButtonText, { fontSize: screenWidth * 0.04 }]}>
                        Change Number
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: '#E91E63', // Primary gradient color
    paddingHorizontal: '4%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: screenHeight * 0.8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Dancing Script',
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: screenHeight * 0.01,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: screenHeight * 0.03,
  },
  inputContainer: {
    gap: screenHeight * 0.02,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: '4%',
    height: screenHeight * 0.06,
  },
  inputIcon: {
    marginRight: '3%',
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    color: '#333',
  },
  otpContainer: {
    alignItems: 'center',
  },
  otpInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: '4%',
    fontFamily: 'Poppins',
    color: '#333',
    letterSpacing: 8,
    width: '100%',
    marginBottom: screenHeight * 0.01,
  },
  otpHint: {
    fontFamily: 'Poppins',
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#E91E63',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(233, 30, 99, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#E91E63',
  },
});