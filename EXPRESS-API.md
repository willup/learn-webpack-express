I. express()
- nó là một top-level functions được triết xuất bởi express.
var express = require('express')
var app = express()
1. Method của express
a. express.json([options])
- Nó là một built-in middleware function trong express, Nó phần tích các request đầu vào với json payloads và nó được dựa trên body-parser.
- Middleware trả về đó là chỉ json và chỉ nhìn thấy tại các request nơi Content-type header phù hợp với kiểu trong options.
- Nó chấp nhận mọi Unicode encoding của body và hỗ trợ tự động lam phát của gzip và deflate encodings.
- Có một đối tượng body mới chứa dữ liệu đã phân tích được đưa vào đối tượng request sau khi middleware., hoặc một đối tượng empty nếu không có body để phân tích, Content-type không phù hợn hoặc có lỗi.
- để sử dụng ta khai báo: 
app.use(express.json([options]))

b. express.static(root, [options])
- root: miêu tả thư mục gốc tờ đó phụ vụ các tài sản tĩnh như các images, css files và các file javascripts,
- khi không thấy file nó sẽ pản hồi một lỗi 404.
- để sử dụng ta khai báo
app.use(express.static(root, [options]))
- ta có thể sử dụng làm các static page.

c. express.Ruoter([options])
- Tạo mội đối tượng router. 
- Ta có thể thêm middleware và các HTTP methods routes (get, post, put, delete, so on) tới đối tượng router như một ứng dụng.
- để sử dụng ta khai báo:
app.use(path, <route object>)

d. express. urlencoded([options])
- Nó là một built-in middlware function của express. Nó phân tích các request đầu vào với tải urlencoded và được dựa trên body-parser.
- Middleware trả về đó là chỉ json và chỉ nhìn thấy tại các request nơi Content-type header phù hợp với kiểu trong options.
- Nó chấp nhận mọi Unicode encoding của body và hỗ trợ tự động lam phát của gzip và deflate encodings.
- Có một đối tượng body mới chứa dữ liệu đã phân tích được đưa vào đối tượng request sau khi middleware., hoặc một đối tượng empty nếu không có body để phân tích, Content-type không phù hợn hoặc có lỗi. đối tương body sẽ chứa các cặp key-value, nơi giá trị có thể là một string hoặc array khi extended: false hoặc mọi kiểu dự liệu cho value khi extened: true.

II. Application
- Đối tượng app được gọi bởi top-level express() function được xuất khẩu bởi Express module.
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000)

1. Properies
a. app.locals
- là đối tượng có các properties mà các biến được đặt trong ứng dụng
- Sử dụng
app.locals.<property>

b. app.mountpath
- Là propery chứa một hoặc nhiều mẫu path trên một sub-app được gắn kết.
var express = require('express')

var app = express() // the main app
var admin = express() // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath) // /admin
  res.send('Admin Homepage')
})

app.use('/admin', admin) // mount the sub app

2. Events
a. app.on('mount', callback(parent))
- event này được đối trên một sub-appm khi nó được gắn kế trên một parent app. parent app được đẩy tới callback fucntion.
var admin = express()

admin.on('mount', function (parent) {
  console.log('Admin Mounted')
  console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
  res.send('Admin Homepage')
})

app.use('/admin', admin)

3. Methods
a. app.all(path, callback [, callback ...])
- Nó tương tự với app.METHOD() methods, ngoại trừ nó phù hợp với tất cả các HTTP verbs.
- Nó hữu ích cho việc ánh xạ logic global cho tiền tố path cụ thể hoặc kết hợp tương ứng.

b. app.delete(path, callback [, callback ...])
- Route HTTP DELETE request tới path cụ thể  với các callback function cụ thể.
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage')
})

c. app.enable(name)
d. app.enabled(name)
e. app.engine(ext, callback)
- đăng kí template engine callback đã cho như ext.Nơi name là một trong các chuooix trong  'app string table'

f. app.get(name)
- Trả về giá trị của nam app đang setting, Nơi name là một trong các chuooix trong  'app string table'

g. app.get(path, callback [, callback ...])
- Routes HTTP GET request tới path được miêu tả với các callback function được miêu tả.

h. app.listen(path, [callback])
- Bắt đầu một UNIX socket và lắng nghe cho các kết nối trên path đã cho.
var express = require('express')
var app = express()
app.listen('/tmp/sock')

i. app.listen([port[, host[, backlog]]][, callback])
- Gắn và lắng nghe các kết nối trên host và port được miêu tả.
