const users = [
    { id: 1, username: 'shailendra@gmail.com', password: 'Testing@123' },
    { id: 2, username: 'user2', password: 'password2' },
];
export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find((u) => u.username === username && u.password === password);
            if (user) {
                resolve({ success: true, user });
            } else {
                reject({ success: false, message: "Invalid" })
            }
        }, 1000)
    })

}
