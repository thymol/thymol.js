package org.thymoljs.thymol.test.selenium.webdriver;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

public class InternetExplorerFactory implements WebDriverFactory {

	@Override
	public WebDriver create() {
		DesiredCapabilities ieCapabilities = DesiredCapabilities.internetExplorer();

		//      ie.forceCreateProcessApi with true value and ie.browserCommandLineSwitches with -private value
		//      As in: https://code.google.com/p/selenium/wiki/InternetExplorerDriver        

		ieCapabilities.setCapability( InternetExplorerDriver.FORCE_CREATE_PROCESS, true );
		ieCapabilities.setCapability( InternetExplorerDriver.IE_ENSURE_CLEAN_SESSION, true );
		ieCapabilities.setCapability( InternetExplorerDriver.IE_SWITCHES, "-private" );
		WebDriver driver = new InternetExplorerDriver( ieCapabilities );

		driver.manage().timeouts().implicitlyWait( 4, TimeUnit.SECONDS );
		return driver;
	}

	@Override
	public WebDriver destroy( WebDriver driver ) {
		if( driver != null ) {
			driver.close();
			driver.quit();
			driver = null;
		}
		return driver;
	}

}
