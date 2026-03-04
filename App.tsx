import React from "react";
import { View, StatusBar } from "react-native";
import FeedScreen from "./features/feed/FeedScreen";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <FeedScreen />
    </View>
  );
};

export default App;