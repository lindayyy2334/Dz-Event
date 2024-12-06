const signup = (req, res) => {
    // Logic for signup
    res.send('User signed up');
};

const signin = (req, res) => {
    // Logic for signin
    res.send('User signed in');
};

module.exports = { signup, signin };
