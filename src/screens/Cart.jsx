import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { colors } from "../global/colors";

import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shopServices";
import AddButton from "../components/AddButton";
import { clearCart } from "../features/Cart/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { items: CartData, total } = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.auth.value.user);
  const [triggerPostOrder, result] = usePostOrderMutation();

  function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }
  const orderId = generateRandomId();

  const onConfirmOrder = () => {
    // logica de confirmacion de orden
    triggerPostOrder({
      items: CartData,
      user,
      orderId,
      total,
      createdAt: new Date(),
    });

    // resetear carrito
    dispatch(clearCart());
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
        keyExtractor={(producto) => producto.id}
      />

      <View style={styles.totalContainer}>
        <AddButton onPress={onConfirmOrder} title="Confirmar pedido" />
        <AddButton title={`Total: ${total || 0}`} />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 30,
  },
  totalContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
});
