path = require "path"

stylesheetsDir = "src/css/stylesheets"
cloudDir = "cloud"
coffeeDir = "src/js"
markdownDir = "src/md"
handlebarsDir = "src/hbs"
mergeJSDest = "public/mergedAssets.js"


module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    copy:
      compile:
        files: [          
          {expand: true, flatten: true, cwd: handlebarsDir + "/", src: '*', dest: 'app/templates/', filter:  (filepath) -> path.basename(filepath).slice(0, 2) is "__"}, # i.e. __layout.hbs.`
          {expand: true, flatten: true, cwd: "bower_components/typeahead.js/dist/", src: "typeahead.bundle.min.js", dest: "app/lib"},
          {expand: true, flatten: true, cwd: "bower_components/bootstrap/dist/js/", src: "bootstrap.min.js", dest: "app/lib"},
          {expand: true, flatten: true, cwd: "bower_components/jquery.serializeJSON/", src: "jquery.serializeJSON.min.js", dest: "app/lib"},
          {expand: true, flatten: true, cwd: "bower_components/bootstrap-datepicker/js/", src: "bootstrap-datepicker.js", dest: "app/lib"},
        ]

    less:
      compile:
        options:
          paths: [stylesheetsDir]
          "include css": true

        files:
          "public/styles.css": stylesheetsDir + "/index.less"

    coffee:
      compile:
        files: [{
          expand: true
          cwd: coffeeDir
          src: ['**/*.coffee']
          dest: 'app'
          ext: '.js'
        },
          expand: true
          cwd: cloudDir
          src: ['**/*.coffee']
          dest: cloudDir
          ext: '.js'
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
          htmlExtension: 'hbs'
          # markdownOptions:
          #   # ensure we handle quotes properly, otherwise the
          #   # handlesbars file will not have correct arguments. 
          #   renderer: new marked.Renderer()
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

      scripts2:
        files: "app/*.js"
        tasks: ["browserify"]
        options:
          interrupt: true

      coffee:
        files: ["src/js/**/*.coffee"]
        tasks: ["coffee"]
        options:
          interrupt: true

      markdown:
        files: [markdownDir + "/**/*.md"]
        tasks: ["markdown"]
        options:
          interrupt: true

      handlebars:
        files: [handlebarsDir + "/**/*.hbs"]
        tasks: ["handlebars"]
        options:
          interrupt: true

      stylesheets:
        files: [
          stylesheetsDir + "/**/*.less"
          stylesheetsDir + "/**/*.css"
        ]
        tasks: ["less"]
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
          # "jquery.serializeJSON":
          #   path: "bower_components/jquery.serializeJSON/jquery.serializeJSON.min.js"
          #   exports: null

      compile:
        src: ["app/**/*.js"]
        dest: mergeJSDest

      tests:
        src: [
          "test/helper.js"
          "test/app/**/*.js"
        ]
        dest: "public/testBundle.js"

    watchify:
      # options:
      #   detectGlobals: true
      #   insertGlobals: false
      #   ignoreMissing: false
      #   debug: false
      #   standalone: false
      #   keepalive: false

      default:
        src: ["/app/**/*.js"]
        dest: mergeJSDest

  grunt.loadNpmTasks "grunt-browserify"
  grunt.loadNpmTasks "grunt-watchify"
  grunt.loadNpmTasks "grunt-markdown"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-handlebars"
  grunt.loadNpmTasks "grunt-contrib-less"
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

  grunt.registerTask "initial", [
    "copy"
    "markdown"
    "less"
  ]


  grunt.registerTask "compile", [
    "coffee"
    "handlebars"
    "browserify:compile"
  ]
  
  # Run the server and watch for file changes
  grunt.registerTask "server", [
    "compile"
    "runNode"
    "watch"
    # "watchify"
  ]
  
  # Default task(s).
  grunt.registerTask "default", ["compile"]
  return