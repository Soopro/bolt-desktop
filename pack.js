'use strict';

const AppName = 'Soopro Desktop Client'

const fs = require('fs');
const packager = require('electron-packager');
const dmg = require('appdmg');

fs.stat('dist/Soopro-Desktop-Installer.dmg', function(error, stats){
  if (stats && stats.isFile()){
    fs.unlink('dist/Soopro-Desktop-Installer.dmg', function(error){
      console.log(error);
    });
  }
});

packager({
  'dir': '.',
  'name': AppName,
  'platform': 'darwin',
  'arch': 'x64',
  'version': '0.36.0',

  'app-version': '0.1.0',
  'build-version': '0.1.0',
  'ignore': '(dist|node_modules/.*)',
  'out': './dist/',
  'overwrite': true,
  'icon': __dirname+'/assets/app_icon.icns'
}, function (error, app_path){
  console.log(error);
  console.log(app_path);
  build_dmg();
})


let build_dmg = function () {
  console.log("Build DMG......")
  dmg({
    'target': 'dist/Soopro-Desktop-Installer.dmg',
    'basepath': __dirname,
    'specification': {
      'title': AppName,
      'icon': 'assets/installer_icon.icns',
      'background': 'assets/installer_background.png',
      'icon-size': 128,
      'contents': [
        { 
          'x': 420, 'y': 180, 'type': 'link', 
          'path': '/Applications' 
        },
        { 
          'x': 180, 'y': 180, 'type': 'file',
          'path': 'dist/'+AppName+'-darwin-x64/'+AppName+'.app'
        },
      ]
    }
  });
}

