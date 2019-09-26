I. Routing
- Nó cho biết các điểm cuối của ứng dụng được phản hồi tới các yêu cầu từ client của ứng dụng như thế nào.
- Sử dụng các method của đối tượng app (const express = reuire('express'); const app = express();) Express. 
- Bạn cũng có thể sử dụng app.all() để xử lý tất cả các method và app.use() để miêu tả middleware như các callback function.
- Các phương thức routing đó miêu tả một callback function được gọi khi ứng dụng nhận một request tới router miêu tả và phương thức HTTP.
- Các phương thức routing có thể nhiều hơn 1 callback function với các đối số.
- Với nhiều callback function, nó là quan trọng cung cấp 'next' như đối số tới callback function và sau đó gọi 'next()' bên trong thân của function để ra tay điều khiển tới callback tiếp theo.
1. Các phương thức Route
    checkout copy delete
    get head lock merge
    mkactivity mkcol move
    m-search notify options
    patch post purge put
    report search subscribe
    trace unlock unsubscribe

2. Route paths
 - Nó kết hợp với một phương thước request, định nghĩa các điểm cuối tại nơi các yêu cầu có thể được làm.
 - Nó có thể là các string, các chuỗi patterns, hoặc các biểu thức chính quy.
 - Các ký tự ?, +, & và () là tập con của các đối tác biểu thức chính quy của chúng.
 - Các dấu (-) và (.) được giải thích theo nghĩa đen bởi các paths được dựa trên chuỗi.
 - Nếu bạn buốn sử dụng ký tự ($) trong một chuỗi đường dẫn, bao vây nó được đặt bên trong ([])
 ví dụ: yêu cầu "/data/$book" thì bạn phải viết "/data/([\$])book".
 - với ? tức là lựa chọn. ví dụ '/ab?cd' nó sẽ nhận path '/acd' và '/abcd'
 - Với + tức là cộng thêm ví dụ '/ab+cd' nó sẽ nhận path 'abcd' và 'abbcd' và 'abbbcd', cứ thêm b nhieu cũng được.
 - Với * đại diện cho một ký tự bất kì. ví dụ '/ab*cd' nó sẽ nhận abcd, abxcd, abRANDOMcd, ab123cd, vvv.
 - Với biểu thức chính quy ta sẽ đặt chúng trong /biểu thức/.

3. Route parameters.
 - Nó được đặt tên các phân đoạn url được sử dụng để nắm giá trị được chỉ định tại vị trí của chúng trong url.
 - Các giá trị được bắt được tập hợp trong đối tượng request.params, với tên của chúng được miêu tả trong các paths với các key được diễn tả
 - để định nghĩa các tham biến route ta sử dụng nhu sau. cú pháp: '/<:<key name>>'
 - Sử dụng với (-) và (.)
    Route path: /flights/:from-:to
    Request URL: http://localhost:3000/flights/LAX-SFO
    req.params: { "from": "LAX", "to": "SFO" }

    Route path: /plantae/:genus.:species
    Request URL: http://localhost:3000/plantae/Prunus.persica
    req.params: { "genus": "Prunus", "species": "persica" }
 - Sử dụng với biểu thức chính quy. ta sẽ gắn biểu thức chính quy trong cặp ngoặc trong (())
    Route path: /user/:userId(\d+)
    Request URL: http://localhost:3000/user/42
    req.params: {"userId": "42"}

4. Route handlers
 - bạn có thể cung cấp nhiều callback function mà được hành xử như middleware để xử lý một request.
 - Nó có thể trong form của một function, một mảng các function, hoặc cả 2. 
 - một single callback function trong route
    app.get('/example/a', function (req, res) {
    res.send('Hello from A!')
    })
 - Multi functions
    app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
    }, function (req, res) {
    res.send('Hello from B!')
    })
 - Array callback function
    var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
    }

    var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
    }

    var cb2 = function (req, res) {
    res.send('Hello from C!')
    }

    app.get('/example/c', [cb0, cb1, cb2])
 - kết hợp cả 2
    var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
    }

    var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
    }

    app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
    }, function (req, res) {
    res.send('Hello from D!')
    })

