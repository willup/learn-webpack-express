#Đinh nghĩa
1. Webpack là một static module bundler cho các ứng dụng javascript hiện đại. khi webpack xử lý ứng dụng của bạn, nó builds một dependency graph nội bộ, nó map mọi module project của bạn cần và sinh ra một hoặc nhiều bundles (bó)
2. Từ phiên bản 4.0.0m webpack không yêu cầu một file cấu hình để bó project cura bạn, tuy nhiên nó cóa thể cấu hình đáng kinh ngạc để phù hợp với nhu cầu của bạn.
3. Để bắt đầu bạn cần hiểu các khái niệm chính: Entry, Output, Loaders, Plugins, Mode, Browser Compatibility.
#Entry
- Một điểm đầu vào (entry points) cho biết webpack module nên sử dụng để bắt đầu xây dựng đầu ra biểu đồ phụ thuộc (dependency graph) nội bộ của nó.
- Mặc định giá trị của nó là './src/index.js', nhưng bạn có thể miêu tả một hoặc nhiều điểm truy nhập khác bằng việc cấu hình thuộc tính entry trong file cấu hình webpack.
- webpack configuaration file name: webpack.config.js
- example for entry:
 module.exports = {
  entry: './path/to/my/entry/file.js'
};

#Output
- Thuộc tính 'output' nói webpack nơi phát ra bundles(bó) nó được tạo và tên các file đó thế nào. Mặc định tới './dist/main.js' cho file đầu ra chính và tới './dist' folder cho mọi file khác được sinh ra.
- Bạn có thể cấu hình phần xử lý này bởi việc miêu tả một 'output' field trong cấu hình của bạn
- example for output:
const path = require('path');
module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname là tên thư mục chứa file hiện tại.
    filename: 'my-first-webpack.bundle.js'
  }
};
Trong ví dụ trên, chúng ta sử dụng output.filename và output.path để webpack biết tên bundle của chúng ta và nơi chúng ta muốn nó được bắn tới.

#Loaders
- Đầu ra của box, webpack chỉ hiểu javascript và json files. Loaders cho phép webpack xử lý các loại file khác và convert chúng vào trong các modules có hiệu lực nó có thể được tiêu thụ bởi ứng dụng của bạn và được thêm tới dependency graph.
- Tại high level, loader cí 2 thuộc tính trong cấu hình webpack của bạn"
 + thuộc tính 'test' định nghĩa files nào nên được giao dịch
 + thuộc tính 'use' cho biết loại loader nào nên được sử dụng để giao dịch.
 - example for loader:
 const path = require('path');
module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
Trong ví dụ trên định nghĩa một thuộc tính 'rules' cho một module đơn giản với 2 thuộc tính được yêu cầu : 'test' và 'use'

#Plugins
- Trong khi loader được sử dụng để giao dịch các loại cần thiết cỉa các module, plugins có thể được tận dụng để thực hiện một loạt các nhiệm vụ như tối uwu hóa gói, quản lý tài sản và inject các biến môi trường.
- Theo thứ tự sử dụng một plugin, ta cần 'required()' nó và thêm nó tới mảng plugins. hầu hết các pluigins được phép tùy chỉnh thông qua các tùy chọn. Vì bạn có thể sử dụng một plugin nhiều lần trong một cấu hình cho các mục đích khác nhau, bạn cần tạo một thể hiện của nó bằng việc gọi nó với toán tử 'new'.
- Example for plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
Trong ví dụ trên, 'html-webpack-plugin' sinh ra một file HTML cho ứng dụng của bạn bằng việc inject tự động tất cả các bundles được sinh ra.

#Mode
- Bằng việc setting tham biến 'mode' tới một trong các giá trị 'development', 'production' hoặc 'none', bạn có thể cho phép tối ưu hóa built-in của webpack cho mỗi môi trường. mặc định là 'production'.
- Example for mode
module.exports = {
  mode: 'production'
};

#Browser Compatibility
- Webpack hỗ trợ tất cả các trình duyệt mà có ES5-compliant (IE8 trở xuống không được hỗ trợ). Webpack cần 'Promise' cho 'import()' và 'require.ensure()'. Nếu bạn muốn hỗ trợ các trình duyệt cũ, bạn cần load một polyfill trước khi sử dụng biểu thức.

#I. Entry Points
- Chúng ta có nhiều cách định nghĩa thuộc tính 'entry' trong file cấu hình webpack.
- single Syntax: entry: string| Array<string>
Đây là cú pháp đơn giản cho thuộc tính 'entry' là tốc ngắn.
- Example for single syntax
module.exports = {
  entry: './path/to/my/entry/file.js'
};

