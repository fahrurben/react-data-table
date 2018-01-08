var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: {
    DataTable: APP_DIR + '/DataTable.jsx',
    FilterForm: APP_DIR + '/FilterForm.jsx',
    TextInputFilter: APP_DIR + '/TextInputFilter.jsx',
    CheckboxInputFilter: APP_DIR + '/CheckboxInputFilter.jsx',
    DropdownInputFilter: APP_DIR + '/DropdownInputFilter.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    libraryTarget:'umd'
  },
  module : {
    loaders: [
      {
        test: /\.jsx$/,
        include: APP_DIR,
        loader: 'babel-loader',
         options: {
           presets: ["react","es2015"]
         }
      }
    ],
  }
};

module.exports = config;