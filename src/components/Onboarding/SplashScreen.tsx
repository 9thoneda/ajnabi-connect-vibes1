import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import splashImage from "@/assets/splash-screen.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => onComplete(), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Image */}
      <Image 
        source={splashImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Gradient Overlay */}
      <View style={styles.overlay} />
      
      {/* Content */}
      <View style={[
        styles.content,
        {
          opacity: showLogo ? 1 : 0,
          transform: [{ translateY: showLogo ? 0 : 32 }]
        }
      ]}>
        <Text style={[styles.title, { fontSize: screenWidth * 0.15 }]}>
          AjnabiCam
        </Text>
        <Text style={[styles.subtitle, { fontSize: screenWidth * 0.05 }]}>
          Meet your new friend
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E91E63', // Fallback color
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(233, 30, 99, 0.6)', // Primary gradient color with opacity
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    fontFamily: 'Dancing Script', // Will need to be configured in React Native
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: 'Poppins', // Will need to be configured in React Native
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});