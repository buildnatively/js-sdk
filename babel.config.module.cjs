module.exports = {
    presets: [
        "@babel/preset-typescript",
        ["@babel/preset-env", {
            modules: false,
            targets: {
                esmodules: true
            }
        }]
    ]
}
