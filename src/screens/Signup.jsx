import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";
import SubmitButton from "../components/SubmitButton";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { signupSchema } from "../validations/singUpScheme";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

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
    try {
      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      signupSchema.validateSync({ email, password, confirmPassword });
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (err) {
      console.log("Entro al signup del error");
      console.log(err.path);
      console.log(err.message);
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
        case "password":
          setErrorPassword(err.message);
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
        default:
          break;
      }
    }
  };

  const logo = "../../assets/logo-png.png";
  const imgBg = "../../assets/leafs-bg.webp";

  return (
    <View style={styles.main}>
      <Image 
      style={styles.logo} 
      resizeMode="cover"
      source={require(logo)} />
            <Image
      source={require(imgBg)}
      style={styles.bgImg}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <InputForm label={"Email"} onChange={setEmail} error={errorMail} />
        <InputForm
          label={"Contraseña"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"Confirme Contraseña"}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Enviar" />
        <Text style={styles.sub}>Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Iniciar seción</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.green900,
  },
  logo: {
    width: "75%",
    height: "35%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bgImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1
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
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "blue",
  },
});
