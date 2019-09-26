
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    "mode": "production",
    "entry": {
        "app":"./src/index.js",
    },
    "output": {
        "path": path.resolve(__dirname, 'static'),
        // name value is key name in entry properties and  optimization.splitChunks.cacheGroups
        "filename": "js/[name].bundle.js" 
    },
    optimization: {
        splitChunks: {
          // cacheGroups内にバンドルの設定を複数記述できる
          cacheGroups: {
            // 今回はvendorだが、任意の名前で問題ない
            vendor: {
              // node_modules配下のモジュールをバンドル対象とする
              test: /node_modules/,
              name: 'vendor',
              chunks: 'initial',
              enforce: true,
            }
          }
        }
      },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            //title: 'Output Management',
            template: './views/index.html',
            filename: './views/index.ejs'
        })
    ],
    "module": {
        "rules": [
            // {
            //     "enforce": "pre",
            //     "test": /\.(js|jsx)$/,
            //     "exclude": /node_modules/,
            //     "use": "eslint-loader"
            // },
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "env"
                        ]
                    }
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                "test":/\.(png|svg|jpg|gif)$/,
                "use":[
                    "file-loader"
                ]
            },
            {
                "test": /\.(woff|woff2|eot|ttf|otf)$/,
                "use": [
                    'file-loader'
                ]
            }
        ]
    }
}