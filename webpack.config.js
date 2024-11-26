const config = {
    mode: "production",
    entry: {
        "natively-frontend.min": "./src/index.ts",
    },
    output: {
        path: process.cwd(),
    },
    optimization: {
        usedExports: false
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        emitDeclarationOnly: false,
                        noEmit: false,
                    },
                }
            }
        ]
    },
};

export default config;
