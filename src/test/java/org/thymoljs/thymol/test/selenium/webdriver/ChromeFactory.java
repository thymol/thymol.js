package org.thymoljs.thymol.test.selenium.webdriver;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

public class ChromeFactory implements WebDriverFactory {

	@Override
	public WebDriver create() {
		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files --disable-web-security			
		ChromeOptions options = new ChromeOptions();
		options.addArguments("allow-file-access-from-files");			
		options.addArguments("disable-web-security");			
		capabilities.setCapability(ChromeOptions.CAPABILITY, options);
		WebDriver driver = new ChromeDriver(capabilities);								
		driver.manage().timeouts().implicitlyWait( 4, TimeUnit.SECONDS );
		return driver;
	}

	@Override
	public WebDriver destroy( WebDriver driver ) {
		driver.quit();
		driver = null;
		return driver;
	}


}
