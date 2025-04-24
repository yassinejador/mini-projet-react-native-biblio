import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { 
  Appbar, 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Text 
} from 'react-native-paper';
import { getToken } from '../utils/auth';

const BooksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]),
  [loading, setLoading] = useState(true),
  handleEmprunter = async (bookId) => {
    try {
      setLoading(true);
      
      const token = await getToken();
      if (!token) throw new Error("No token found");
  
      const response = await fetch(`http://192.168.1.155:3000/loans`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Bad request:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setBooks(books.filter(b=>b._id!=bookId))
  
    } catch (error) {
      console.error("Failed to borrow book:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {

    const fetchBooks = async () => {
      try {
        setLoading(true);
        const token = await getToken();
      if (!token) throw new Error("No token found");
        const response = await fetch(`http://192.168.1.155:3000/books/disponibles`,{
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        setBooks(await response.json());
  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Bibliothèque" />
        <Appbar.Action icon="logout" onPress={() => navigation.navigate('Login')} />
      </Appbar.Header>


      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.author}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button 
                  mode="contained" 
                  onPress={() =>handleEmprunter(item._id)}
                >
                  Emprunter
                </Button>
              </Card.Actions>
            </Card>
          )}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading? <ActivityIndicator size="small" /> : null
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Aucun livre trouvé</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { margin: 10 },
  card: { margin: 10 },
  loader: { marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 }
});

export default BooksScreen;