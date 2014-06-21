package org.thymoljs.thymol.test.selenium.webdriver;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
//import org.openqa.selenium.remote.DesiredCapabilities;

public class FirefoxFactory implements WebDriverFactory {

	@Override
	public WebDriver create() {
//		DesiredCapabilities caps = DesiredCapabilities.firefox();
//		caps.setCapability("unexpectedAlertBehaviour", "ignore");
//		WebDriver driver = new FirefoxDriver(caps);		
		WebDriver driver = new FirefoxDriver();
		driver.manage().timeouts().implicitlyWait( 2, TimeUnit.SECONDS );
//		driver.manage().timeouts().implicitlyWait( 200, TimeUnit.MILLISECONDS );
		return driver;
	}

	@Override
	public WebDriver destroy( WebDriver driver ) {
		driver.quit();
		driver = null;
		return driver;
	}


}
