import { StyleSheet, Text, View, FlatList } from "react-native";

import OrderItem from "../components/OrderItem";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { colors } from "../global/colors";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

const Order = () => {
  const user = useSelector((state) => state.auth.value.user);
  const { data: orders, error, isLoading, refetch } = useGetOrdersByUserQuery(user);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );


  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(orderItem) => orderItem.orderId}
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
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
