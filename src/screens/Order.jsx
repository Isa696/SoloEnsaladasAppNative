import { StyleSheet, Text, View, FlatList } from "react-native";

import OrderItem from "../components/OrderItem";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { colors } from "../global/colors";
import { useSelector } from "react-redux";


const Order = () => {
  const user = useSelector((state) => state.auth.value.user);
  const { data: order, isLoading } = useGetOrdersByUserQuery(user);
    console.log(order)

  return (
    <View style={styles.container}>
    {isLoading ? (
      <Text>Loading...</Text>
    ) : (
      <FlatList
        data={order}
        keyExtractor={(orderItem) => orderItem.id.toString()}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
