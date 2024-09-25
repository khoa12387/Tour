import { AuthProvider, HttpError } from 'react-admin';

interface User {
    username: string;
    groups: { name: string }[];  // Giả sử thông tin nhóm của người dùng được lưu ở đây
}

const tokenKey = 'token';
const userKey = 'user';

/**
 * This authProvider is for integrating with OAuth token-based authentication.
 */
export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        try {
            const requestData = new URLSearchParams({
                grant_type: 'password',
                username,
                password,
                client_id: "Cjmncda7LIsE3LAa8Mk9tSyesN2WI4LXwtjfItOS",
                client_secret: "jfcnajbZguBYycNy8c2LRvshpGJ52Och1BuYCDuLh36CVL4dl7XBk0aEcENsFfqvFsUBy1FJ0ph9Io5zylvorLJhxIP0lvlTGAb6yeuTz4RxI9jkNkrXUQ9X8g0FjwKn"
            }).toString();

            const res = await fetch('http://127.0.0.1:8000/o/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: requestData
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new HttpError('Unauthorized', res.status, { message: errorText });
            }

            const { access_token } = await res.json();
            localStorage.setItem(tokenKey, access_token);

            // Fetch current user information
            const userRes = await fetch('http://127.0.0.1:8000/users/current/', {
                headers: { 'Authorization': `Bearer ${access_token}` }
            });

            if (!userRes.ok) {
                throw new HttpError('User fetch error', userRes.status);
            }

            const user: User = await userRes.json();

            // Check if the user belongs to the 'webmaster' group
            const isWebmaster = user.groups.some(group => group.name === 'Web Master');
            if (!isWebmaster) {
                throw new HttpError('Unauthorized', 403, { message: 'User does not belong to the webmaster group' });
            }

            localStorage.setItem(userKey, JSON.stringify(user));

            return Promise.resolve();
        } catch (error) {
            console.error('Login error:', error);
            return Promise.reject(error);
        }
    },

    logout: () => {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
        return Promise.resolve();
    },

    checkError: (error) => {
        if (error && error.status === 401) {
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: () =>
        localStorage.getItem(tokenKey) ? Promise.resolve() : Promise.reject(),

    getPermissions: () => {
        // Optionally return user permissions if needed
        return Promise.resolve();
    },

    getIdentity: () => {
        const user = localStorage.getItem(userKey);
        return Promise.resolve(user ? JSON.parse(user) : null);
    },
};

export default authProvider;
