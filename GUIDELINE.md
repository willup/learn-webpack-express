#I. Getting started
- webpack được sử dụng để biên dịch các module javascript.
1. Basic setup (Được sử dụng trong nodejs, và nên sử dụng gitbash trên winsdown)
a. Tạo project
    mkdir <project name>
    cd <project name>
b. Tạo file package.json cho project
    npm init -y
c. Cài đặt các depndency cho webpack trong project
    npm install webpack --save-dev
    npm install webpack-cli --save-dev
d. Tạo cấu trúc project
    cd <project name>
    mkdir src
2. Using a configuration
e. Tạo một file cấu hình cho webpack trong nodejs
    (webpack.config.js)
    npx webpack-cli init
    hoặc
    touch webpack.config.js và sử dụng để tạo customer configuration content cho webpack trong webpack.config.js file.

3. NPM Script
f. Để build webpack mà sử dụng npm script
    -Thêm build webpack trong scripts của file package.json
    "scripts":{
        "build":"npm run build:webpack",
        "build:webpack":"webpack"
    }
    -Nếu build cả typescript thì ta cấu hình như sau:
    "scripts":{
        "build":"npm run build:tsc & npm run build:webpack",
        "build:webpack":"webpack",
        "build:tsc"
    }
    - khi muốn build chỉ cần sử dụng command
    npm run build
    * Bạn phải cài babel-loader, style-loader, css-loader, eslint-loader neu chúng được cấu hình trong webpack: 
        npm install @babel/core --save
        npm install babel-core
        npm install babel-preset-env
        npm install babel-loader
        npm install eslint
        npm install eslint-loader
        npm install style-loader
        npm install css-loader

#II. Asset Management
4. Loading CSS và Images
g. Để import một file css từ bên trong một module javascript, chúng ta sẽ cần làm như sau:
    - Thêm dependency stype-loader và css loader
    npm install stype-loader css-loader
    - Thêm rule và file cấu hình của webpack
    + module: {
    +     rules: [
    +       {
    +         test: /\.css$/,
    +         use: [
    +           'style-loader',
    +           'css-loader'
    +         ]
    +       }
    +     ]
    +   }

    - Bây giờ ta có thể thêm file css vaoaf trong file *.js sử dụng câu lệnh 'import'
    ví dụ: tạo file style.css và import file này vào trong index.js file
    - muốn sử dụng css trong js phải thồng qua DOM của html.
h. Để sử dụng được images như trong backgrounds and icons, etc. chúng ta cần làm như sau:
    - Thêm dependency file-loader
    npm install file-loader
    - thêm rule vào file cấu hình của webpack
    +       {
    +         test: /\.(png|svg|jpg|gif)$/,
    +         use: [
    +           'file-loader'
    +         ]
    +       }
    - muốn sử dụng image trong js phỉa thông quan DOM html, cách làm giống css.

i. Để sử dụng Fonts ta cũng dùng file-loader dependency và cấu hình như sau:
    - Thêm dependency file-loader
    npm install file-loader
    - thêm rule vào file cấu hình của webpack
    +       {
    +         test: /\.(woff|woff2|eot|ttf|otf)$/,
    +         use: [
    +           'file-loader'
    +         ]
    +       }
    - Sử dụng fonts trong css file. Tạo một annotation cho font, thêm chúng vào các selector của css thông quan id hoặc class.
    ví dụ:
    + @font-face {
    +   font-family: 'MyFont';
    +   src:  url('./my-font.woff2') format('woff2'),
    +         url('./my-font.woff') format('woff');
    +   font-weight: 600;
    +   font-style: normal;
    + }

    .main{
        font-family: 'MyFont';
    }

j. Sử dụng file csv và xml ta sử dụng
    - Thêm dependency csv-loader và xml-loader.
    npm install --save-dev csv-loader xml-loader
    - Thêm rule vào file cấu hình của webpack
    {
         test: /\.(csv|tsv)$/,
         use: [
           'csv-loader'
         ]
    },
    {
        test: /\.xml$/,
        use: [
        'xml-loader'
        ]
    }

#III. Output management
   - Cho đến đây, chứng ta đã thực hiện thủ công tất cả các tài sản trong file index.html của chúng ta, nhưng ứng dụng của chúng ta phát triển lên và một khi bạn bắt đầu sử dụng các băm trong các tên file và xuất ra nhiều bó, nó sẽ là rất khó tiếp tục quản lý file index.html theo cách thủ công. Tuy nhiên có một vài plugin đã tồn tại mà sẽ giúp quá trình này quản lý dễ dàng.
    1. HttmlWebpackPlugin
   - thêm deependency html-webpack-plugin
   npm install --save-dev html-webpack-plugin
   - thêm cấu hình webpack
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   - sử dụng trong file cấu hình.
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management',
       template: './views/index.html',
       filename: './views/index.ejs'
     })
   ]
   - Mặc định nó sẽ sinh ra file index.html riêng của nó, nếu đã có file index.html ở đầu ra thì nó sẽ thay thế file bằng một file mới được sinh ra. và tất cả các bundles được tự động thêm vào.
   - Bạn cũng có thể thấy html-webpack-template, nó cung cấp một vài tính năng bổ xung  trong việc thêm tới các template mặc định.

    2. CleanWebpackPlugin
    - được sử dụng để xóa file cũ mà được sinh ra trước đó.
    - thêm dependency clean-webpack-plugin
    npm install --save-dev clean-webpack-plugin
    - Thêm vào cấu hình webpack
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    - sử dụng trong file cấu hình
     plugins: [
     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ]

#IV. Development