- Object Syntax: entry: {[entryChunkName:string]: string: Array<string>}
- Object syntax là dài dòng, tuy nhiên, đây là cách dễ nhất để định nghĩa entry/entries trong ứng dụng của bạn.
- Example for Object syntax
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};

#II. Output
- việc cấu hình các chọn lựa cấu hình 'output' nói webpack làm thế nào viết các file được biên dịch tới disk. Chú ý rằng, trong khi có thể có nhiều điểm 'entry', chỉ duy nhất một cấu hình 'output' được miêu tả.
- Với các yêu cầu nhỏ cho thuộc tính 'output' trong cấu hình webpack của bạn thiết lập giá trị của nó tới một đối tượng được nghĩ dưới đây:
 + một 'filename' được sử dụng cho các file đầu ra.
- Example
module.exports = {
  output: {
    filename: 'bundle.js',
  }
};

* Với nhiều Entry points
- Nếu cấu hình của bạn tạo nhiều hơn một 'chunk' đơn giản trong(tức là nhiều entry points), bạn nên sử dụng sự thạy thế để bảo đame rằng mỗi file là một tên duy nhất.
- Example
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};

// writes to disk: ./dist/app.js, ./dist/search.js

#III. Loaders
- Loader là những giao dịch được gắn lên source code của mỗi module, Chúng cho phép bạn xử lý trước các file như bạn 'import' hoặc "load" chúng. Vậy, loaders là loại như "tasks" trong các tools build khác và cung cấp một cách mạnh mẽ để xử lý các bước build front-end. Loaders có thể giao dịch các file từ một ngôn ngữ khác (như Typescript) thành javascript hoặc inline images như data URLs, Loaders cũng cho phép bạn làm mọi thứ giống 'import' CSS files trực tiếp từ các modules javascript của bạn.
- Example
 + Bạn có thể sử dụng loaders để nói webpack tải một CSS file hoặc convert Typescript thành javascript. Để làm điều này, bạn sẽ bắt đầu bởi việc cài đặt những loaders cần thiết:
 * npm install --save-dev css-loader
 * npm install --save-dev ts-loader
 Và sau đó chỉ dẫn cho webpack sử dụng css-loader cho mọi file .css và ts-loader cho tất cả các file .ts
 module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
- Using loaders
 + Có 3 cách sử dụng loaders trong ứng dụng của bạn:
  * Confiuration: miêu tả chúng trong gile webpack.config.js của bạn
  * inline: miêu tả chúng rõ ràng trong mooti câu lệnh 'import'
  * CLI: miêu tả chúng bên trong một shell command.
- Configuration
 + module.rules cho phép bạn miêu tả vài bộ loaders bên trọng việc cấu hình webpack của bạn, Đây là một cách ngắn gọn để hiển thị loadersm và giúp bản trig code rõ ràng. Nó cũng cung cấp cho bạn một cách nhìn tổng quát đầy đủ của mỗi loader tương ứng.
 + Loaders được ước lượng từ phải sanh trái hoặc từ dưới lên trên.
 module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // style-loader
          { loader: 'style-loader' },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // sass-loader
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};

- Inline
 + Nó có thể miêu tả loaders trong một cau lệnh 'import'. loaders tách biệt từ resource với !. mỗi phần được giải quyết lên quan đến thư mục hiện tại.
  * import Styles from 'style-loader!css-loader?modules!./styles.css';
 + Nó có thể ghi đè mọi loaders, preLoaders và postLoaders từ cấu hình bằng tiền tố trong caai câu lệnh 'import':
  * Tiền tố ! sẽ disable (vô hiệu hóa) tất cả các loaders thông thường đã được cấu hình.
  import Styles from '!style-loader!css-loader?modules!./styles.css';
  * Tiền tố !! sẽ vô hiệu hóa tất cả các loaders được cấu hình (preLoaders, loaders, postLoaders)
  import Styles from '!!style-loader!css-loader?modules!./styles.css';
  * Tiền tố -! sẽ vô hiệu hóa tất cả các loader và preLoaders nhưng postLoaders thì không.
  import Styles from '-!style-loader!css-loader?modules!./styles.css';

- CLI
 + Bạn cũng có thể sử dụng loaders thông qua CLI
 webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'

