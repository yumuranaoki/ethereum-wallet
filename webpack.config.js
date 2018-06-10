export const mode = "development";
export const entry = './src/main.js';
export const output = {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', { 'modules': false }],
                            'react'
                        ]
                    }
                }
            ]
        }
    ]
};