 //pc端打包工具	自动化流程构建工具   对页面应用   作用：拷贝（src().pipe(dest())）、监听（watch）（执行事件）
 //
 var gulp = require('gulp');
 
 //css 的预处理器（css preprocessor）
 
   var sass = require('gulp-sass'); 
 
 //sourcemaps.init()，并sourcemaps.write()需要有支持gulp-sourcemaps
 //要编写外部源映射文件，请将相对于目标的路径传递给sourcemaps.write()。
 //让页面文件与.scss文件产生关联，可以在页面直接修改scss文件的内容。
 var sourcemaps = require('gulp-sourcemaps');
 
 
var uglify = require('gulp-uglify');   //压缩js文件


 
 //使用Gulp实现网页自动刷新：gulp-connect
 var connect= require('gulp-connect'); 
 
 var concat=require('gulp-concat');
 
var rename = require('gulp-rename');

var cleanCss = require('gulp-clean-css');  //压缩css

var imagemin = require('gulp-imagemin'); 	//压缩图片

var babel=require('gulp-babel');
/* gulp.task('concat',function(){
 	gulp.src(['js/es5.js','js/es6.js'])
 	.pipe(concat('vendor.js'))
 	.pipe(gulp.dest('dist/js'))
 })*/
 gulp.task('hello',function(){ //第一个参数是任务名称，第二个参数是任务功能
 	console.log("hello world");
 	
}) 
gulp.task('default1',function(){
	console.log("default");
})
gulp.task('testGulp', async() => {
   await console.log('Hello World!');
})


/*The following tasks did not complete: testGulp 
Did you forget to signal async completion?*/

//gulp.task('default',['hello','default1','testGulp']);  //执行时输入gulp
gulp.task('build',['testGulp','default1'],function(){
	console.log("default");
})
/*gulp.task('watch',function(){
	gulp.watch("index.html",['copy-index']);
})*/

/*gulp.task('copy-index',function(){
	gulp.src('index.html').pipe(gulp.dest("disk"))  //复制到disk目录下
})*/



gulp.task('sass',function(){
	 gulp.src('css/index.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
})   //当scss文件转成css文件之后，放到dist/css之下。	

gulp.task('sourcemap',function(){
	return gulp.src("css/**")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/csss/compressed'))
})

//下面代码实现动态刷新。
gulp.task('sever',function(){     //建立任务	
	connect.server(
		{
			root:'dist',		//根目录指向dist文件夹。
			livereload:true   
		});   //根目录指向dist文件夹。
})  

gulp.task('copy-index',function(){ 
	 gulp.src('./dist/index.html')
	 .pipe(gulp.dest('./dist/css'))
	 .pipe(connect.reload());
 })
//热部署时，监控页面：  \es6-item\dist\index.html，规定根目录是index.html
gulp.task('watch',function(){ 
	//注意：需要监听的文件注意路径的问题。这里的路径应该相对gulpfile.js文件， ./表示相对当前文件
	gulp.watch('./dist/index.html',['copy-index']);    //需要监听的文件，文件更改时执行的事件
	gulp.watch(['./dist/index.html','dist/imgs/**/*','dist/js/**/*'],['copy-index','copy-imgs','copy-js']);
})

gulp.task('default',['sever','watch']); //1.sever 2.watch

gulp.task('copy-imgs',function(){
	gulp.src("./dist/imgs/**/*")
	.pipe(gulp.dest('./dist/images'));
})

gulp.task('copy-js',function(){
	gulp.src("./dist/js/*")
	.pipe(gulp.dest("dist/copy-js"));
})



gulp.task('scripts',function(){
	gulp.src(['./js/document_missing.js','js/document_passed.js'])
	.pipe(concat('./js/vendor.js'))
	.pipe(gulp.dest('./dist/js'));
})

gulp.task('scripts-ys',function(){ 
	return gulp.src(['js/document_missing.js','js/document_passed.js']) 
	.pipe(concat('vendor-ys-1.js')) 
	.pipe(uglify())
	.pipe(gulp.dest('dist/js')); 
}) 



gulp.task("rename",function(){
	return gulp.src(['js/document_missing.js','js/document_passed.js']) 
	.pipe(concat('vendor-rename-1.js')) 
	.pipe(gulp.dest('dist/js')) 	//输出文件
	.pipe(uglify())
	.pipe(rename('vendor.min.js'))   //压缩文件
	.pipe(gulp.dest('dist/js'))
})



gulp.task('cleanCss',function(){
	return gulp.src(['css/index1.css','css/index.scss'])
	.pipe(sass())		//css 的预处理器   scss转化为css
	.pipe(cleanCss())	//css压缩
	.pipe(gulp.dest('dist/css'))
})



gulp.task('imagesMin',function(){
	return gulp.src('img/**/*')
	.pipe(imagemin())    //压缩图片
	.pipe(gulp.dest('dist/images'));
})


 
 gulp.task('babel',function(){
 	return gulp.src('js/es6.js')
 	.pipe(babel({"presets":["es2015"]}))
 	.pipe(gulp.dest("dist/js"))
 })
