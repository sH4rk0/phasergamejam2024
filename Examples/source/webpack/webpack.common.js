const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const examples = [
  "example1-lvl0-hello-world",
  "example2-lvl0-hello-image",
  "example3-lvl0-hello-sprite",
  "example4-lvl0-hello-tilesprite",
  "example5-lvl0-hello-group",
  "example6-lvl0-hello-container",
  "example7-lvl1-hello-tween-1-simple",
  "example7-lvl1-hello-tween-2-advanced",
  "example8-lvl1-hello-sound",
  "example9-lvl1-hello-time",
  "example9-lvl1-hello-timeline",
  "example10-lvl2-hello-scene-communication-1",
  "example11-lvl2-hello-scene-communication-2",
  "example12-lvl2-hello-scene-communication-3",
  "example13-lvl3-hello-camera",
  "example14-lvl3-hello-camera-follow",
  "example15-lvl3-hello-camera-pan",
  "example16-lvl3-hello-camera-zoom",
  "example17-lvl3-hello-camera-flash",
  "example18-lvl3-hello-camera-shake",
  "example19-lvl3-hello-camera-fade",
  "example20-lvl4-hello-physics-hello-body",
  "example21-lvl4-hello-physics-body-size-circle",
  "example22-lvl4-hello-physics-body-acceleration",
  "example23-lvl4-hello-physics-body-velocity",
  "example24-lvl4-hello-physics-body-collideworldbounds-bounce",
  "example25-lvl4-hello-physics-accelerateTo",
  "example26-lvl4-hello-physics-moveTo",
  "example27-lvl4-hello-physics-closest-furthest", 
  "example28-lvl4-hello-physics-angular-velocity",
  "example29-lvl4-hello-physics-collide-1",
  "example29-lvl4-hello-physics-collide-2",
  "example30-lvl4-hello-physics-overlap",
  "example31-lvl5-hello-custom-player",
  "example32-lvl5-hello-custom-bonus",
  "example33-lvl5-hello-custom-enemy",
  "example34-lvl5-hello-custom-weapon",
  "example35-lvl6-hello-map-4-direzioni",
  "example36-lvl6-hello-map-platform"
];

module.exports = {
  performance: { hints: false },
   entry: {
     index: "./src/scenes/indexes/index.ts",
     style: "./src/scss/style.ts",
     "example1-lvl0-hello-world": "./src/scenes/indexes/"+ examples[0]+".ts",
     "example2-lvl0-hello-image": "./src/scenes/indexes/" + examples[1] + ".ts",
     "example3-lvl0-hello-sprite": "./src/scenes/indexes/" + examples[2] + ".ts",
     "example4-lvl0-hello-tilesprite": "./src/scenes/indexes/" + examples[3] + ".ts",
     "example5-lvl0-hello-group": "./src/scenes/indexes/" + examples[4] + ".ts",
     "example6-lvl0-hello-container": "./src/scenes/indexes/" + examples[5] + ".ts",
     "example7-lvl1-hello-tween-1-simple": "./src/scenes/indexes/" + examples[6] + ".ts",
     "example7-lvl1-hello-tween-2-advanced": "./src/scenes/indexes/" + examples[7] + ".ts",
     "example8-lvl1-hello-sound": "./src/scenes/indexes/" + examples[8] + ".ts",
     "example9-lvl1-hello-time": "./src/scenes/indexes/" + examples[9] + ".ts",
     "example9-lvl1-hello-timeline": "./src/scenes/indexes/" + examples[10] + ".ts",
     "example10-lvl2-hello-scene-communication-1": "./src/scenes/indexes/" + examples[11] + ".ts",
     "example11-lvl2-hello-scene-communication-2": "./src/scenes/indexes/" + examples[12] + ".ts",
     "example12-lvl2-hello-scene-communication-3": "./src/scenes/indexes/" + examples[13] + ".ts",
     "example13-lvl3-hello-camera": "./src/scenes/indexes/" + examples[14] + ".ts",
     "example14-lvl3-hello-camera-follow": "./src/scenes/indexes/" + examples[15] + ".ts",
     "example15-lvl3-hello-camera-pan": "./src/scenes/indexes/" + examples[16] + ".ts",
     "example16-lvl3-hello-camera-zoom": "./src/scenes/indexes/" + examples[17] + ".ts",
     "example17-lvl3-hello-camera-flash": "./src/scenes/indexes/" + examples[18] + ".ts",
     "example18-lvl3-hello-camera-shake": "./src/scenes/indexes/" + examples[19] + ".ts",
     "example19-lvl3-hello-camera-fade": "./src/scenes/indexes/" + examples[20] + ".ts",
     "example20-lvl4-hello-physics-hello-body": "./src/scenes/indexes/" + examples[21] + ".ts",
     "example21-lvl4-hello-physics-body-size-circle": "./src/scenes/indexes/" + examples[22] + ".ts",
     "example22-lvl4-hello-physics-body-acceleration": "./src/scenes/indexes/" + examples[23] + ".ts",
     "example23-lvl4-hello-physics-body-velocity": "./src/scenes/indexes/" + examples[24] + ".ts",
     "example24-lvl4-hello-physics-body-collideworldbounds-bounce": "./src/scenes/indexes/" + examples[25] + ".ts",
     "example25-lvl4-hello-physics-accelerateTo": "./src/scenes/indexes/" + examples[26] + ".ts",
     "example26-lvl4-hello-physics-moveTo": "./src/scenes/indexes/" + examples[27] + ".ts",
     "example27-lvl4-hello-physics-closest-furthest": "./src/scenes/indexes/" + examples[28] + ".ts",
     "example28-lvl4-hello-physics-angular-velocity": "./src/scenes/indexes/" + examples[29] + ".ts",
     "example29-lvl4-hello-physics-collide-1": "./src/scenes/indexes/" + examples[30] + ".ts",
     "example29-lvl4-hello-physics-collide-2": "./src/scenes/indexes/" + examples[31] + ".ts",
     "example30-lvl4-hello-physics-overlap": "./src/scenes/indexes/" + examples[32] + ".ts",
     "example31-lvl5-hello-custom-player": "./src/scenes/indexes/" + examples[33] + ".ts",
     "example32-lvl5-hello-custom-bonus": "./src/scenes/indexes/" + examples[34] + ".ts",
     "example33-lvl5-hello-custom-enemy": "./src/scenes/indexes/" + examples[35] + ".ts",
     "example34-lvl5-hello-custom-weapon": "./src/scenes/indexes/" + examples[36] + ".ts",
     "example35-lvl6-hello-map-4-direzioni": "./src/scenes/indexes/" + examples[37] + ".ts",
     "example36-lvl6-hello-map-platform": "./src/scenes/indexes/" + examples[38] + ".ts"
    },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
 
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  
  module: {
    rules: [
      
      {
        test: /\.tsx?$|\.jsx?$/,
        include: path.join(__dirname, '../src'),
        loader: 'ts-loader'
      },
      
      {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                           
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "expanded",
                            },
                        },
                    },
                ],
            },
    
    
    ]

    
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [

     new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css",
     }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
    }),
    
    new webpack.ProgressPlugin(),
     
  new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'src/index.html',
      chunks: ['vendors', 'index','style'],
  }),

  ...examples.map((event) => {
      return new HtmlWebpackPlugin({
        template: `src/example.html`,
        filename: `${event}.html`,
        chunks: ['vendors', `${event}`,'style']
      })
    }),
  
  
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/pwa', to: '' },
        { from: 'src/favicon.ico', to: '' }
      ]
    }),

   

    
    

  ]
}