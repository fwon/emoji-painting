fis.match('css/**.less', {
    parser: fis.plugin('less'),
    rExt: '.css',
    optimizer: fis.plugin('clean-css')
});

//压缩js
fis.match('js/**.js', {
    optimizer: fis.plugin('uglify-js')
});