5. Response methods.
 - Các phương thức trên đối tượng response dưới đây có thể gửi tới client, và kết thúc vòng đời của request - response. nếu không có phương thức nào được gọi từ một route handler, thì các request của client sẽ bị treo.
  + response.download(): nhắc một file được tải.
  + response.end(): kết thúc xử lý phản hồi.
  + response.json(): gửi một phản hồi json.
  + response.jsonp(): gửi một phản hồi json với jsonp được hỗ trợ.
  + response.redirect(): chuyển hướng tới một request.
  + response.render(): đưa ra một view template.
  + response.send(): gửi một phản hồi với các kiểu khác nhau.
  + response.sendFile(): gửi một file như một actet stream.
  + response.sendStatus(): thiết lập một mã trạng thái phản hồi và gửi đại diện chuỗi của nó như một body phản hồi.

6. express().route()
 - Bạn có thể tạo chuỗi các route handlers cho một đường dẫn route bằng việc sử dụng express().route(). Nó là hữu ích cho nhiều tác vụ trên một single path.
 - example
   express().route('/book')
   .get(function (req, res) {
      res.send('Get a random book')
   })
   .post(function (req, res) {
      res.send('Add a book')
   })
   .put(function (req, res) {
      res.send('Update the book')
   })
7. express.Router()
 - Sử dụng express.Router class để tạo modular, gắn kết các route handler. Một thể hiện Router là một trung gian hoàn thành và hệ thống định tuyến,
 - Ví dụ:
   tạo file birds.js như sau:
   var express = require('express')
   var router = express.Router()

   // middleware that is specific to this router
   router.use(function timeLog (req, res, next) {
   console.log('Time: ', Date.now())
   next()
   })
   // define the home page route
   router.get('/', function (req, res) {
   res.send('Birds home page')
   })
   // define the about route
   router.get('/about', function (req, res) {
   res.send('About birds')
   })

   module.exports = router
 - Sau đó tải router module trong app
   var express = require('express');
   var app = express();
   var birds = require('./birds');
   app.use('/birds', birds);
 - App sẽ cho phép xử lý các request như /birds và /birds/about, cũng như gọi một function trung gian là timeLog mà được miêu tả trong route.

II. Viết middleware để sử dụng trong Express apps.
 - Middleware functions là các function mà được truy nhập tới đối tượng request, đối tượng response, và next function trong vòng đời request-response của ứng dụng. next function là một function trong Express router nó, khi được gọi, thực thi trung gian việc thành công trung gian hiện tại.
 - Các Middleware function có thể thi hành các nhiệm vụ dưới đây:
  + Thực hiện mọi code.
  + tạo việc thay đổi tới các đối tượng request và response.
  + Kết thúc vòng đời request - response.
  + Gọi các trung gian tiếp theo trong stack.
 - Nếu function trung gian hiện tại không kết thúc vòng đời request- response, nó phải gọi phương thức next() để đẩy điều kiến tới các function trung gian tiếp theo.  ngoài ra, request sẽ bị treo.
 - để load middleware function, gọi express().use(), miêu tả middleware function.
 - ví dụ:
   var express = require('express')
   var app = express()

   var myLogger = function (req, res, next) {
   console.log('LOGGED')
   next()
   }

   app.use(myLogger)

   app.get('/', function (req, res) {
   res.send('Hello World!')
   })

   app.listen(3000)
 - Mỗi khi app nhận được một request, nó chạy middleware function để print 'LOGGED'.
 - Thứ tự việc load các middleware là rất quan trọng.  middleware function được load đầu tiên thì cũng được thực thi đầu tiên.

1. Configurable middleware
 - Nếu bạn cần middleware function của bạn được phép cấu hình, export một function nó truy nhập một đối tượng options hoặc các tham biến khác, sau đó nó trả về một sự thi hành trung gian được dựa trên các tham biến đầu vào
 - ví dụ: file my-middleware.js
   module.exports = function (options) {
   return function (req, res, next) {
      // Implement the middleware function based on the options object
      next()
   }
   }
 - khi đó middleware có thể được sử dụng như sau:
   var mw = require('./my-middleware.js')
   app.use(mw({ option1: '1', option2: '2' }))

III. Using middleware
 - Express là một framework web định tuyến và middleware mà nó có các tính năng nhỏ của riêng nó.
 - Các loại middleware như sau:
 + middleware function ở mức ứng dụng.
 + middleware function ở mức Router.
 + middleware function cho việc sử lý Error.
 + middleware function trong Built-in.
 + middleware function của bên thứ 3.

