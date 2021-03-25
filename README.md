# ready-gulp
ReadyGulp is tuned gulp for easy start of HTML/CSS(Sass)/JS development

<h2>Dependencies:</h2>
<ul>
<li>
autoprefixer;
</li>
<li>
gulp-clean;
</li>
<li>
gulp-clean-css;
</li>
<li>
gulp-postcss;
</li>
<li>
gulp-plumber;
</li>
<li>
gulp-sass;
</li>
<li>
gulp-sourcemaps;
</li>
<li>
gulp-imagemin;
</li>
<li>
gulp-webp;
</li>
<li>
gulp-uglify.
</li>
</ul>

<h2>Guide:</h2>
<p>
<b><i>npm: start</i></b> command launches process that takes .scss file from /src directory then compile it to .css, adds prefixes for cross-browsing, minifies it, makes postfix ".min" and puts it to /dist directory.
After that it minifies all .js files in /src directory and puts them to /dist.
Next task is just transfers .html files from /src to /dist directory.
And last two tasks are launch browser sync and watching for files in /src folder.
</p>
<p>
<b><i>npm: images</i></b> command minifies svg, jpg, png images, adds postfix ".min" then convert jpg and png to webp. After that files with ".min" postfix tranfer to /dist folder and clean up from /src directory.
</p>
