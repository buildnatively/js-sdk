module.exports = {
    presets: [
        "@babel/preset-typescript",
        ["@babel/preset-env", {
            modules: "auto",
            targets: {
                esmodules: true
            }
        }]
    ]
}
