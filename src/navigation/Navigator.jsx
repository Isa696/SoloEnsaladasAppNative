import { NavigationContainer } from "@react-navigation/native";

import HomeStackNavigator from "./HomeStackNavigator";
import BottomTapNavigator from "./BottomTapNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector } from "react-redux";

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  return (
    <NavigationContainer>
      {user ? <BottomTapNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
