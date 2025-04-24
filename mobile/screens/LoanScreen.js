import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
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
import { getToken } from '../utils/auth';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const LoanScreen = ({ navigation, route }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const returnBook = async (loanId) => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`http://192.168.1.155:3000/loans/${loanId}/return`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLoans(loans.filter(l=>l._id!=loanId))
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
  
      const fetchLoans = async () => {
        try {
          setLoading(true);
          const token = await getToken();
          const response = await fetch('http://192.168.1.155:3000/loans/my-loans', {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
          const data = await response.json();
          if (isActive) {
            setLoans(data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };
  
      fetchLoans();
  
      return () => {
        isActive = false;
      };
    }, [])
  );
  

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