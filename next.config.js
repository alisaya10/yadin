module.exports = {
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
    },

    i18n: {
        locales: [ 'fa'],
        defaultLocale: 'fa'
    }


    // module.exports = {
    //   reactStrictMode: true,
    //   webpack: config => {
    //     config.module.rules.push(
    //       {
    //         test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    //         use: [
    //           {
    //             loader: 'file-loader',
    //             outputPath: 'static/webfonts/',
    //             publicPath: '../webfonts/',
    //             // optional, just to prettify file names
    //             name: '[name].[ext]',
    //           },
    //         ],
    //       },
    //       // ...
    //     );
    //     return config;
    //   },
    // ...
}