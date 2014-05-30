package org.thymoljs.thymol.test.selenium;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.thymoljs.thymol.test.selenium.webdriver.ChromeFactory;
import org.thymoljs.thymol.test.selenium.webdriver.FirefoxFactory;
import org.thymoljs.thymol.test.selenium.webdriver.InternetExplorerFactory;
import org.thymoljs.thymol.test.selenium.webdriver.WebDriverFactory;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.UnhandledAlertException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumCases {

	protected static WebDriverFactory driverFactory = null;
	protected static WebDriver driver = null;

	protected static URIGetter getter;
	
	public static void setup(URIGetter g) {
		getter = g;		
		String webDriverProperty = System.getProperty( "webDriver" );
		System.out.println( " webDriver is: " + webDriverProperty);
		if( webDriverProperty == null || "firefox".equals( webDriverProperty ) ) {
			driverFactory = new FirefoxFactory();
		}
		else if( "chrome".equals( webDriverProperty ) ) {
			driverFactory = new ChromeFactory();
		}
		else if( "internetExplorer".equals( webDriverProperty ) ) {
			driverFactory = new InternetExplorerFactory();
		}			
	}

	public SeleniumCases() {		
		super();
	}
	
	
	public void localise(String path) {
		getter.localise(path);
	}

	public String getURI(String path) {
		return getter.getURI(path);
	}
	
		
	@BeforeClass
	public static void startUp() {
		driver = driverFactory.create();
	}

	@AfterClass
	public static void shutDown() {		
		driver = driverFactory.destroy( driver );
	}
	
	private static class AnnotatedWebElement extends RemoteWebElement {
		String errorMessage = null;
		AnnotatedWebElement(String errorMessage) {
			this.errorMessage = errorMessage;
		}
		public String getErrorMessage() {
			return errorMessage;
		}
	}
		
	public WebElement getResultBody( String relative ) {
		String location = ( new StringBuilder( getURI("") ) ).append( relative ).toString();
		try {
			driver.get( location );
		}
		catch(UnhandledAlertException uae) {
			uae.printStackTrace();
//			WebElement e = new AnnotatedWebElement(uae.getAlertText());
			try {
				Alert alert = driver.switchTo().alert();
				alert.dismiss();
			}
			catch(NoAlertPresentException nape) {
				System.out.println("NoAlertPresentException1!");
			}
			driver.get( location );
		}		
		WebElement body = ( new WebDriverWait( driver, 1 ) ).until( new ExpectedCondition< WebElement >() {
			@Override
			public WebElement apply( WebDriver d ) {
				WebElement e = null;
				try {
					e = d.findElement( By.tagName( "body" ) );
				}
				catch(UnhandledAlertException uae) {
					e = new AnnotatedWebElement(uae.getAlertText());
					try {
						Alert alert = driver.switchTo().alert();
						alert.dismiss();
					}
					catch(NoAlertPresentException nape) {
						System.out.println("NoAlertPresentException2!");
					}
				}
				return e;				
			}
		} );
		return body;
	}

	public String getResult( String relative, boolean textMode ) {
		String result = null;
		WebElement body = getResultBody( relative );
		if( body != null ) {
			if( body instanceof AnnotatedWebElement ) {
				result = ((AnnotatedWebElement)body).getErrorMessage();
			}
			else {
				if( textMode ) {
					result = body.getText();
				}
				else {
					result = body.getAttribute( "innerHTML" );
				}
			}
		}
		return result;
	}

	private static final String SORT_SELECTOR_START = "<span id=\"sort\">";
	private static final String SORT_SELECTOR_END = "</span>";
		
	
	private String replaceSortedFields(String result) {
		int sortSpan = result.indexOf( SORT_SELECTOR_START );
		if( sortSpan > -1 ) {
			String part = result.substring( sortSpan, result.indexOf( SORT_SELECTOR_END, sortSpan ) + SORT_SELECTOR_END.length() ); 
			String extract = result.substring( sortSpan  + SORT_SELECTOR_START.length(), result.indexOf( SORT_SELECTOR_END, sortSpan ) )  ;
			String[] parts = extract.split( "," );
			Arrays.sort( parts );
			StringBuilder sb = new StringBuilder();
			sb.append( SORT_SELECTOR_START );
			boolean started = false;
			for( String p: parts ) {
				if( started ) {
					sb.append( "," );
				}
				sb.append( p );
				started = true;
			}
			sb.append( SORT_SELECTOR_END );
			String xp = sb.toString();
			result = result.replace( part, xp );
		}
		return result;
	}

	
	 
	public String clean(String s1) {
		Pattern p = Pattern.compile(";jsessionid=[^\"^?]*");
		Matcher m = p.matcher(s1);
		s1 = m.replaceAll("");

		s1 = removeComments(s1);

		s1 = s1.replaceAll("\\n", "");
		s1 = s1.replaceAll("\\t", " ");
		s1 = s1.replaceAll("            ", " ");
		s1 = s1.replaceAll("           ", " ");
		s1 = s1.replaceAll("          ", " ");
		s1 = s1.replaceAll("         ", " ");
		s1 = s1.replaceAll("        ", " ");
		s1 = s1.replaceAll("       ", " ");
		s1 = s1.replaceAll("      ", " ");
		s1 = s1.replaceAll("     ", " ");
		s1 = s1.replaceAll("    ", " ");
		s1 = s1.replaceAll("   ", " ");
		s1 = s1.replaceAll("  ", " ");
		s1 = s1.replaceAll("> <", "><");
		s1 = s1.replaceAll(" </", "</");

		s1 = replaceSortedFields(s1);
		
		return s1;
	}

	private String removeComments(String x) {
		String y = x;
		int startComment = -1;
		do {
			startComment = y.indexOf("<!--");
			if( startComment >= 0 ) {				
				int endComment = y.indexOf("-->",startComment);
				if( endComment >= 0 ) {
					StringBuilder sb = new StringBuilder();
					sb = sb.append(y.substring(0, startComment));
					sb = sb.append(y.substring(endComment+3));
					y = sb.toString();
				}
			}
		} while(startComment>=0);
		return y;
	}
	
	public boolean expectThymeleafResult() {
		boolean result = false;
		if( getter.getClass().isAssignableFrom( FailSafeEnv.class ) ) {
			result = true;
		}
		return result;
	}
	

	public boolean expectThymolResult() {
		boolean result = false;
		if( getter.getClass().isAssignableFrom( SureFireEnv.class ) ) {
			result = true;
		}
		return result;
	}
	
}
