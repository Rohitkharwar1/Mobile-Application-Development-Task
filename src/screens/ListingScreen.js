import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl, // ✅ Import for pull-to-refresh
} from "react-native";
import axios from "axios";

export default function ListingScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // ✅ State for pull-to-refresh

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      setData((prevData) => {
        const newData = response.data.filter(
          (newItem) =>
            !prevData.some((existingItem) => existingItem.id === newItem.id)
        );
        return [...prevData, ...newData];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to handle Pull to Refresh
  const handleRefresh = async () => {
    setRefreshing(true); // Start refresh animation
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1`
      );
      setData(response.data); // Reset list with fresh data
      setPage(1); // Reset page count
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false); // Stop refresh animation
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User logged out");
      navigation.replace("Login");
    } catch (error) {
      console.log("Logout failed:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { id: item.id })}
            style={styles.card}
          >
            <Image
              source={{ uri: `https://via.placeholder.com/150/${item.id}` }}
              style={styles.thumbnail}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.body}>
                {item.body}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={() => !loading && setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="blue" />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        } // ✅ Added Pull to Refresh
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: "gray",
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 8,
    color: "#fff",
    fontWeight: "bold",
  },
});
