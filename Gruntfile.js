module.exports = function(grunt) {

  grunt.initConfig({
    pkg:grunt.file.readJSON('package.JSON'),

    nodemon: {
      dev: {}
    },
    watch: {
      js: {
        files: ['app.js', 'routes/', 'config/']
      },
      html: {
        files: ['public/']
      }
    },
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concurrent:target']);
};