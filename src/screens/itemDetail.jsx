import React, { useEffect, useState } from "react";

import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { colors } from "../global/colors";

import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";
import AddButton from "../components/AddButton";

const ItemDetail = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState("portrait");
  const { productoId: idSelected } = route.params;

  const dispatch = useDispatch();

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(idSelected);

  // Landscape: Horisontal
  // Portraint: Vertical
  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  const handleAddCart = () => {
    // agregar al carrito
    dispatch(addCartItem({ ...product, quantity: 1 }));
  };

  return (
    <>
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <AddButton onPress={() => navigation.goBack()} title="Volver" />
          <Image
            source={{ uri: product.images[0] }}
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
            resizeMode="cover"
          />
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text style={styles.text2}>{product.title} ⭐ {product.rating}</Text>
            <Text style={styles.text}>{product.description}</Text>
            <Text style={styles.text2}>Stock: {product.stock}</Text>
            <Text style={styles.text2}>Precio: ${product.price}</Text>
          </View>
          <AddButton
            title="Añadir al carrito"
            onPress={handleAddCart}
          />
        </View>
      ) : null}
    </>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
    backgroundColor: colors.green900,
  },
  mainContainerLandscape: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
    backgroundColor: colors.black,
  },
  image: {
    width: "100%",
    height: 250,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },

  textContainer: {
    flexDirection: "column",
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  text: {
    color: colors.white,
  },
  text2: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.lightGray,
  },
});
