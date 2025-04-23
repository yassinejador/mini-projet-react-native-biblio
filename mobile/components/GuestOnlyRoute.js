// components/GuestOnlyRoute.js
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../utils/AuthContext';

export default function GuestOnlyRoute({ navigation, children }) {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
    //   navigation.replace();
    }
  }, [isAuthenticated]);

  return !isAuthenticated ? children : null;
}
