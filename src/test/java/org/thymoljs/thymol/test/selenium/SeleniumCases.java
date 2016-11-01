package org.thymoljs.thymol.test.selenium;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.webdriver.ChromeFactory;
import org.thymoljs.thymol.test.selenium.webdriver.FirefoxFactory;
import org.thymoljs.thymol.test.selenium.webdriver.InternetExplorerFactory;
import org.thymoljs.thymol.test.selenium.webdriver.WebDriverFactory;

public class SeleniumCases implements URIGetter {

	protected static WebDriverFactory driverFactory = null;
	protected static WebDriver driver = null;

	protected static URIGetter getter;
	
	private static final String ERROR_MARKER = "Problem accessing /";

	public void localise( String path ) {
		throw new RuntimeException();
	}

	public static void setup( URIGetter g ) {
		getter = g;
		String webDriverProperty = System.getProperty( "webDriver" );
		System.out.println( " webDriver is: " + webDriverProperty );
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

	public void localise( Context context ) {
		getter.localise( context );
	}

	public String getURI( String relative ) {
		return getter.getURI( relative );
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

		AnnotatedWebElement( String errorMessage ) {
			this.errorMessage = errorMessage;
		}

		public String getErrorMessage() {
			return errorMessage;
		}
	}

	private class PageResponse implements ExpectedCondition< WebElement > {
		ResultMode mode = null;

		PageResponse( ResultMode modeValue ) {
			super();
			mode = modeValue;
		}

		@Override
		public WebElement apply( WebDriver d ) {
			WebElement e = null;
			Alert a = null;
			WebDriver.TargetLocator locator = d.switchTo();

			try {
				switch( mode ) {
					case FULL_HTML: {
						List< WebElement > el = d.findElements( By.tagName( "html" ) );
						if( !el.isEmpty() ) {
							e = el.get( 0 );
						}
						break;
					}
					case HTML:
					case TEXT: {
						e = locator.activeElement();
						break;
					}
					case ALERT: {
						a = locator.alert();
						if( a != null ) {
							e = handleAlert( a );
						}
						break;
					}
				}
			}
			catch( UnhandledAlertException uae ) {
				String alertText = uae.getAlertText();
				if( alertText == null ) {
					alertText = "cannot read alert text!";
				}
				e = new AnnotatedWebElement( alertText );
				try {
					a = locator.alert();
					if( a != null ) {
						e = handleAlert( a );
					}
				}
				catch( NoAlertPresentException nape ) {
					System.out.println( "NoAlertPresentException2!" );
				}
			}
			catch( NoAlertPresentException nape ) {
				e = d.findElement( By.tagName( "body" ) );
			}
			return e;
		}
	}

	// TODO need to add a control parameter that says we are expecting an alert or a normal page
	// We can no longer do the "one size fits all" solution because the firefox driver is broken.
	// There is a work-around but it's very slow because it means waiting for a 500 server error when there is no alert to dismiss.
	// This takes 2 seconds and there doesn't seem to be any way of changing it.
	// It's a real shame that it's firefox (v30 and up) that screwed up the simple solution

	public WebElement getResultBody( String relative, ResultMode mode ) {
		String location = getURI( relative );
		//( new StringBuilder( getURI("") ) ).append( relative ).toString();
		try {
			driver.get( location );
		}
		catch( UnhandledAlertException uae ) {
			uae.printStackTrace();
			try {
				Alert alert = driver.switchTo().alert();
				alert.dismiss();
			}
			catch( NoAlertPresentException nape ) {
				System.out.println( "NoAlertPresentException1!" );
			}
			driver.get( location );
		}
		WebElement body = null;
		try {
			body = ( new WebDriverWait( driver, 0 ) ).until( new PageResponse( mode ) );
		}
		catch( Exception ex ) {
			ex.printStackTrace();
			throw ( ex );
		}
		return body;
	}

	private WebElement handleAlert( Alert a ) throws NoAlertPresentException {
		WebElement e = null;
		String alertText = a.getText();
		if( alertText == null ) {
			alertText = "cannot read alert text!";
		}
		e = new AnnotatedWebElement( alertText );
		a.dismiss();
		return e;
	}

	public String getResult( String relative, ResultMode mode ) {
		String result = null;
		WebElement body = getResultBody( relative, mode );
		if( body != null ) {
			// Hack stupid Google bug
			if( body instanceof RemoteWebElement ) {
				RemoteWebElement rwe = ( RemoteWebElement )body;
				String bodyId = rwe.getId();
				if( bodyId == null ) {
					rwe.setId( "" );
				}
			}
			switch( mode ) {
				case FULL_HTML:
				case HTML: {
					result = body.getAttribute( "innerHTML" );
					break;
				}
				case TEXT: {
					result = body.getText();
					break;
				}
				case ALERT: {
					if( body instanceof AnnotatedWebElement ) {
						result = ( ( AnnotatedWebElement )body ).getErrorMessage();
					}
					else if( body instanceof RemoteWebElement ) {
						result = body.getAttribute( "innerHTML" );
					}
					else {
						result = "**Result Processing Error incorrect type**";
					}
					break;
				}
			}
			result = new String( result.getBytes( Charset.forName( "utf-8" ) ) );
		}
		else {
			result = "**Result Processing Error no result**";
		}
		int errorIntro = result.indexOf( ERROR_MARKER );
		if( errorIntro > 0 ) {
			errorIntro = errorIntro + ERROR_MARKER.length();
			int extraInfoEnd = result.indexOf( '/', errorIntro );
			String extraInfo = result.substring( errorIntro, extraInfoEnd + 1 );
			result = result.replace( extraInfo, "" );
		}
		return result;
	}

	private static final String SORT_SELECTOR_START = "<span id=\"sort\">";
	private static final String SORT_SELECTOR_END = "</span>";

	private String replaceSortedFields( String result ) {
		int sortSpan = result.indexOf( SORT_SELECTOR_START );
		if( sortSpan > -1 ) {
			String part = result.substring( sortSpan, result.indexOf( SORT_SELECTOR_END, sortSpan ) + SORT_SELECTOR_END.length() );
			String extract = result.substring( sortSpan + SORT_SELECTOR_START.length(), result.indexOf( SORT_SELECTOR_END, sortSpan ) );
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

	public String clean( String s1 ) {
		Pattern p = Pattern.compile( ";jsessionid=[^\"^?]*" );
		Matcher m = p.matcher( s1 );
		s1 = m.replaceAll( "" );

		s1 = removeComments( s1 );

		s1 = s1.replaceAll( "\\n", "" );
		s1 = s1.replaceAll( "\\t", " " );
		s1 = s1.replaceAll( "            ", " " );
		s1 = s1.replaceAll( "           ", " " );
		s1 = s1.replaceAll( "          ", " " );
		s1 = s1.replaceAll( "         ", " " );
		s1 = s1.replaceAll( "        ", " " );
		s1 = s1.replaceAll( "       ", " " );
		s1 = s1.replaceAll( "      ", " " );
		s1 = s1.replaceAll( "     ", " " );
		s1 = s1.replaceAll( "    ", " " );
		s1 = s1.replaceAll( "   ", " " );
		s1 = s1.replaceAll( "  ", " " );
		s1 = s1.replaceAll( " <", "<" );

		s1 = replaceSortedFields( s1 );

		return s1;
	}

	private String removeComments( String x ) {
		String y = x;
		int startComment = -1;
		do {
			startComment = y.indexOf( "<!--" );
			if( startComment >= 0 ) {
				int endComment = y.indexOf( "-->", startComment );
				if( endComment >= 0 ) {
					StringBuilder sb = new StringBuilder();
					sb = sb.append( y.substring( 0, startComment ) );
					sb = sb.append( y.substring( endComment + 3 ) );
					y = sb.toString();
				}
			}
		}
		while( startComment >= 0 );
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

	public boolean expectNodeResult() {
		boolean result = false;
		if( getter.getClass().isAssignableFrom( FailSafeEnvNode.class ) ) {
			result = true;
		}
		return result;
	}

}