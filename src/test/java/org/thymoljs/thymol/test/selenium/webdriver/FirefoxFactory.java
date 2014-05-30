package org.thymoljs.thymol.test.selenium.webdriver;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class FirefoxFactory implements WebDriverFactory {

	@Override
	public WebDriver create() {
		WebDriver driver = new FirefoxDriver();
		driver.manage().timeouts().implicitlyWait( 2, TimeUnit.SECONDS );
		return driver;
	}

	@Override
	public WebDriver destroy( WebDriver driver ) {
		driver.quit();
		driver = null;
		return driver;
	}


}
