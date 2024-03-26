import React, { useEffect, useState } from "react";
import { NEWS_API_KEY } from "@env";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const NewsFeedScreen = () => {
  const [articles, setArticles] = useState([]);
  const [readArticles, setReadArticles] = useState([]);

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

  const handlePress = (url) => {
    Linking.openURL(url);
    if (!readArticles.includes(url)) {
      setReadArticles([...readArticles, url]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.url)}
      style={[
        styles.item,
        readArticles.includes(item.url) ? styles.itemRead : {},
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#000",
  },

  item: {
    backgroundColor: "#32CD32",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
    borderRadius: 20,
  },
  itemRead: {
    backgroundColor: "#add8e6",
  },
  title: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default NewsFeedScreen;
