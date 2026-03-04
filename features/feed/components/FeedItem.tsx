import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FeedItemType } from "../types";

interface Props {
  item: FeedItemType;
  onPress: () => void;
}

const FeedItem = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(FeedItem);

const styles = StyleSheet.create({
  container: {
    height: 100, // MUST match ITEM_HEIGHT
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});