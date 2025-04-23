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

const BooksScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://192.168.1.155:3000/books`);
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
                  onPress={() => navigation.navigate('Loan', { bookId: item._id })}
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