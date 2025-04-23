import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Error removing token', error);
  }
};

export const refreshAuthToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    const response = await axios.post('http://localhost:3000/auth/refresh', {
      refreshToken
    });

    await storeToken(response.data.token, response.data.refreshToken);
    return response.data.token;
  } catch (error) {
    console.error('Error refreshing token', error);
    await removeToken();
    return null;
  }
};