- Loader Features
 + Loaders có theer được xích. Mỗi loader trong xích gắn giao dịch tới nguồn được xử lý. Mỗi xích được thực thi trong thứ tự đảo ngược. Loader đầu tiên được vượt qua kết quả của nó để tiếp theo và như vậy. Cuối cùng, webpack muốn javascript được trả lại bởi loader cuối cùng trong xích.
 + Loaders có thể đồng bộ hoặc bất đồng bộ.
 + Loaders chạy trong Node.js và có thể làm mọi tứ mà nó có thể ở đó.
 + Loaders có thể được cấu hình với một đối tượng 'options'(sử dụng các tham biến 'query' để thiết lập các lựa chọn vẫn được hỗ trợ nhưng không được dùng nữa)
 + Các modules thông thường có thể export một loader trong việc thêm vào 'main' thông thường thông qua package.json với trường 'loader'.
 + Plugins có thể cung cấp loaders nhiều tính năng hơn. 
 + Loaders có thể phát ra các file có thể tùy ý bổ xung.

#IV. PLugins
- Plugins là xương sống của webpack. webpack bản thân nó là built lên same plugin system mà bạn sử dụng trong sự cấu hình webpack của bạn.
- Chúng cũng phục vụ much đích làm bất cứ điều gì mà một loader không thể làm.
- Anatomy (giải phẫu học)
 + Một webpack plugin là một đối tượng javascript mà có một phuiowng thức 'apply'. phương thức 'apply' này  được gọi bởi trinhg biên dịch webpack, cho phép truy nhập tời toàn bộ vong đời cửa sự biên dịch.
 + ví dụ: ConsoleLogOnBuildWebpackPlugin.js
 const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

  class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
      compiler.hooks.run.tap(pluginName, compilation => {
        console.log('The webpack build process is starting!!!');
      });
    }
  }
Tham số đầu tiên của phương thức nhấn của trình biên dịch hook nên là phiên bản camelized của tên plugin. Nên sử dụng hằng số cho việc này để có thể sử dụng lại trong tất cả các hooks.

- Usage
 + Từ khi plugins có thể lấy các đối số hoặc các options, bạn phải vượt qua một thể hiện 'new' tới thuộc tính 'plugins' trong cấu hình webpack của bạn.
 + Tùy thuộc vào cách bạn sử dụng webpack, có nhiều cách sử dụng plugins.

- Configuration
webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

- Node API
 + Khi bạn sử dụng Node API, bạn cũng có thể vượt qua plugins thông qua thuộc tính 'plugins' trong cấu hình
 + ví dụ: some-node-scripts.js
const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function(err, stats) {
  // ...
});

#V. Configuration
- Bạn có thể thấy rằng, một vài cấu hình webpack giống hệt nhau. Điều này là bởi vì file cấu hình của webpack là một file javascript mà trích xuất một cấu hình webpack. Cấu hình này sau đó được xử lý bởi webpack được dựa trên các thuộc tính được định nghĩa của chúng.
- Bởi vì nó là một module commonJS node.js tiêu chuẩn, bạn có thể làm dưới dây/:
 + import các file khác thông qua 'reqiure(...)'
 + sử dụng tiện ích trên npm thông qua 'require(...)'
 + sử dụng biểu thức luồn điều khiển javascript (ví dụ: toán tử ?:)
 + sử dụng các hằng số hoặc các biến cho các giá trị được sử dụng thường xuyên.
 + viết và thực thi các functions để sinh ra một phần của cấu hình.
- Sử dụng các tính năng đó khi thích hợp.
- Mặc dù chúng đúng về mặt kĩ thuật, dưới đây các thực hành chúng ta nên tránh:
 + truy nhập các đối số CLI, khi sử dụng webpack CLI
 + Xuất các giá rị không xác định.
 + viết các cấu hình quá dài.
 - Các ví dụ dưới đây miêu tả cấu hình của webpack theea nào, có thể cả 2 ngôn ngữ biểu càm và được phép cấu hình bởi vì nó là code:
 - Simple configuration
 + webpack.config.js
 var path = require('path');

  module.exports = {
    mode: 'development',
    entry: './foo.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'foo.bundle.js'
    }
  };
- Multiple targets
 + Cùng với việc trích xuất một cấu hình đơn giản như một object, function hoặc Promise, bạn có thể trích xuất multiple cấu hình.
- Các loại cấu hình
 + Ngoài trích xuất một đối tượng cấu hình đơn, có một vài cách khách mà đáp ứng được nhu cầu cần thiết khác.
 https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations

