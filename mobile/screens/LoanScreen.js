import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Appbar, 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Text,
  List,
  Divider
} from 'react-native-paper';

const LoanScreen = ({ navigation, route }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const returnBook = async (loanId) => {
    try {
      await fetch(`http://192.168.1.155:3000/loans/${loanId}/return`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.1.155:3000/loans/my-loans', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setLoans(await response.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Mes emprunts" />
      </Appbar.Header>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : loans.length === 0 ? (
        <Text style={styles.empty}>Vous n'avez aucun emprunt en cours</Text>
      ) : (
        <ScrollView>
          {loans.map((loan) => (
            <Card key={loan._id} style={styles.card}>
              <Card.Content>
                <Title>{loan.book.title}</Title>
                <Paragraph>Auteur: {loan.book.author}</Paragraph>
                <Paragraph>
                  Emprunté le: {new Date(loan.borrowedDate).toLocaleDateString()}
                </Paragraph>
                <Paragraph>
                  À rendre avant le: {new Date(loan.returnDate).toLocaleDateString()}
                </Paragraph>
              </Card.Content>
              {!loan.returned && (
                <Card.Actions>
                  <Button 
                    mode="contained" 
                    onPress={() => returnBook(loan._id)}
                  >
                    Rendre le livre
                  </Button>
                </Card.Actions>
              )}
              <Divider />
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { margin: 10 },
  loader: { marginTop: 20 },
  empty: { textAlign: 'center', marginTop: 20 }
});

export default LoanScreen;