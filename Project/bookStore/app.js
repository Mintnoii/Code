var koa = require('koa');

var controller = require('koa-route');

var app = koa();
//引入模板
var views = require('co-views');

var render = views('./view', {
    map: { html: 'ejs' }
});

var koa_static = require('koa-static-server');

var service = require('./service/webAppService.js')

var qs = require('querystring')

//配置路由

//首页
app.use(controller.get("/", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("index");
}))

//书籍页
app.use(controller.get("/book", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("book", { nav: "书籍详情" });
}))

app.use(controller.get('/reader', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('read');
}));

//女生
app.use(controller.get("/female", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("female", { nav: "女生频道" });
}))
//男生
app.use(controller.get("/male", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("male", { nav: "男生频道" });
}))
//排行
app.use(controller.get("/rank", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("rank", { nav: "排行" });
}))
//分类
app.use(controller.get("/category", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("category", { nav: "分类" });
}))

//个人中心
app.use(controller.get("/usercenter", function*() {
    this.set("Cache-control", "no-cache");
    this.body = yield render('user-center', { nav: "" });
}))
app.use(controller.get("/search", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("search", { nav: "搜索" })
}))

app.use(controller.get("/route_test", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = "route_test";
}))



app.use(controller.get("/ejs_test", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = yield render("test", { title: "title_test" });
}))


app.use(controller.get("/api_test", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = service.get_test_data();
}))

//首页接口
app.use(controller.get("/ajax/index", function*() {
    this.set("Cache-Control", "no-cache")
    this.body = service.get_index_data();
}))

//书籍页面
app.use(controller.get('/ajax/book', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = qs.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_book_data(id);
}));
//章节信息
app.use(controller.get('/ajax/chapter', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

//章节详情
app.use(controller.get("/ajax/chapter_data", function*() {
    this.set('Cache-Control', 'no-cache');
    var params = qs.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_chapter_content_data(id);
}))
//读书

app.use(controller.get('/ajax/category', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

//评分
app.use(controller.get('/ajax/rank', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));

//男生
app.use(controller.get('/ajax/male', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}));
//女生
app.use(controller.get('/ajax/female', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}));
//分类
app.use(controller.get('/ajax/category', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));



//搜索
app.use(controller.get("/ajax/search", function*() {
    this.set("Cache-Control", "no-cache")
    var _this = this;
    var params = qs.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}))

//配置静态文件的中间键
app.use(koa_static({
    rootDir: './static/', //实际静态文件地址
    rootPath: '/static/', //访问的地址
    maxage: 0
}))
app.use(koa_static({
    rootDir: './mock/', //实际静态文件地址
    rootPath: '/mock/', //访问的地址
    maxage: 0
}))

app.listen(3001);
console.log('The project runs at 3001...');