- Sử dụng các ngôn ngữ cấu hình khác
+ webpack chấp nhận các file cấu hình được viết trong các ngôn ngữ lập trình và dữ liệu khác nhau.
* TypeScript
  + để viết cấu hình webpack trong typescript, bạn nên cài các dependencies cần thiết đầu tiên.
  npm install --save-dev typescript ts-node @types/node @types/webpack
  # and, if using webpack-dev-server
  npm install --save-dev @types/webpack-dev-server
  + và sau đó tiến hành viết cấu hình của bạn
  webpack.config.ts
  import path from 'path';
  import webpack from 'webpack';

  const config: webpack.Configuration = {
    mode: 'production',
    entry: './foo.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'foo.bundle.js'
    }
  };

  export default config;
  + Ở ví dụ trên giả định version >= 2.7 hoặc mới hơn của Type script được sử dụng với các lựa chọn biên dịch 'esModuleInterop' hoặc 'allowSyntheticDefaultImports' trong file 'tsconfig.json' của bạn.
  + Chú ý rằng bạn cũng sẽ cần kiểm tra file 'tsconfig.json' của bạn. nếu module trong 'compilerOptions' trong 'tsconfig.json' là 'commonjs'. việc setting là hoàn thành, hoặc webpack sẽ thất bại với một lỗi. điều này xảy ra bởi vì 'ts-node' không hỗ trợ mọi cú pháp module ngoài 'commonjs'.
  + Có 2 cách giải quyết trong vấn đề này:
   a. thay đổi 'tsconfig.json'
   b. cài đặt 'tsconfig-paths'.
  + Lựa chọn đầu tiên là mở file 'tsconfig.json' của bạn và tìm 'compilerOptions'. set thuộc tính 'target' là "ES5" và thuộc tính 'module' là "CommonJS" (hoặc xóa hết lựa chọn 'module')
  + Lựa chọn thứ 2 là cài đặt gói 'tsconfig-paths'
  npm install --save-dev tsconfig-paths
  và tạo một cấu hình typescript riêng biệt miêu tả webpack configs của bạn:
  tsconfig-for-webpack-config.json
  {
    "compilerOptions": {
      "module": "commonjs",
      "target": "es5",
      "esModuleInterop": true
    }
  }
  sau đó thiết lập biến môi trường 'process.env.TS_NODE_PROJECT' được cung cấp bởi 'tsconfig-path' như sau:
  package.json
  {
    "scripts": {
      "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
    }
  }

#VI. Modules
- Trong modular programming, những nhà phát triển đã chia chương trình rời rạc của các chức năng được gọi là module.
- Mỗi module có diện tích bề mặt nhỏ hơn chương trinh đầy đủ, tạo xác thực, gỡ lỗi và kiểm thử. module được viết tốt cung cấp các tóm tắt và đóng gói vững chắc, vì vậy mỗi module phải có thiết kế mạch lạc và mục đích rõ ràng trong ứng dụng cụ thể.
- Mode.js đã hỗ trợ lập trình modular hầu hết kể từ khi thành lập. Trên web, hỗ trợ cho các modules đã đến chậm. Nhiều công cụ tồn tại mà hỗ trợ modular javascript trên web, với nhiều lợi ích và hạn chế. Webpack xây dựng dwuaj trên những bài học rút ra từ hệ thống này và áp dụng khái niệm modul cho bất kỳ file nào trong dự án của bạn.
1. What is a webpack module
- trong tương phản tới Node.js modules, webpack modules các thể hiện sự phụ thuộc theo nhieuf cách khách nhau. Dưới đây là một vài ví dụ:
 + một câu lệnh 'import' ES2015.
 + một câu lệnh 'require()' CommonJS.
 + Một AMD câu lệnh 'define' và 'require'.
 + Câu lệnh '@import' bên trong các file css/ sacc/ less.
 + Một image url trong stylesheet (url(...)) hoặc html (<img src...>) file.
2. Supported Module Types
- webpack hỗ trợ các module được viết bằng nhiều ngôn ngữ và tiền xử lý, thông qua loaders. Loaders diễn tả webpack xử lý thê nào các module no-javascript và bao gồm các phụ thuộc bên trong các bundles của bạn. cộng đồng webpack đã xây dựng các loaders cho nhiều ngôn ngữ và bộ xử lý ngôn ngữ, bao gồm:
 + CoffeeScript, TypeScript, EsSNext(Babel), Sas, Less, Stylus.

#VII. Module Resolution (Sự giải quyết Module)
- Một resolver là một thư viện nó giúp định vị một module bằng đường dẫn tuyệt đối. Một module có thể được yêu cầu như là một dependency từ module khác
import foo from 'path/to/module';
// or
require('path/to/module');
- Module phụ thuộc có thể từ mã code hoặc thư viện bên thứ 3.  The resolver giúp webpack tìm module code mà cần được bao gồm trong bundle. ta sử dụng câu lệnh 'require/import'. webpack sử dụng 'enhanced-resolve' để resolve các đường dẫn file trong các bundling modules.

