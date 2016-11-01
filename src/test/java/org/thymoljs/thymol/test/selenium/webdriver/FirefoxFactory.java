package org.thymoljs.thymol.test.selenium.webdriver;

import java.util.Locale;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;

public class FirefoxFactory implements WebDriverFactory {

	@Override
	public WebDriver create() {
//		DesiredCapabilities caps = DesiredCapabilities.firefox();
//		caps.setCapability("unexpectedAlertBehaviour", "ignore");
//		WebDriver driver = new FirefoxDriver(caps);	
		
//		In Firefox I can do
		FirefoxProfile profile = new FirefoxProfile();
		
		Locale loc = Locale.getDefault();				
		profile.setPreference("intl.accept_languages", loc.toString() );
//		profile.setPreference("log.level", "ERROR" );
		
		FirefoxDriver driver = new FirefoxDriver(profile);
//		Capabilities caps = driver.getCapabilities();
		
//		Map<String,?> capsMap = caps.asMap();
		
//		driver.manage().timeouts().implicitlyWait( 2, TimeUnit.SECONDS );
		
		return driver;
	}

	@Override
	public WebDriver destroy( WebDriver driver ) {
		driver.quit();
		driver = null;
		return driver;
	}

}
