var thymolServerConfiguration = {
    dataThymolLoading: true,
    resetPerRequest: true,
    host: "localhost",                      // Server host defaults to 0.0.0.0
    port: 3000,                             // Server listening port defaults to 3000
    webappRoot: __dirname + "/../default",   // Path to templates root directory
    templatePath : "",
    debug : true,
    defaults: {
      prefix : "th",
      dataPrefix : "data",
      precision : 10,
      protocol : "file://",
      locale : "en",
      precedence : 20000,
      messagePath : "",
      resourcePath : "",
      messagesBaseName : "Messages",
      relativeRootPath: "",
      extendedMapping: false,
      localMessages: true,
      disableMessages: false,
      templateSuffix: ".html"
    }
  };
 
  module.exports = thymolServerConfiguration;