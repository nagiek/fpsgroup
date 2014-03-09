path = require("path")
stylesheetsDir = "src/css/stylesheets"
coffeeDir = "src/js"
markdownDir = "src/md"
handlebarsDir = "src/hbs"

module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    stylus:
      compile:
        options:
          paths: [stylesheetsDir]
          "include css": true

        files:
          "public/styles.css": stylesheetsDir + "/index.styl"

    coffee:
      compile:
        files: [{
          expand: true
          cwd: coffeeDir
          src: ['**/*.coffee']
          dest: 'app'
          ext: '.js'
        }]

    copy:
      compile:
        files: [
          # i.e. __layout.hbs.`
          {expand: true, flatten: true, src: [handlebarsDir + '/*'], dest: 'app/templates/', filter:  (filepath) -> path.basename(filepath).slice(0, 2) is "__"},
        ]


    handlebars:
      compile:
        options:
          namespace: false
          commonjs: true
          processName: (filename) ->
            filename.replace(handlebarsDir + "/", "").replace ".hbs", ""

        src: handlebarsDir + "/**/*.hbs"
        dest: "app/templates/compiledTemplates.js"
        filter: (filepath) ->
          filename = path.basename(filepath)
          
          # Exclude files that begin with '__' from being sent to the client,
          # i.e. __layout.hbs.
          filename.slice(0, 2) isnt "__"

    markdown:
      compile:
        options:
          template: false
          markdownOptions: 
            gfm: true
            tables: true
            breaks: false
            pedantic: false
            sanitize: false
            smartLists: true
            smartypants: false
        files: [
          {
            expand: true,
            cwd: markdownDir
            src: ['**/*.md']
            dest: handlebarsDir
            ext: '.hbs'
          }
        ]

    watch:
      scripts:
        files: "app/**/*.js"
        tasks: ["browserify"]
        options:
          interrupt: true

      templates:
        files: ["src/hbs/**/*.hbs"], ["src/md/**/*.md"]
        tasks: ["markdown"], ["handlebars"]
        options:
          interrupt: true

      stylesheets:
        files: [
          stylesheetsDir + "/**/*.styl"
          stylesheetsDir + "/**/*.css"
        ]
        tasks: ["stylus"]
        options:
          interrupt: true

    browserify:
      options:
        debug: true
        alias: ["node_modules/rendr-handlebars/index.js:rendr-handlebars"]
        aliasMappings: [
          cwd: "app/"
          src: ["**/*.js"]
          dest: "app/"
        ]
        shim:
          jquery:
            path: "bower_components/jquery/dist/jquery.js"
            exports: "$"

      app:
        src: ["app/**/*.js"]
        dest: "public/mergedAssets.js"

      tests:
        src: [
          "test/helper.js"
          "test/app/**/*.js"
        ]
        dest: "public/testBundle.js"

  grunt.loadNpmTasks "grunt-browserify"
  grunt.loadNpmTasks "grunt-markdown"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-handlebars"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.registerTask "runNode", ->
    grunt.util.spawn
      cmd: "node"
      args: [
        "./node_modules/nodemon/nodemon.js"
        "index.js"
      ]
      opts:
        stdio: "inherit"
    , ->
      grunt.fail.fatal new Error("nodemon quit")
      return

    return

  grunt.registerTask "compile", [
    "copy"
    "coffee"
    "markdown"
    "handlebars"
    "browserify"
    "stylus"
  ]
  
  # Run the server and watch for file changes
  grunt.registerTask "server", [
    "compile"
    "runNode"
    "watch"
  ]
  
  # Default task(s).
  grunt.registerTask "default", ["compile"]
  return