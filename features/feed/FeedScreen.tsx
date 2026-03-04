import React, { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ListRenderItem,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import FeedItem from "./components/FeedItem";
import { useFeed } from "./hooks/useFeed";
import { FeedItemType } from "./types";

const FeedScreen = () => {
  const { data, loadMore, refresh, loading, refreshing } = useFeed();
  const [mode, setMode] = useState<"scroll" | "flat" | "flash">("scroll");

  const handlePress = useCallback((id: string) => {
    console.log("Pressed:", id);
  }, []);

  const renderItem: ListRenderItem<FeedItemType> = useCallback(
    ({ item }) => <FeedItem item={item} onPress={() => handlePress(item.id)} />,
    [handlePress]
  );

  const ListEmpty = useCallback(() => {
    if (loading) return null;
    return <Text style={styles.emptyText}>No posts available</Text>;
  }, [loading]);

  const ListFooter = useCallback(() => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 16 }} />;
  }, [loading]);

  // ScrollView load more
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const paddingToBottom = 200;
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      ) {
        if (!loading) {
          loadMore();
        }
      }
    },
    [loadMore, loading]
  );

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          onPress={() => setMode("scroll")}
          style={[
            styles.switchButton,
            mode === "scroll" && styles.activeButton,
          ]}
        >
          <Text
            style={[
              styles.switchText,
              mode === "scroll" && styles.activeText,
            ]}
          >
            ScrollView
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode("flat")}
          style={[
            styles.switchButton,
            mode === "flat" && styles.activeButton,
          ]}
        >
          <Text
            style={[
              styles.switchText,
              mode === "flat" && styles.activeText,
            ]}
          >
            FlatList
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode("flash")}
          style={[
            styles.switchButton,
            mode === "flash" && styles.activeButton,
          ]}
        >
          <Text
            style={[
              styles.switchText,
              mode === "flash" && styles.activeText,
            ]}
          >
            FlashList
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render Lists */}
      {mode === "scroll" && (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {data.map((item) => (
            <FeedItem key={item.id} item={item} onPress={() => handlePress(item.id)} />
          ))}

          {ListFooter()}
          {data.length === 0 && ListEmpty()}
        </ScrollView>
      )}

      {mode === "flat" && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={refresh}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={7}
          removeClippedSubviews
          updateCellsBatchingPeriod={50}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={ListFooter}
        />
      )}

      {mode === "flash" && (
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={300} // approximate height of FeedItem
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={refresh}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={ListFooter}
        />
      )}
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  switchText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  activeText: {
    color: "#fff",
  },
});