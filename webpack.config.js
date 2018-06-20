module.exports = {
    mode: 'development',
    entry: __dirname + "/src/index.js",
    watch: true,
    output: {
        path: __dirname + "/public/javascript",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["env", {"modules": false}],
                                "react"
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
}