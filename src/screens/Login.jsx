import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";

import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const [triggerSignIn, result] = useSignInMutation();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      );
    }
  }, [result]);

  const onSubmit = () => {
    triggerSignIn({ email, password, returnSecureToken: true });
  };

  const logo = "../../assets/logo-png.png";
  const imgBg = "../../assets/leafs-bg.webp";

  return (
    <View style={styles.main}>
      <Image
      source={require(logo)}
      style={styles.img}
      />
      <Image
      source={require(imgBg)}
      style={styles.bgImg}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Inicia sesión</Text>
        <InputForm label={"Email"} onChange={setEmail} error={""} />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={""}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>No tienes cuenta?</Text>

        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.green900,
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray100,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  bgImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1
  },
  img: {
    width: "75%",
    height: "35%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    color: "black",
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
  logo: {
    width: "100%",
    aspectRatio: 1,
  },
});