1. Middleware ở mức ứng dụng
 - Gắn middleware mức ứng dụng tới một thể hiện của đối tượng express() bằng việc sử dụng  express().use() và express().METHOD() function, nới METHOD là các HTTP method của request mà middleware function xử lý (như GET, PUT, POST) trong lowercase.
 - Sử dụng express().use() khi viết một middleware function được thực hiện bất cứ lúc nào khi express() nhận một request.
 - ví dụ:
   var app = express()

   app.use(function (req, res, next) {
   console.log('Time:', Date.now())
   next()
   })

 - Sử dụng express().use() để viết một middleware function được thực hiện cho mọi loại của HTTP request trên một uri
 - ví dụ:
   app.use('/user/:id', function (req, res, next) {
   console.log('Request Type:', req.method)
   next()
   })

 - Sử dụng express().METHOD() để viết một middleware function được thực hiện cho mỗi loại của HTTP request trên một uri
 - Ví dụ:
   app.get('/user/:id', function (req, res, next) {
      res.send('USER')
   })
 - Bạn có thể tạo middleware sub-stack như sau
   app.get('/user/:id', function (req, res, next) {
   console.log('ID:', req.params.id)
   next()
   }, function (req, res, next) {
   res.send('User Info')
   })
 - Bạn có thể viết một mảng milldeware
 - Ví dụ
   function logOriginalUrl (req, res, next) {
   console.log('Request URL:', req.originalUrl)
   next()
   }

   function logMethod (req, res, next) {
   console.log('Request Type:', req.method)
   next()
   }

   var logStuff = [logOriginalUrl, logMethod]
   app.get('/user/:id', logStuff, function (req, res, next) {
   res.send('User Info')
   })

2. Middleware function ở mức Router.
 - Nó làm việc tương tự cách ở mức ứng dụng, ngoại trừ nó được ràng buộc tới một thể hiện của express.Router().
   var express = require('express')
   var app = express()
   var router = express.Router()
 - Load middleware mức router bằng cách sử dụng router.use() và router.METHOD() functions.
 - Ví dụ:
   // a middleware function with no mount path. This code is executed for every request to the router
   router.use(function (req, res, next) {
   console.log('Time:', Date.now())
   next()
   })

   // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
   router.use('/user/:id', function (req, res, next) {
   console.log('Request URL:', req.originalUrl)
   next()
   }, function (req, res, next) {
   console.log('Request Type:', req.method)
   next()
   })

   // a middleware sub-stack that handles GET requests to the /user/:id path
   router.get('/user/:id', function (req, res, next) {
   // if the user ID is 0, skip to the next router
   if (req.params.id === '0') next('route')
   // otherwise pass control to the next middleware function in this stack
   else next()
   }, function (req, res, next) {
   // render a regular page
   res.render('regular')
   })

   // handler for the /user/:id path, which renders a special page
   router.get('/user/:id', function (req, res, next) {
   console.log(req.params.id)
   res.render('special')
   })

   // mount the router on the app
   app.use('/', router)

3. Middleware cho Error handling
 - Định nghĩa các middleware function cho error -handling theo cách tương tự như các middleware function khác, ngoại trừ với 4 đối số thể hiện, miêu tả với chữ ký (err, req, res, next);
 - Ví dụ:
   app.use(function (err, req, res, next) {
   console.error(err.stack)
   res.status(500).send('Something broke!')
   })

4. Middleware cho Built-in
 - Express có các Middleware function cho built-in dưới đây:
  + express.static phục vụ những tài sản tĩnh như HTML files, images, css files. vv...
  + express.json phân tích các yêu cầu với json payloads.
  + express.urlencoded: phân tích các request với URL-encoded payloads

5. Middleware với Third-party.
 - Sử dụng middleware của bên thứ 3 để thêm các tính năng vào trong các ứng dụng Express.
 - Muốn sử dụng được bên thứ 3 thì phỉa cài đặt các dependency.

IV. Sử dụng template engines với Express.
 - Một template engine cho phép bạn sử dụng các file template tĩnh trong ứng dụng.  Tại runtime, template engine thay thế các biến trong một file template với giá trị thực, và chuyển template vào trong một file html đã gửi tới client. cách tiếp cận này giúp thiết kế trang HTML dễ dàng hơn.
 - Hầu hết template engines nó làm việc với Express là Pug, Mustache và EJS.
 - Để kết xuất các template file, thiết lap các thuộc tính trong app.js hoặc app.ts như sau:
  + views: thư mục nơi các template file được đặt.
  ví dụ: express().set('views', ['./views']); // ./views is directory
  + view engine: template engine để sử dụng.
  ví dụ: express().set('view engine', 'ejs'); // ejs là template engine
