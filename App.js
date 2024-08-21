import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button, Text, StyleSheet } from "react-native";

export default function AnimatedStyleUpdateExample(props) {
  // Variables de animación
  const randomWidth = useSharedValue(10);
  const translateY = useSharedValue(-250);
  const backgroundColor = useSharedValue('#e7fefa');
  const titleOpacity = useSharedValue(1);

  // Configuración de la animación, duración y easing
  const config = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  // Estilos animados, se actualizan automáticamente, no se necesita llamar a setState
  const textStyle = useAnimatedStyle(() => {
    return {
      // transform es para animaciones de posición, rotación y escala 
      transform: [{ translateY: withTiming(translateY.value, config) }],
      //opacity es para animaciones de opacidad 
      opacity: withTiming(titleOpacity.value, config),
    };
  });

// constante para el color de fondo
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, config),
    };
  });

  // Iniciar la animación al cargar la página
  useEffect(() => {
    translateY.value = 0;
  }, []);


  return (
    <Animated.View style={[styles.background, backgroundStyle]}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View style={styles.container}>
          <Animated.Text style={[styles.title, textStyle]}>
            Mi Título Centrado
          </Animated.Text>
        </View>

        <Button
          title="Iniciar"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
            backgroundColor.value = '#F4C2C2'; 
            titleOpacity.value = 0; 
          }}
        />
      </View>
    </Animated.View>
  );
}

// Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});