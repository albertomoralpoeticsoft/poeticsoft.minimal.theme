const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const themename = 'poeticsoft-minimal-theme'
const destdir = path.join(__dirname, themename)
const themeplublic = '/wp-content/themes/' + themename

module.exports = env => {  
                                                    
  const input = Object.keys(env)[2] || ''

  const params = input.split('-')
  const type = params[0] || 'apps' // apps | theme

  let unit, mode
  let paths = {
    public: themeplublic,
    cssfilename: '[name].css'
  }
  let entry = {}
  let externals = {}  

  const wpexternals = {
    '@wordpress/element': 'wp.element',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/blocks': 'wp.blocks'
  }

  switch(type) {

    case 'apps':
    case 'editor':

      unit = params[1] || 'clouds' // clouds | rain | fire | 
      mode = params[2] || 'dev' // dev | prod
      
      paths.output = destdir  + '/' + type + '/' + unit
      
      entry = {
        main: './src/' + type + '/' + unit + '/main.js'
      }

      break

    case 'block':

      unit = params[1] || 'gallery' // gallery 
      mode = params[2] || 'dev' // dev | prod
      
      paths.output = destdir  + '/' + type + '/' + unit + '/build'

      entry = {
        editor: './src/' + type + '/' + unit + '/editor.js',
        view: './src/' + type + '/' + unit + '/view.js'
      }

      externals = wpexternals

      break

    case 'svgscript':

      unit = params[1] || 'test' // test 
      mode = params[2] || 'dev' // dev | prod
      
      paths.output = destdir  + '/' + type + '/' + unit 

      entry = {
        main: './src/' + type + '/' + unit + '/main.js'
      }

      break

    default:

      mode = params[1] || 'dev' // dev | prod

      paths.output = destdir  + '/' + type
      
      entry = {
        main: './src/' + type + '/main.js'
      }

      break
  }  

  return {
    context: __dirname,
    stats: 'minimal',
    watch: true,
    name: 'minimal',
    entry: entry,
    output: {
      path: paths.output,
      publicPath: paths.public
    },
    mode: mode == 'prod' ? 'production' : 'development',
    devtool: mode == 'prod' ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [          
            { 
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ]
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            { 
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            { 
              loader: MiniCssExtractPlugin.loader
            },
            'style-loader',
            'css-loader'
          ]
        },
        // Assets
        {
          test: /\.(jpg|jpeg|png|gif|svg|woff|ttf|eot|mp3|woff|woff2|webm|mp4)$/,
          type: 'asset/resource',
          generator: {
            emit: false,
            filename: content => { 

              return content.filename.replace(themename, '')
            }
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: paths.cssfilename
      })
    ],
    resolve: {
      extensions: ['.js'],
      alias: {
        themescss: path.join(__dirname, 'src/theme/scss'),
        commonjs: path.join(__dirname, 'src/commonjs'),
        commonscss: path.join(__dirname, 'src/commonscss'),
        assets: path.resolve(destdir + '/assets'),       
        block: path.join(__dirname, themename, 'block'),       
        styles: path.join(__dirname, 'src', 'styles')
      }
    }
  }
}