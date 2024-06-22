// App.tsx
import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './_layout';

const App: React.FC = () => {
    return (
        <NativeRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
            </Routes>
        </NativeRouter>
    );
};

export default App;




