package org.thymoljs.thymol.test.selenium.webdriver;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebClientOptions;

public class HtmlUnitFactory implements WebDriverFactory {

	@Override
	public WebDriver create() {

		//		client.getOptions().setThrowExceptionOnScriptError(false);
		//		client.getOptions().setThrowExceptionOnFailingStatusCode(false);		
		//		DesiredCapabilities capabilities = DesiredCapabilities.htmlUnitWithJs();				
		//		capabilities.setCapability("version", "firefox-45");
		//		capabilities.setCapability("javascriptEnabled", true);
		//		capabilities.setCapability("throwExceptionOnScriptError", false);
		//		capabilities.setCapability("throwExceptionOnFailingStatusCode", false);
		//		HtmlUnitDriver driver = new ThymolHtmlUnitDriver(capabilities);				
		HtmlUnitDriver driver = new ThymolHtmlUnitDriver( true );
		//		HtmlUnitDriver driver = new HtmlUnitDriver(BrowserVersion.FIREFOX_45, true);
		return driver;
	}

	@Override
	public WebDriver destroy( WebDriver driver ) {
		driver.quit();
		driver = null;
		return driver;
	}

	public static class ThymolHtmlUnitDriver extends HtmlUnitDriver {
		public ThymolHtmlUnitDriver( boolean useJavaScript ) {
			super( useJavaScript );
		}

		//		public ThymolHtmlUnitDriver(Capabilities capabilities) {
		//			super(capabilities);			
		//		}
		@Override
		protected WebClient modifyWebClient( WebClient client ) {
			WebClientOptions opts = client.getOptions();
			opts.setJavaScriptEnabled( true );
			opts.setThrowExceptionOnScriptError( false );
			opts.setThrowExceptionOnFailingStatusCode( false );
			return client;
		}
	}

}
