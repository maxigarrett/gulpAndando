const gulp=require('gulp');

const sass=require('gulp-sass');
const autoprefixer=require('gulp-autoprefixer');
const pug=require('gulp-pug');
const babel=require('gulp-babel');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');
const plumber=require('gulp-plumber');

const browsersync=require('browser-sync');

const server=browsersync.create();
// gulp.task('default',(done)=>
// {
//       console.log('HOLA MUNDO');
//       done();
// })


gulp.task('sass',()=>
{
    return gulp.src('./dev/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'))
    .pipe(server.stream())//no hace falta usar evento change en tarea default desde aca inyectamos nuevo css cada ves q modifica
})

gulp.task('pug',()=>
{
    return gulp.src('./dev/pug/*pug')
    .pipe(plumber())
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('./public/'))
})


gulp.task('babel',()=>
{
    return gulp.src('./dev/js/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('scripts-min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
})



gulp.task('default',()=>
{
    server.init({
        server:'./public'
    })
    gulp.watch('./dev/scss/*.scss',gulp.series('sass'));
    gulp.watch('./dev/pug/*pug',gulp.series('pug')).on('change',server.reload);
    gulp.watch('./dev/js/*.js',gulp.series('babel')).on('change',server.reload);
})