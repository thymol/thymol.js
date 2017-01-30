package org.thymoljs.thymol.test.selenium.webdriver;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

public class PhantomJSFactory implements WebDriverFactory {

	@Override
	public WebDriver create() {
		DesiredCapabilities capabilities = DesiredCapabilities.phantomjs();
		capabilities.setCapability( "takesScreenshot", false );
		PhantomJSDriver driver = new PhantomJSDriver( capabilities );
		return driver;
	}

	@Override
	public WebDriver destroy( WebDriver driver ) {
		driver.quit();
		driver = null;
		return driver;
	}

}
