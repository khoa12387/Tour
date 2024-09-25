import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa'; // Import Google icon from react-icons

const clientId = '517086870003-s3iejub9l61ojol1536pvva7kuavbkid.apps.googleusercontent.com';

const GoogleLoginButton = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = (response) => {
        const id_token = response.credential;
        console.log('Google login success:', id_token);
        login(id_token);
        navigate('/');
    };

    const handleGoogleError = (error) => {
        console.error('Google login error:', error);
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="google-login-container">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onFailure={handleGoogleError}
                    prompt="select_account"
                    render={renderProps => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="custom-google-login-button"
                        >
                            <FaGoogle style={{ marginRight: '8px' }} />
                            Login with Google
                        </button>
                    )}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
