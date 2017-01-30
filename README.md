thymol.js
=========

A JavaScript implementation of the [Thymeleaf](http://www.thymeleaf.org/) templating system.

For more details please visit the [Thymol Homepage](http://www.thymoljs.org/).

### Building Hints & Tips

Thymol is built using grunt and maven.

Component JavaScript files are assembled into distribution files by grunt, the process is supervised by maven.

Testing is conducted using Selenium. The default Selenium webdriver is the chrome webdriver. Other supported drivers are: Gecko and Internet Explorer.  

To build and run the regression tests:

```
mvn clean test
```

You will need to define the location of the Selenium web driver that you wish to use. You can do this by setting a location on the run-time path or use an environment variable to point to the relevant executable:

e.g.
```
export CHROME_DRIVER=/home/myplace/apps/chromedriver/chromedriver_linux64/chromedriver
```
or:
```
export PATH=/home/myplace/apps/chromedriver/chromedriver_linux64:$PATH
```  

To use a different web driver select a profile. 

To use firefox:

```
mvn -P firefox clean test
```

Or using IE:

```
mvn -P explorer clean test
```

To select the default web driver use "-P chrome".

To build and run the integration tests with Thymol Node Server:

```
mvn clean install
```

By default the build expects to find the Thymol Node Server at ../thymol-node-server. You can change this by altering the thThymolNodeServer property in the POM.

To validate regression test data against Thymeleaf:

```
mvn -P validate-tests,chrome clean install
```

You can re-run the JavaScript assembly by simply executing the Gruntfile.js:

```
grunt
```

If you want to re-initialise or to run the grunt build for the first time use:

```
mvn generate-resources
```