1. Các quy tắc Resolving trong webpack
- Sử dụng enhanced-resolve, webpack có thể giải quyết 3 loại đường dẫn file.
2. Các đường dẫn tuyệt đối.
import '/home/me/file';
import 'C:\\Users\\me\\file';

3. Các đường dẫn tương đối.
import '../src/file1';
import './file2';
- Trong trường hợp này, thư mục của file nguồn nơi 'import' hoặc 'require' xảy ra là thư mục context. Đường dẫn tương đối trong 'import/require' được nối tới đường dẫn context này để tạo đượng dẫn tuyệt đối tới module.

4. Module paths
import 'module';
import 'module/lib/file';
- Modules được tìm kiếm bên trong tất cả các thư mục được miêu tả trong 'resolve.modules'.  Bạn có thể thay thế đường dẫn module gốc bởi một đường dẫn thay thế bằng việc tạo một alias cho nó, sử dụng 'resolve.alias' trong cấu hình option.
- Một khi ppath được giải quyết được dựa trên quy tắc ở trên, resolver kiểm tra xem nếu các điểm path tới một file hoặc thư mục. Nếu các điểm đường dẫn tới 1 file:
 + nếu đường dẫn là một sự mở rộng file, thì file được bó ngay lập tức.
 + Ngoài ra, file extension được giải quyết sử dụng 'resolve.extensions' option, nó nói cho người giải quyết với các extensions(ví dụ: .js, .jsx, .tag, ...) được phép chấp nhận cho sự quả quyết.
- Nếu path points tới một folderm thì các bước dưới đây nắm lấy để tìm đúng file với các extention đúng.
 + Nếu folder chứa một  'package.json' file, thì các trường miêu tả trong 'resolve.mainFileds' cấu hình lựa chọn được nhìn theo thứ tự và đầu tiên như trường trong 'package.json' được chứng minh trong đường dẫn file.
 + Nếu không có 'package.json' hoặc nếu các trường chính không trả về một đường dẫn valid, các tên file được miêu tả trong 'resolve.mainFiles' configuration options được thấy theo thứ tự, để thấu nếu nếu 1 file name tồi tại phù hợp trong thư mục được nhập khẩu hoặc được yêu cầu,
 + Các extentsion file thì được giải quyết thương tự cách sử dụng 'resolve.extensions'.
- webpack cung cấp mặc định hợp lý cho các options tùy ý trên build target của bạn.

5. Resolving Loaders
- điều này cho phép các quy tắc giống nhau được miêu tả đó cho sự giải quyết file. Nhưng resolveLoader configuration option có thể được sử udnjg để có các quy tắc giải quyết đặc biệt cho loaders.

#VIII. Depndency Graph.
- Mọi lúc một file phụ thuộc trên file khác, webpack đối xử điều này như một dependency.  điều này cho phép webpack lấy tài sản không code, như là các image hoặc web fonts,  và cũng cung cấp chúng như các dependencies cho ứng dụng của bạn.
- Khi webpack xử lý ứng dụng của bạn, nó bắt đầu từ một danh sách các module được định nghĩa trên command line hoặc trong file cấu hình của nó.  Bắt đầu từ 'entry point' webpack build đệ quy một đồ thị dependency graph mà bao gồm mọi module ứng dụng của bạn cần, chúng bundkes tất cả các modules đó thành một số nhỏ các bundles - thường, chỉ một- được load bởi trình duyệt.

#IX. Targets
- Bởi vì, javascript có thể được viết cả server và client, webpack thường triển khai nhiều targets mà bạn có thể set trong cấu hình webpack của bạn.
1. Usage
- Để thiết lập thuộc tính target, bạn đơn giản thiết lập giá trị target trong cấu hình webpack của bạn.
ví dụ: webpack.config.js
module.exports = {
  target: 'node'
}
- trong ví dụ trên, sử dụng 'node' webpack sẽ biện dịch cho việc sử dụng trong một Node.js như môi tường (sử dụng Node.js require để load các miếng và không chạm mọi built trong các module như fs hoặc path)

2. Multiple targets
- Mặc dù webpack không hỗ trợ multiple strings được đẩy vào trong thuộc tính target, bạn có thể tạo một thư viện đẳng cấu bằng việc bó 2 cấu hình riêng biệt:
ví dụ:
webpack.config.js
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //…
};

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];
