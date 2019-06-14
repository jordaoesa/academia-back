module.exports = {
    server: {
        title: 'Academia-Back',
        port: process.env.PORT || 3000
    },
    db: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/academia-back',
        options: {
            useNewUrlParser: true,
            user: process.env.MONGO_USER || '',
            pass: process.env.MONGO_PASS || ''
        }
    }
};
