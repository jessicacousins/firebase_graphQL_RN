import React, { useEffect, useState } from "react";
import { NEWS_API_KEY } from "@env";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";

const NewsFeedScreen = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNewsArticles();
  }, []);

  const fetchNewsArticles = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
      );
      const json = await response.json();
      setArticles(json.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.url)}
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#000",
  },
  item: {
    backgroundColor: "#daffd1",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default NewsFeedScreen;
