// src/gapiLoader.js
export const loadGapi = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
            window.gapi.load('auth2', () => {
                const auth2 = window.gapi.auth2.init({
                    client_id: '517086870003-s3iejub9l61ojol1536pvva7kuavbkid.apps.googleusercontent.com',
                });
                auth2.then(() => resolve(auth2), reject);
            });
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};
