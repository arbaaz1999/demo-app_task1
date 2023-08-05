import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, Homepage } from '../Pages';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth'

const AppRoutes = () => {
    const [isUserLogedIn, setIsUserLogedIn] = useState(false)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsUserLogedIn(true)
        } else setIsUserLogedIn(false);
    });

    return (
        <>
            {isUserLogedIn ? (
                <Routes>
                    <Route path='/home' element={<Homepage />} />
                    <Route path='*' element={<Navigate to='/home' replace />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
            )}

        </>
    )
}

export default AppRoutes