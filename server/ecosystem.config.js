module.exports = {
    apps: [
        {
            name: 'server',
            script: './api/Livevideo.js',
            watch: true
        },
        {
            name: 'index',
            script: 'index.js',
            watch: true
        }
    ]
};