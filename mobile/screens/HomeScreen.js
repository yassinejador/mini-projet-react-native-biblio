import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { AuthContext } from '../utils/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Bienvenue à la Bibliothèque</Title>
          <Paragraph>
            Gérez vos emprunts de livres facilement avec cette application.
          </Paragraph>
        </Card.Content>
        {isAuthenticated ?(
          <Card.Actions>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Books')}
            style={styles.button}
          >
            Voir les livres
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('Loans')}
            style={styles.button}
          >
            Mes emprunts
          </Button>
        </Card.Actions>
        ):
        <Card.Actions>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          >
            Se Connecter
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('register')}
            style={styles.button}
          >
            S'inscrire
          </Button>
        </Card.Actions>
        }
        
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginTop: 20,
  },
  button: {
    margin: 5,
  }
});

export default HomeScreen;