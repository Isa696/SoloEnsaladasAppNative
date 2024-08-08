import { StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";

const OrderItem = ({ order }) => {

  return (
    <View style={styles.card} onPress={() => {}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
        {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Fecha no disponible'}
        </Text>
        <Text style={styles.text2}>Items: {order.items.length}</Text>
        <Text style={styles.text2}>Total: ${order.total}</Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.gray100,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 17,
    color: colors.black,
  },
  text2: {
    fontFamily: "Josefin",
    fontSize: 19,
    color: colors.green900,
  },
});
