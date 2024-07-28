import { StyleSheet, View } from 'react-native'
import {colors} from '../global/colors'

const Card = ({children, style}) => {
  return (
    <View style={{...styles.container, ...style}}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: colors.lightGray,
    shadowColor: colors.lightGray,
    width: 250,
    height: 40,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
