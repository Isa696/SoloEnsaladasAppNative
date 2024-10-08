import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../global/colors'
import AddButton from '../components/AddButton'

import { useSelector } from 'react-redux'
import { useGetProfileimageQuery } from '../services/shopServices'



const MyProfile = ({navigation}) => {

      const {imageCamera, localId} = useSelector((state) => state.auth.value)
      const {data: imageFromBase} = useGetProfileimageQuery(localId)
      const launchCamera = async () => {
        navigation.navigate("Image Selector");
      };

      const defaultImageRoute = "../../assets/user.png";

  return (
    <View style={styles.container}>
      {imageFromBase || imageCamera ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.img}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.img}
          resizeMode="cover"
          source={require(defaultImageRoute)}
        />
      )}
      <AddButton
        onPress={launchCamera}
        title={
          imageFromBase || imageCamera
            ? "Cambiar imagen perfil"
            : "Agregar imagen Perfil"
        }
      />
    </View>
  );
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    gap: 10,
    backgroundColor: colors.black,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
})
