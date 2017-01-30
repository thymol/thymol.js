package org.thymoljs.thymol.test.selenium.webdriver;

import org.openqa.selenium.WebDriver;

public interface WebDriverFactory {

	public WebDriver create();

	public WebDriver destroy( WebDriver driver );

}
