const path = require("path");

module.exports = {
    mode: "production",
    entry: "./teste.ts",
    output: {
        path: path.resolve(__dirname),
        filename: "teste.js"
    },
    module: {
        rules: [
            {
                test:/\.ts$/,
                exclude: "/node_modules",
                use: "ts-loader"
            }
        ]
    }
};