- để sử dụng template engine tương ứng thì ta phải cài gói phù hợp trong npm
   npm i ejs --save
- để kết xuất ra một template engine file thì ta sử dụng phương thức 'render của response
   response.render('<template engine file',[option data]); // [option data] có thể không cần khi không có dữ liệu truyền vào template engine file.
   ví dụ:
   app.get('/', function (req, res) {
      res.render('index', { title: 'Hey', message: 'Hello there!' })
   })

V. Error handling
1. Catching  Errors
 - Nó là quan trọng để đảm bảo rằng Express bắt tất cả lỗi mà xảy ra trong khi đang chạy route handlers và middleware functions.
 - Các lỗi mà xảy ra trong mã đồng bộ ở bên trong route handler và middleware không cần làm thêm. Nếu mã đồng bộ nén một error, thì Express sẽ bắt và xử lý lỗi đó.
 - Ví dụ:
   app.get('/', function (req, res) {
      throw new Error('BROKEN') // Express will catch this on its own.
   })
 - Nếu lỗi được trả về từ  các functions bất đồng bộ được gọi bởi route handler và middleware, bạn phải đẩy chúng tới next() function, Nơi Express sẽ bắt và xử lý lỗi đó.
 - Ví dụ:
   app.get('/', function (req, res, next) {
      fs.readFile('/file-does-not-exist', function (err, data) {
         if (err) {
            next(err) // Pass errors to Express.
         } else {
            res.send(data)
         }
      })
   })
 - Bạn phải bắt các lỗi mà xảy ra trong code  bất đồng bộ bởi route handler hoặc middleware functions và đẩy chúng tới Express để xử lý
 - ví dụ:
   app.get('/', function (req, res, next) {
      setTimeout(function () {
         try {
            throw new Error('BROKEN')
         } catch (err) {
            next(err)
         }
      }, 100)
   })
 - trong code bất đồng bộ bạn nên sử dụng promises để tránh khối try.. catch hoặc khi đang sử dụng các functions mà trả về promises.
 - Ví dụ:
   app.get('/', function (req, res, next) {
      Promise.resolve().then(function () {
         throw new Error('BROKEN')
      }).catch(next) // Errors will be passed to Express.
   })

2. The default error handler
 - Express đến với một built-in error handler mà quan tâm tới mọi lỗi mà phải được encountered trong ứng dụng, một middleware function xử lý lỗi mặc định đươc thêm vào cuối của ngăn xếp middleware function.
 - Nếu bạn đẩy một lỗi tới Next() function và bạn không xử lý nó trong một custom error handler, Nó sẽ được xử lý bởi built-in error handler; lỗi sẽ được viết tơi client với stack trace,. stach trace không được bao gồm trong môi trường phát triển.
 - Nếu bạn gọi next() với một lỗi sau đó bạn đã bắt đầu việc viết response, thì error handler mặc định của express ddosngd và fails request.
 - Vậy khi bạn thêm một custom error handler, bạn phải đại diện tới error handler mặc định của express, khi headers đã được gửi tới client.
 - Chú ý rằng error handler mặc định có thể được kích hoạt nếu bạn gọi next() với một lỗi trong code của bạn nhiều hơn một, ngoay cả khi custom handling middleware xảy ra.

3. Writing error handler
 - Định nghĩa các error-handling middleware functions với cách tương tự như các middleware function khác, ngoại trừ các error-handling middleware function có 4 đối số như sau: (err, req, res, next).
 - Ví dụ:
   app.use(function (err, req, res, next) {
   console.error(err.stack)
   res.status(500).send('Something broke!')
   })
 - Bạn định nghĩa error- handling middleware function cuối cùng, sau tất cả các express().use() khác chứa các middleware functions và các routes calls.
 - Ví dụ:
   var bodyParser = require('body-parser')
   var methodOverride = require('method-override')

   app.use(bodyParser.urlencoded({
   extended: true
   }))
   app.use(bodyParser.json())
   app.use(methodOverride())
   app.use(function (err, req, res, next) {
   // logic
   })

