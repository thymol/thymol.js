package org.thymoljs.thymol.test.webapp;

import java.io.IOException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.VariablesMap;
import org.thymeleaf.context.WebContext;
import org.thymeleaf.expression.Calendars;
import org.thymeleaf.expression.Dates;
import org.thymeleaf.standard.expression.TextLiteralExpression;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.TemplateResolver;

public class ThymolTestFilter implements Filter {

	public static final String UPDATE_PREFIX_URI = "ThymolTestFilter-updatePrefix";

	private Locale locale = null;	
	
	private static TemplateEngine templateEngine;
	static {
		templateEngine = ThymolTestApplication.initializeTemplateEngine();
	}

	public ThymolTestFilter() {
		super();
	}

	public void doFilter( final ServletRequest request, final ServletResponse response, final FilterChain chain ) throws IOException, ServletException {
		process( ( HttpServletRequest )request, ( HttpServletResponse )response, ( ( HttpServletRequest )request ).getSession( true ).getServletContext(), templateEngine );
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init( FilterConfig arg0 ) throws ServletException {
	}

	private void process( final HttpServletRequest request, final HttpServletResponse response, final ServletContext servletContext, final TemplateEngine templateEngine ) throws IOException {
		WebContext ctx = new WebContext( request, response, servletContext );
		String template = getRequestPath( request );
		if( UPDATE_PREFIX_URI.equals( template ) ) {
			String localeIndx = ( String )request.getParameter( "locale" );			
			if( localeIndx != null ) {
				int indx = Integer.parseInt(localeIndx);				
				Locale[] all = Locale.getAvailableLocales();
				locale = all[indx];				
			}
			else {
				locale = null;
			}
			String prefix = ( String )request.getParameter( "prefix" );
			if( prefix != null ) {
				addPrefix( prefix, locale );
			}
			response.setContentType("text/html");
		}
		else {
			if( template.length() > 0 && !"favicon".equalsIgnoreCase( template ) ) { // Work around selenium defect 2883 - ignore any requests for favicon from selenium
				if( locale != null) {
					ctx.setLocale(locale);
					locale = null;
				}
				processParameters( request, ctx );
				injectVars( ctx );
				response.setCharacterEncoding( "UTF-8" );
				templateEngine.process( template, ctx, response.getWriter() );
			}
		}
	}

	private String getRequestPath( final HttpServletRequest request ) {
		final String requestURI = request.getRequestURI();
		if( !requestURI.contains( UPDATE_PREFIX_URI ) ) {
			final String contextPath = request.getContextPath();
			if( requestURI.startsWith( contextPath ) ) {
				String uri = requestURI.substring( contextPath.length() + 1 );			
				if( uri.endsWith( ".html" ) ) {
					uri = uri.substring( 0, uri.length() - 5 );
				}
				else {
					uri = "";
				}
	//			int dotPos = uri.lastIndexOf( '.' );
	//			if( dotPos > 0 ) {
	//				uri = uri.substring( 0, dotPos );
	//			}
				return uri;
			}
		}
		return requestURI.substring( 1 );
	}

	public void processParameters( final HttpServletRequest request, WebContext ctx ) {
		@SuppressWarnings( "unchecked" )
		Map< String, Object > params = request.getParameterMap();
		for( String key: params.keySet() ) {
			Object objectValue = params.get( key );
			if( objectValue != null ) {
				if( objectValue instanceof String[] ) {
					String[] stringValueArray = ( String[] )objectValue;
					String valueString = stringValueArray[ 0 ];
					valueString = ( new TextLiteralExpression( valueString ) ).getValue().getValue();
					ctx.setVariable( key, valueString );
				}
			}
		}
	}

	public static void addPrefix( String prefix, Locale locale ) {
		Set< ITemplateResolver > resolvers = templateEngine.getTemplateResolvers();
		TemplateResolver prefixResolver = null;
		for( ITemplateResolver resolver: resolvers ) {
			ThymolTestApplication.ThymolServletContextTemplateResolver tr = ( ThymolTestApplication.ThymolServletContextTemplateResolver )resolver;
			if( tr.getPrefix().equals( prefix ) && tr.getLocale().toString().equals(locale.toString()) ) {
				prefixResolver = tr;
				break;
			}
		}
		if( prefixResolver == null ) {
			templateEngine = ThymolTestApplication.initializeTemplateEngine( prefix, locale );  //TODO
		}
	}

	private void injectVars( WebContext ctx ) {
		Map< String, String > testVar = new LinkedHashMap< String, String >();
		testVar.put( "text", "Hi there!" );
		ctx.setVariable( "test", testVar );

		//	    	    ["product",		"#{ 'name': 'Lettuce', 'prices': { 'euros': 9.00, 'dollars': 12.00 } }"]
		Map< String, String > pricesVar = new LinkedHashMap< String, String >();
		pricesVar.put( "euros", "9" );
		pricesVar.put( "dollars", "12" );
		Map< String, Object > productVar = new LinkedHashMap< String, Object >();
		productVar.put( "name", "Lettuce" );
		productVar.put( "prices", pricesVar );
		ctx.setVariable( "product", productVar );
		
//user = #{ 'name': 'Jack Melon', 'role': 'finance' }		
		Map< String, Object > userVar = new LinkedHashMap< String, Object >();
		userVar.put( "name", "Jack Melon" );
		userVar.put( "role", "finance" );
		userVar.put( "age", Integer.valueOf(24) );
		ctx.setVariable( "user", userVar );

		Map< String, String > subscribeVar = new LinkedHashMap< String, String >();
		testVar.put( "submit", "Subscribe me please!" );
		ctx.setVariable( "subscribe", subscribeVar );

		ctx.setVariable( "identifier", new Integer(32) );

		ctx.setVariable( "sel", Boolean.TRUE );

		ctx.setVariable( "value01", Boolean.FALSE );
		ctx.setVariable( "value02", Boolean.TRUE );
		ctx.setVariable( "value03", Integer.valueOf(0) );
		ctx.setVariable( "value04", Integer.valueOf(1) );
		ctx.setVariable( "value05", Integer.valueOf(-1) );
		ctx.setVariable( "value06", Integer.valueOf(2) );
		ctx.setVariable( "value07", "true" );
		ctx.setVariable( "value08", "false" );
		ctx.setVariable( "value09", "yes" );
		ctx.setVariable( "value10", "no" );
		ctx.setVariable( "value11", "YES" );
		ctx.setVariable( "value12", "NO" );
		ctx.setVariable( "value13", "YeS" );
		ctx.setVariable( "value14", "YeS" );
		ctx.setVariable( "value15", "No" );
		ctx.setVariable( "value16", "nO" );
		ctx.setVariable( "value17", "whatever" );
		ctx.setVariable( "value18", "Y" );
		ctx.setVariable( "value19", "N" );
		ctx.setVariable( "value20", "T" );
		ctx.setVariable( "value21", "F" );
		ctx.setVariable( "value22", new Object() );
		ctx.setVariable( "value23", null );

		Map< String, Object > fatherVar = new LinkedHashMap< String, Object >();
		fatherVar.put("name", "Joe");
		Map< String, Object > personVar = new LinkedHashMap< String, Object >();
		personVar.put( "father", fatherVar );
		ctx.setVariable( "person", personVar );


		List< Object > products = new LinkedList< Object >();
		Map< String, Object > product1Var = new LinkedHashMap< String, Object >();
		product1Var.put("name", "Lettuce");
		product1Var.put("price", "12");
		products.add(product1Var);
		Map< String, Object > product2Var = new LinkedHashMap< String, Object >();
		product2Var.put("name", "Apricot");
		product2Var.put("price", "8");
		products.add(product2Var);
		Map< String, Object > product3Var = new LinkedHashMap< String, Object >();
		product3Var.put("name", "Thyme");
		product3Var.put("price", "1.23");
		products.add(product3Var);
		Map< String, Object > product4Var = new LinkedHashMap< String, Object >();
		product4Var.put("name", "Carrot");
		product4Var.put("price", "2");
		products.add(product4Var);
		ctx.setVariable( "products", products );		
		
		Map< String, String > capitals = new LinkedHashMap< String, String >();
		capitals.put("Galicia", "Santiago de Compostela" );
		capitals.put("Asturias", "Oviedo" );
		capitals.put("Cantabria", "Santander" );
		ctx.setVariable( "capitals", capitals );

		List< Object > productList = new LinkedList< Object >();
		productList.add(product1Var);
		productList.add(product2Var);
		ctx.setVariable( "productList", productList );		

		ctx.setVariable( "atext", "Lorem ipsum blah blah" );		
		
//	   	  	["aa1",				"a"],   	        
//	   	  	["aa2",				true],   	        
//	   	  	["aa3",				false],   	        
//	   	  	["aa4",				"aa"],   	        
//	   	  	["ab1",				1],   	        
//	   	  	["ab2",				"one"],   	        
//	   	  	["ac1",				2],   	        
//	   	  	["ac2",				"two"]   	        
		
		ctx.setVariable( "aa1", 'a' );		
		ctx.setVariable( "aa2", true );		
		ctx.setVariable( "aa3", false );		
		ctx.setVariable( "aa4", "aa" );		
		ctx.setVariable( "ab1", 1 );		
		ctx.setVariable( "ab2", "one" );		
		ctx.setVariable( "ac1", 2 );		
		ctx.setVariable( "ac2", "two" );		
		
//	   	  	["bb1",				"not null"],   	        
//	   	  	["bb2",				null],   	        
//	   	  	["bc1",				2],   	        
//	   	  	["bc2",				"two"]   	        

		ctx.setVariable( "bb1", "not null" );		
		ctx.setVariable( "bb2", null );		
		ctx.setVariable( "bc1", 2 );		
		ctx.setVariable( "bc2", "two" );		
	
//	   	  	["ca1",				true],   	        
//	   	  	["ca2",				false],   	        
//	   	  	["cb1",				null],   	        
//	   	  	["cb2",				"one"]   	        

		ctx.setVariable( "ca1", true );		
		ctx.setVariable( "ca2", false );		
		ctx.setVariable( "cb1", null );		
		ctx.setVariable( "cb2", "one" );
		
		
//   	    ["value1",		"Joe Bloggs"],   	        
//		["value2",		"was here!"]   	    
		
		ctx.setVariable( "value1", "Joe Bloggs" );
		ctx.setVariable( "value2", "was here!" );
		
		ctx.setVariable( "onevar", "Hello" );
		ctx.setVariable( "twovar", "World" );
		
		ctx.setVariable( "planet01", "Mercury" );		
		ctx.setVariable( "planet02", "Venus" );		
		ctx.setVariable( "planet03", "Earth" );		
		ctx.setVariable( "planet04", "Mars" );		
		ctx.setVariable( "planet05", "Jupiter" );		
		ctx.setVariable( "planet06", "Saturn" );		
		ctx.setVariable( "planet07", "Uranus" );		
		ctx.setVariable( "planet08", "Neptune" );
		
		List< Object > planetList = new LinkedList< Object >();
		planetList.add(ctx.getVariables().get("planet01"));
		planetList.add(ctx.getVariables().get("planet02"));
		planetList.add(ctx.getVariables().get("planet03"));
		planetList.add(ctx.getVariables().get("planet04"));
		planetList.add(ctx.getVariables().get("planet05"));
		planetList.add(ctx.getVariables().get("planet06"));
		planetList.add(ctx.getVariables().get("planet07"));
		planetList.add(ctx.getVariables().get("planet08"));
		ctx.setVariable( "planets", planetList );
		
//  	    ["base_url",		"//www.thymeleaf.org/documentation.html"]
		
		ctx.setVariable( "base_url", "//www.thymeleaf.org/documentation.html" );
		

//		["cap1",		"#{'city' : 'Madrid', 'country' : 'Spain'}"],
//		["cap2",		"#{'city' : 'Lisboa', 'country' : 'Portugal'}"],
//		["cap3",		"#{'city' : 'Paris', 'country' : 'France'}"],
//
//     	["caps",		"#[ #cap1, #cap2, #cap3 ]"],
//   	 
//    	["msg",		    "Hello, World!"]
				
		List< Object > caps = new LinkedList< Object >();
		
		Map< String, Object > cap1Var = new LinkedHashMap< String, Object >();
		cap1Var.put("city", "Madrid");
		cap1Var.put("country", "Spain");
		ctx.setVariable( "cap1", "cap1Var" );		
		caps.add(cap1Var);
		
		Map< String, Object > cap2Var = new LinkedHashMap< String, Object >();
		cap2Var.put("city", "Lisboa");
		cap2Var.put("country", "Portugal");
		ctx.setVariable( "cap2", "cap2Var" );		
		caps.add(cap2Var);
		
		Map< String, Object > cap3Var = new LinkedHashMap< String, Object >();
		cap3Var.put("city", "Paris");
		cap3Var.put("country", "France");
		ctx.setVariable( "cap3", "cap3Var" );		
		caps.add(cap3Var);
		
		ctx.setVariable( "caps", caps );		
		
		ctx.setVariable( "msg", "Hello, World!" );
		
		ctx.setVariable( "caps0", new LinkedList< Object >() );		
		
		ctx.setVariable( "text", "Hello!" );		

		ctx.setVariable( "condition", true );		
		ctx.setVariable( "not_condition", false );		
		ctx.setVariable( "network", "IPTV" );		
		
		ctx.setVariable( "onevar01", "something" );		
		ctx.setVariable( "twovar01", 20 );		
		Map< String, Object > fourvar01Var = new LinkedHashMap< String, Object >();
		fourvar01Var.put("value", 25 );
		ctx.setVariable( "fourvar01", fourvar01Var );		

		ctx.setVariable( "m22", "...and for you too!" );		

		
		Map< String, Object > objVar = new LinkedHashMap< String, Object >();
		objVar.put("a", "12" );
		objVar.put("ba", "lala" );
		ctx.setVariable( "obj", objVar );		

		List< String > userRoles = new LinkedList< String >();
		userRoles.add("MANAGER");
		userRoles.add("SALES");
		ctx.setVariable( "userRoles", userRoles );		
		
		ctx.setVariable( "foo", "fooo!" );		
		ctx.setVariable( "someVar", "Hi there!" );		
		ctx.setVariable( "value", 23 );

		ctx.setVariable( "one", "color:blue;" );
		ctx.setVariable( "two", "text-align:center;" );
		ctx.setVariable( "three", "intro" );
		
		ctx.setVariable( "eValue1", 100.0 );
		ctx.setVariable( "eValue2", 37.397436 );

//	   	  	["a1",				"a"],   	        
//	   	  	["a2",				12]        
	   	ctx.setVariable( "a1", "a" );
		ctx.setVariable( "a2", 12 );

//     	   	  	["onevar",				false]

		ctx.setVariable( "onevar1", false );
		ctx.setVariable( "size", 123 );

		HttpSession session = ctx.getHttpSession();
		
		session.setAttribute( "a", "Some text" );
		session.setAttribute( "b", 123 );
		session.setAttribute( "c", "Hello" );

		ServletContext servletContext = ctx.getServletContext();

		servletContext.setAttribute( "a", "Some text" );
		servletContext.setAttribute( "b", 123 );
		servletContext.setAttribute( "c", "Hello" );
		
//onedate = new org.thymeleaf.engine21.conversion.conversion2.Conversion2Date(#dates.create(1492,10,12))
//Conversion2Date c2d = null;
		Dates dates = new Dates(Locale.UK);
		Calendars calendars = new Calendars(Locale.UK);
		
		Date onedate = dates.create(1992,10,12);
		ctx.setVariable( "onedate", onedate );
		
		Date twodate = dates.create(1732,10,12);
		ctx.setVariable( "twodate", twodate );
		
		Calendar onecalendar = calendars.create(1992,10,12);
		ctx.setVariable( "onecalendar", onecalendar );
		
		Calendar twocalendar = calendars.create(1732,10,12);
		ctx.setVariable( "twocalendar", twocalendar );
		
/*		
	var date1 = thDatesObject.create(1666,9,2);
	var date2 = thDatesObject.create(1835,12,16);
	var date3 = thDatesObject.create(1901,5,3);
	var date4 = thDatesObject.create(1922,9,13);
	var dateArray = [date1,date2,date3,date4];
    thymol.applicationContext.createVariable("date1", date1 );
    thymol.applicationContext.createVariable("date2", date2 );
    thymol.applicationContext.createVariable("date3", date3 );
    thymol.applicationContext.createVariable("date4", date4 );
    thymol.applicationContext.createVariable("dateArray", dateArray );
    thymol.applicationContext.createVariable("dateSet", ThSet.prototype.fromArray(dateArray) );
*/		
		Date date0 = dates.create(1492,10,12);		
		Date date1 = dates.create(1666,9,2);
		Date date2 = dates.create(1835,12,16);
		Date date3 = dates.create(1901,5,3);
		Date date4 = dates.create(1922,9,13);
		ctx.setVariable( "date0", date0 );
		ctx.setVariable( "date1", date1 );
		ctx.setVariable( "date2", date2 );
		ctx.setVariable( "date3", date3 );
		ctx.setVariable( "date4", date4 );
		Date[] dateArray = {date0,date1,date2,date3,date4};
		ctx.setVariable( "dateArray", dateArray );
		Set<Date> dateSet = new HashSet<Date>();

		List<Date> dateArrayAsList = Arrays.asList( dateArray );
		Collections.sort( dateArrayAsList );
		dateSet.addAll( dateArrayAsList );				
//		dateSet.add( date1 );
//		dateSet.add( date2 );
//		dateSet.add( date3 );
//		dateSet.add( date4 );
		ctx.setVariable( "dateSet", dateSet );				
		
/*		
	var time1 = new Date(1501, 3, 12, 8, 25, 9, 321);
	var time2 = new Date(1711, 4, 13, 12, 35, 19, 543);
	var time3 = new Date(1921, 5, 14, 14, 45, 29, 765);
	var time4 = new Date(2031, 6, 15, 16, 55, 39, 987);
*/
		Date time1 = dates.create(1501, 3, 12, 8, 25, 9, 321);
		Date time2 = dates.create(1711, 4, 13, 12, 35, 19, 543);
		Date time3 = dates.create(1921, 5, 14, 14, 45, 29, 765);
		Date time4 = dates.create(2031, 6, 15, 16, 55, 39, 987);
		ctx.setVariable( "time1", time1 );
		ctx.setVariable( "time2", time2 );
		ctx.setVariable( "time3", time3 );
		ctx.setVariable( "time4", time4 );
		Date[] timeArray = {time1,time2,time3,time4};
		ctx.setVariable( "timeArray", timeArray );
		Set<Date> timeSet = new HashSet<Date>();
		List<Date> timeArrayAsList = Arrays.asList( timeArray );
		Collections.sort( timeArrayAsList );
		timeSet.addAll( timeArrayAsList );
//		timeSet.add( time1 );
//		timeSet.add( time2 );
//		timeSet.add( time3 );
//		timeSet.add( time4 );
		ctx.setVariable( "timeSet", timeSet );
		
		Calendar calendarTime1 = calendars.create(1501, 3, 12, 8, 25, 9, 321);
		Calendar calendarTime2 = calendars.create(1711, 4, 13, 12, 35, 19, 543);
		Calendar calendarTime3 = calendars.create(1921, 5, 14, 14, 45, 29, 765);
		Calendar calendarTime4 = calendars.create(2031, 6, 15, 16, 55, 39, 987);
		ctx.setVariable( "calendarTime1", calendarTime1 );
		ctx.setVariable( "calendarTime2", calendarTime2 );
		ctx.setVariable( "calendarTime3", calendarTime3 );
		ctx.setVariable( "calendarTime4", calendarTime4 );
		Calendar[] calendarTimeArray = {calendarTime1,calendarTime2,calendarTime3,calendarTime4};
		ctx.setVariable( "calendarTimeArray", calendarTimeArray );
		Set<Calendar> calendarTimeSet = new HashSet<Calendar>();
		List<Calendar> calendarTimeArrayAsList = Arrays.asList( calendarTimeArray );
		Collections.sort( calendarTimeArrayAsList );
		calendarTimeSet.addAll( calendarTimeArrayAsList );
		ctx.setVariable( "calendarTimeSet", calendarTimeSet );

		
		Calendar calendar0 = calendars.create(1492,10,12);		
		Calendar calendar1 = calendars.create(1666,9,2);
		Calendar calendar2 = calendars.create(1835,12,16);
		Calendar calendar3 = calendars.create(1901,5,3);
		Calendar calendar4 = calendars.create(1922,9,13);
		ctx.setVariable( "calendar0", calendar0 );
		ctx.setVariable( "calendar1", calendar1 );
		ctx.setVariable( "calendar2", calendar2 );
		ctx.setVariable( "calendar3", calendar3 );
		ctx.setVariable( "calendar4", calendar4 );
		Calendar[] calendarArray = {calendar0,calendar1,calendar2,calendar3,calendar4};
		ctx.setVariable( "calendarArray", calendarArray );
		Set<Calendar> calendarSet = new HashSet<Calendar>();

		List<Calendar> calendarArrayAsList = Arrays.asList( calendarArray );
		Collections.sort( calendarArrayAsList );
		calendarSet.addAll( calendarArrayAsList );				
		ctx.setVariable( "calendarSet", calendarSet );
				
		
		ctx.setVariable( "a", "Letter A" );
		ctx.setVariable( "b", "Letter B" );
		ctx.setVariable( "class", "This is a class text" );
		
		VariablesMap<String,Object> variables = ctx.getVariables();
		if( variables == null ) {
			variables = new VariablesMap<String,Object>();
			ctx.setVariables( variables );
		}
		
/*		
          ["onex",         123],
          ["twox",         254123154123124],
          ["threex",       0.124],
          ["fourx",        0.1243541231123123124123125412312],
          ["fivex",        254123154123124.123125452131243],
          ["numberListx",  "#[#onex, #twox, #threex, #fourx, #fivex]" ],
          ["integerListx", "#[#onex, #twox]" ],
          ["decimalListx", "#[#threex, #fourx, #fivex]" ]
*/		
		
		Number onex = new java.math.BigInteger("123");
		Number twox = new java.math.BigInteger("254123154123124");
		Number threex = new java.math.BigDecimal("0.124");
//		Number fourx = new java.math.BigDecimal("0.1243541231123123124123125412312");
		Number fourx = new java.math.BigDecimal("0.12435412311231231");
//		Number fivex = new java.math.BigDecimal("254123154123124.123125452131243");
		Number fivex = new java.math.BigDecimal("254123154123124.1250");
		
		ctx.setVariable( "onex", onex );
		ctx.setVariable( "twox", twox );
		ctx.setVariable( "threex", threex );
		ctx.setVariable( "fourx", fourx );
		ctx.setVariable( "fivex", fivex );

		Number[] numberArray = {onex,twox,threex,fourx,fivex};
		List<Number> numberListx = Arrays.asList( numberArray );
		ctx.setVariable( "numberListx", numberListx );
		Number[] integerArray = {onex,twox};
		List<Number> integerListx = Arrays.asList( integerArray );
		ctx.setVariable( "integerListx", integerListx );
		Number[] decimalArray = {threex,fourx,fivex};
		List<Number> decimalListx = Arrays.asList( decimalArray );
		ctx.setVariable( "decimalListx", decimalListx );

/*		
          ["oney",         "one"],
          ["twoy",         "two"],
          ["threey",       "three"],
          ["strListy",     "#[#oney, #twoy, #threey]" ]		
*/
		
		ctx.setVariable( "oney", "one" );
		ctx.setVariable( "twoy", "two" );
		ctx.setVariable( "threey", "three" );

		List<String> strListy = Arrays.asList( new String[] {"one","two","three"} );
		ctx.setVariable( "strListy", strListy );
/*		
          ["anotherOney",       "one"],
          ["anotherOne2y",      "oneone"],
          ["anotherTwoy",       "TWO"]];
*/		
		ctx.setVariable( "anotherOney", "one" );
		ctx.setVariable( "anotherOne2y", "oneone" );
		ctx.setVariable( "anotherTwoy", "TWO" );
		
		ctx.setVariable( "anully", null );
		
/*		

	var p1 = new ThParam("Hello world!");
	var p2 = new ThParam("Bonjour tout le monde!");
	var p3 = new ThParam("Hola mundo!");
	var p4 = new ThParam("Kaixo mundua!");
	var pArray = [p1,p2,p3,p4];
    thymol.applicationContext.createVariable("p1", p1 );
    thymol.applicationContext.createVariable("p2", p2 );
    thymol.applicationContext.createVariable("p3", p3 );
    thymol.applicationContext.createVariable("p4", p4 );
    thymol.applicationContext.createVariable("pArray", pArray );
    thymol.applicationContext.createVariable("pSet", ThSet.prototype.fromArray(pArray) );

*/		
		String p1 = "Hello world!";
		String p2 = "Bonjour tout le monde!";
		String p3 = "Hola mundo!";
		String p4 = "Kaixo mundua!";
		ctx.setVariable( "p1", p1 );
		ctx.setVariable( "p2", p2 );
		ctx.setVariable( "p3", p3 );
		ctx.setVariable( "p4", p4 );
		String[] pArray = {p1,p2,p3,p4};
		Arrays.sort( pArray );
		ctx.setVariable( "pArray", pArray );
		List<String> pList = Arrays.asList( pArray );
		ctx.setVariable( "pList", pList );
		Set<String> pSet = new TreeSet<String>( pList );
		ctx.setVariable( "pSet", pSet );
		

		
/*		
	var b1 = "o";
	var b2 = " ";
	var b3 = "X";
	var bArray = [b1,b2,b3];
    thymol.applicationContext.createVariable("bArray", bArray );
	var a1 = "O";
	var a2 = "";
	var a3 = "!";
	var aArray = [a1,a2,a3];
    thymol.applicationContext.createVariable("aArray", aArray );
*/		
		String b1 = "o";
		String b2 = " ";
		String b3 = "X";
		String[] bArray = {b1,b2,b3};
		ctx.setVariable( "bArray", bArray );
		
		String a1 = "O";
		String a2 = "";
		String a3 = "!";
		String[] aArray = {a1,a2,a3};
		ctx.setVariable( "aArray", aArray );

		
		String ps1 = "Bonjour tout le monde!   ";
		String ps2 = "   Hello world!  ";
		String ps3 = "    Hola mundo!";
		String ps4 = "\tKaixo mundua!\t\n";
		String[] psArray = {ps1,ps2,ps3,ps4};
//		psArray = psArray.sort();
	    ctx.setVariable("ps1", ps1 );
	    ctx.setVariable("ps2", ps2 );
	    ctx.setVariable("ps3", ps3 );
	    ctx.setVariable("ps4", ps4 );
	    ctx.setVariable("psArray", psArray );

		List<String> psList = Arrays.asList( psArray );
		ctx.setVariable( "psList", psList );
		Set<String> psSet = new TreeSet<String>( psList );
		ctx.setVariable( "psSet", psSet );

		
		String s1 = "the quick brown fox jumps	over the\nlazy dog";
		String s2 = "\t\tevery\tgood\tboy\tdeserves\tfavour\t\t";
//		char cr = 13;
//	    var s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell\vas\fsweet\r"; // Selenium translates the /r to /n and so tests fail
//	    var s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell\vas\fsweet\n";
//		String s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell" + "\u000B" + "as\fsweet" + cr;
		String s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell" + "\u000B" + "as\fsweet\n";
	    ctx.setVariable("s1", s1 );
	    ctx.setVariable("s2", s2 );
	    ctx.setVariable("s3", s3 );
		String[] sArray = {s1,s2,s3};
		Arrays.sort( sArray );
	    ctx.setVariable("sArray", sArray );

		List<String> sList = Arrays.asList( sArray );
		ctx.setVariable( "sList", sList );
		Set<String> sSet = new TreeSet<String>( sList );
		ctx.setVariable( "sSet", sSet );
			
				
		String sa1 = "the~quick#brown@fox:jumps:@~over#the#lazy#dog";
		String sa2 = "~~~every:good@boy~deserves#favour~~~";
		String sa3 = "a?rose?by?any?other?name?would?n'ere?smell?as?sweet";
	    ctx.setVariable("sa1", sa1 );
	    ctx.setVariable("sa2", sa2 );
	    ctx.setVariable("sa3", sa3 );
		String[] saArray = {sa1,sa2,sa3};
		Arrays.sort( saArray );
	    ctx.setVariable("saArray", saArray );

		List<String> saList = Arrays.asList( saArray );
		ctx.setVariable( "saList", saList );
		Set<String> saSet = new TreeSet<String>( saList );
		ctx.setVariable( "saSet", saSet );

	    String xs1 = "<a>b<c></a>";
		ctx.setVariable( "xs1", xs1 );		

	    String xs2 = "Be consistent when you use apostrophes after words that end in \"s.</b><b>\"</b> When someone's name ends with an \"s,\" it is acceptable to use an apostrophe without an \"s\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \"s\" after the apostrophe.";
	    ctx.setVariable( "xs2", xs2 );    
	    String xs3 = "If the family's last name ends in \"s,\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \"the Williamses\" in a plural sense. If you wanted to reference their dog, you'd say \"the Williamses' dog.\" If the last name seems awkward to say that way, sidestep the issue by saying \"the Williams family\" and \"the Williams family's dog.\"";
	    ctx.setVariable( "xs3", xs3 );
	    String xs4 = "<b class=\"whb\">Use apostrophes in contractions.</b> Sometimes, especially in <a href=\"/Avoid-Colloquial-(Informal)-Writing\" title=\"Avoid Colloquial (Informal) Writing\">informal writing</a>, apostrophes are used to indicate one or more missing letters. For example, the word \"don't\" is short for \"do not\"; other examples include \"isn't,\" \"wouldn't,\" and \"can't.\" Contractions can also be made with the verbs \"is,\" \"has,\" and \"have.\" For example, we can write \"She's going to school\" instead of \"She is going to school\"; or \"He's lost the game\" instead of \"He has lost the game.\"<div class=\"clearall\"></div>";
	    ctx.setVariable( "xs4", xs4 );
		String[] xsArray = {xs1,xs2,xs3,xs4};
		Arrays.sort( xsArray );
	    ctx.setVariable("xsArray", xsArray );
		List<String> xsList = Arrays.asList( xsArray );
		ctx.setVariable( "xsList", xsList );
		Set<String> xsSet = new TreeSet<String>( xsList );
		ctx.setVariable( "xsSet", xsSet );
		
	    String s4 = "silly m\\u009";
	    String s5 = "someone needs a\\";
	    String s6 = "silly M\\u09ngo and Midge";
	    ctx.setVariable( "s4", s4 );
	    ctx.setVariable( "s5", s5 );
	    ctx.setVariable( "s6", s6 );
	    	   
//		var sa2Array = ([sa1,null,"",sa2,"",null,sa3]);
//	    thymol.applicationContext.createVariable("sa2Array", sa2Array );
//		var sa3Array = ([sa1,null,"",sa2,"",null,sa3]).sort();
//		var sa2Set = ThSet.prototype.fromArray(sa3Array);
//	    thymol.applicationContext.createVariable("sa2Set", sa2Set );
	    
		String[] sa2Array = {sa1,null,"",sa2,"",null,sa3};
	    ctx.setVariable("sa2Array", sa2Array );

		String[] sa3Array = {sa1,"",sa2,"",sa3}; // Don't include the nulls Sets don't like nulls
//		Arrays.sort( sa3Array );
		List<String> sa3List = Arrays.asList( sa3Array );
		Set<String> sa2Set = new TreeSet<String>( sa3List );
	    ctx.setVariable("sa2Set", sa2Set );

//	    String fred;
		String ox1 = "Hello world!";
		String ox2 = "Bonjour tout le monde!";
		String ox3 = "Hola mundo!";
		String ox4 = "Kaixo mundua!";

		String[] oxArray = {ox1,null,null,ox4};
//		Arrays.sort( oxArray );

		ctx.setVariable( "ox1", ox1 );
	    ctx.setVariable( "ox2", ox2 );
	    ctx.setVariable( "ox3", ox3 );
	    ctx.setVariable( "ox4", ox4 );
	    ctx.setVariable( "oxArray", oxArray );
		List<String> oxList = Arrays.asList( oxArray );
		ctx.setVariable( "oxList", oxList );
		Set<String> oxSet = new HashSet<String>( oxList );
	    ctx.setVariable( "oxSet", oxSet );    
	    
	    Object bx1 = "Hello world!";
	    String bx2 = new String("Hole mundo");
	    String bx3 = "Bonjour tout le monde!";
		double bx4 = 28.2743334/9;
		int bx5 = 1;
		int bx6 = 0;
		Object[] bxArray = {bx1,null,null,bx4,bx5,bx6};
	    ctx.setVariable( "bx1", bx1 );
	    ctx.setVariable( "bx2", bx2 );
	    ctx.setVariable( "bx3", bx3 );
	    ctx.setVariable( "bx4", bx4 );
	    ctx.setVariable( "bx5", bx5 );
	    ctx.setVariable( "bx6", bx6 );
	    ctx.setVariable( "bxArray", bxArray );
		List<Object> bxList = Arrays.asList( bxArray );
		ctx.setVariable( "bxList", bxList );
		Set<Object> bxSet = new HashSet<Object>( bxList );
		ctx.setVariable( "bxSet", bxSet );
	    
		Object[] bx2Array = {Boolean.TRUE,Boolean.TRUE,Boolean.TRUE,Boolean.TRUE};
	    ctx.setVariable( "bx2Array", bx2Array );
		List<Object> bx2List = Arrays.asList( bx2Array );
		Set<Object> bx2Set = new HashSet<Object>( bx2List );
		ctx.setVariable( "bx2Set", bx2Set );
	    	    
		Object[] bx3Array = {Boolean.FALSE,Boolean.FALSE,Boolean.FALSE,Boolean.FALSE};
	    ctx.setVariable( "bx3Array", bx3Array );
		List<Object> bx3List = Arrays.asList( bx3Array );
		Set<Object> bx3Set = new HashSet<Object>( bx3List );
		ctx.setVariable( "bx3Set", bx3Set );	    	    
		
		String target = "<stuff>hello world!</stuff>";
		String[] before = {"&"," "};
		String[] after = {"%26","+"};
		ctx.setVariable( "target", target );
		ctx.setVariable( "before", before );
		ctx.setVariable( "after", after );
	    
		
		
		Integer[] ar1 = { new Integer(1), new Integer(3), new Integer(57), new Integer(99) };
//		int[] ar1 = { 1, 3, 57, 99 };
//		Arrays.sort( ar1 );

		Double[] ar2 = { new Double(1.1), new Double(3.3), new Double(57.57), new Double(99.99) };
//		Arrays.sort( ar2 );
		String[] ar3 = { "1", "3", "57", "99" };
		Arrays.sort( ar3 );
		String[] ar4 = { new String("1"), new String("3"), new String("57"), new String("99") };
		Arrays.sort( ar4 );
		String[] ar5 = { "one", "three", "fifty-seven", "ninety-nine" };
		Arrays.sort( ar5 );
		String[] ar6 = { new String("one"), new String("three"), new String("fifty-seven"), new String("ninety-nine") };
		Arrays.sort( ar6 );
		Boolean[] ar7 = { Boolean.FALSE, Boolean.TRUE, Boolean.FALSE, Boolean.TRUE };
		String[] ar8 = {};

		Integer[] ar9 = { 1, 3, 99 };
//		Arrays.sort( ar9 );
		Integer[] ar10 = { 1, 101, 3, 57, 99 };
//		Arrays.sort( ar10 );
		
		String[] ar11 = { "one", "three", "ninety-nine" };
		Arrays.sort( ar11 );
		String[] ar12 = { "one", "three", "fifty-seven", "ninety-nine", "one-hundred-and-one" };
		Arrays.sort( ar12 );
		
		Integer[] ar13 = { 1, 57, 3, 57, 99 };
		Arrays.sort( ar13 );
		Double[] ar14 = { new Double(1.1), new Double(3.3), new Double(57.57), new Double(3.3), new Double(99.99) };
		String[] ar15 = { "1", "99", "3", "57", "99" };
		Arrays.sort( ar15 );
		String[] ar16 = { new String("1"), new String("3"), new String("57"), new String("99"), new String("1") };
		Arrays.sort( ar16 );
		String[] ar17 = { "one", "three", "three", "three", "fifty-seven", "fifty-seven", "ninety-nine" };
		Arrays.sort( ar17 );
		
		ctx.setVariable( "ar1", ar1 );
		ctx.setVariable( "ar2", ar2 );
		ctx.setVariable( "ar3", ar3 );
		ctx.setVariable( "ar4", ar4 );
		ctx.setVariable( "ar5", ar5 );
		ctx.setVariable( "ar6", ar6 );
		ctx.setVariable( "ar7", ar7 );
		ctx.setVariable( "ar8", ar8 );
		
		ctx.setVariable( "ar9", ar9 );
		ctx.setVariable( "ar10", ar10 );
		ctx.setVariable( "ar11", ar11 );
		ctx.setVariable( "ar12", ar12 );

		ctx.setVariable( "ar13", ar13 );
		ctx.setVariable( "ar14", ar14 );
		ctx.setVariable( "ar15", ar15 );
		ctx.setVariable( "ar16", ar16 );
		ctx.setVariable( "ar17", ar17 );
		
		List<Integer> ar1List = Arrays.asList( ar1 );
		List<String> ar5List = Arrays.asList( ar5 );
		List<String> ar6List = Arrays.asList( ar6 );
		List<String> ar8List = Arrays.asList( ar8 );
		List<Integer> ar9List = Arrays.asList( ar9 );
		List<Integer> ar10List = Arrays.asList( ar10 );
		List<String> ar11List = Arrays.asList( ar11 );
		List<String> ar12List = Arrays.asList( ar12 );

		List<Integer> ar13List = Arrays.asList( ar13 );
		List<Double> ar14List = Arrays.asList( ar14 );
		List<String> ar15List = Arrays.asList( ar15 );
		List<String> ar16List = Arrays.asList( ar16 );
		List<String> ar17List = Arrays.asList( ar17 );
		
		ctx.setVariable( "ar1List", ar1List );	
		ctx.setVariable( "ar5List", ar5List );
		ctx.setVariable( "ar6List", ar6List );
		ctx.setVariable( "ar8List", ar8List );		
		ctx.setVariable( "ar9List", ar9List );
		ctx.setVariable( "ar10List", ar10List );
		ctx.setVariable( "ar11List", ar11List );
		ctx.setVariable( "ar12List", ar12List );

		ctx.setVariable( "ar13List", ar13List );	
		ctx.setVariable( "ar14List", ar14List );	
		ctx.setVariable( "ar15List", ar15List );	
		ctx.setVariable( "ar16List", ar16List );	
		ctx.setVariable( "ar17List", ar17List );	
		
	    ctx.setVariable( "as1", new TreeSet<Object>( ar1List ) );    
	    ctx.setVariable( "as2", new TreeSet<Object>( Arrays.asList( ar2 ) ) );    
	    ctx.setVariable( "as3", new TreeSet<Object>( Arrays.asList( ar3 ) ) );    
	    ctx.setVariable( "as4", new TreeSet<Object>( Arrays.asList( ar4 ) ) );    
	    ctx.setVariable( "as5", new TreeSet<Object>( ar5List ) );    
	    ctx.setVariable( "as6", new TreeSet<Object>( ar6List ) );    
	    ctx.setVariable( "as7", new TreeSet<Object>( Arrays.asList( ar7 ) ) );    
	    
	    ctx.setVariable( "as8", new TreeSet<Object>( Arrays.asList( ar8 ) ) );    	    
	    
	    ctx.setVariable( "as9", new TreeSet<Object>( ar9List ) );    
	    ctx.setVariable( "as10", new TreeSet<Object>( ar10List ) );    
	    ctx.setVariable( "as11", new TreeSet<Object>( ar11List ) );    
	    ctx.setVariable( "as12", new TreeSet<Object>( ar12List ) );    

	    ctx.setVariable( "as13", new TreeSet<Object>( ar13List ) );    
	    ctx.setVariable( "as14", new TreeSet<Object>( ar14List ) );    
	    ctx.setVariable( "as15", new TreeSet<Object>( ar15List ) );    
	    ctx.setVariable( "as16", new TreeSet<Object>( ar16List ) );    
	    ctx.setVariable( "as17", new TreeSet<Object>( ar17List ) );    
	    
	    
	    Object junkInstance = new JunkObject("junk");
	    Class<?> junktype = junkInstance.getClass();
	    ctx.setVariable( "jt", junktype );

	    Set<Object> ao1 = new HashSet<Object>();
	    ao1.add( ar1List );
	    ao1.add( "two" );	    
	    ctx.setVariable( "ao1", ao1 );
	   
	    
	    
	    
	    
	    
		Map<String,Object[]> tm1 = new HashMap<String,Object[]>();
		tm1.put("ar1",ar1);
		tm1.put("ar2",ar2);
		tm1.put("ar3",ar3);
		tm1.put("ar4",ar4);
		
		ctx.setVariable( "tm1", tm1 );
		
		String[] ka1 = {"ar1","ar2","ar3","ar4"};
		ctx.setVariable( "ka1", ka1 );
	    
		Object[] va1 = {ar1,ar2,ar3,ar4};
		ctx.setVariable( "va1", va1 );
	    
		Set< String > ks1 = new HashSet< String >();
		ks1.add("ar1");
		ks1.add("ar2");
		ks1.add("ar3");
		ks1.add("ar4");
		ctx.setVariable( "ks1", ks1 );
	    
		Set< Object[] > vs1 = new HashSet< Object[] >();
		vs1.add(ar1);
		vs1.add(ar2);
		vs1.add(ar3);
		vs1.add(ar4);
		ctx.setVariable( "vs1", vs1 );
	    
		String[] ka2 = {"ar1","ar2","ar3","ar4","ar5"};
		ctx.setVariable( "ka2", ka2 );
	   
		Object[] va2 = {ar1,ar2,ar3,ar4,ar5};
		ctx.setVariable( "va2", va2 );
		
		Set< String > ks2 = new HashSet< String >();
		ks2.add("ar1");
		ks2.add("ar2");
		ks2.add("ar3");
		ks2.add("ar4");
		ks2.add("ar5");
		ctx.setVariable( "ks2", ks2 );
	    
		Set< Object[] > vs2 = new HashSet< Object[] >();
		vs2.add(ar1);
		vs2.add(ar2);
		vs2.add(ar3);
		vs2.add(ar4);
		vs2.add(ar5);
		ctx.setVariable( "vs2", vs2 );
	    
		String[] ka3 = {"ar1","ar2","ar3"};
		ctx.setVariable( "ka3", ka3 );
	    
		Object[] va3 = {ar1,ar2,ar3};
		ctx.setVariable( "va3", va3 );
	    
		Set< String > ks3 = new HashSet< String >();
		ks3.add("ar1");
		ks3.add("ar2");
		ks3.add("ar3");
		ctx.setVariable( "ks3", ks3 );
	    
		Set< Object[] > vs3 = new HashSet< Object[] >();
		vs3.add(ar1);
		vs3.add(ar2);
		vs3.add(ar3);
		ctx.setVariable( "vs3", vs3 );
	    
		Set< Object[] > tm2 = new HashSet< Object[] >();
		tm2.add(ar1);
		tm2.add(ar2);
		tm2.add(ar3);
		tm2.add(ar4);
		
		ctx.setVariable( "tm2", tm2 );
	    
		Map<String,Object[]> tm3 = new HashMap<String,Object[]>();
		tm3.put("ar1",ar1);
		tm3.put("ar2",ar2);
		tm3.put("ar3",ar1);
		tm3.put("ar4",null);
		
		ctx.setVariable( "tm3", tm3 );

		Object tm4 = new Object();
//		Map<String,Object[]> tm4m = new HashMap<String,Object[]>();
//		tm4m.put( "ar1", ar1 );
//		tm4m.put( "ar2", ar2 );
//		tm4m.put( "ar3", ar3 );
//		tm4m.put( "ar4", ar4 );
//		tm4 = tm4m;
		
		ctx.setVariable( "tm4", tm4 );

		Map<String,Object[]> tm5 = new HashMap<String,Object[]>();
		ctx.setVariable( "tm5", tm5 );
	    	    
//	    aol.
//	    ao1["one"] = ar1;
//	    ao1[2] = "two";
	    
		ctx.setVariable( "var01", "John Apricot" );
		ctx.setVariable( "var02", "John Apricot Jr." );
		ctx.setVariable( "var03", "Saturn" );
	    
		String[] var04array = {"John Apricot"};
//		List<String> var04List = Arrays.asList( var04array );
		ctx.setVariable( "var04", var04array );

		String[] var05array = {"John Apricot","John Apricot Jr."};
//		List<String> var05List = Arrays.asList( var05array );
		ctx.setVariable( "var05", var05array );

		String[] var06array = {"John Apricot","John Apricot Jr.","Saturn"};
//		List<String> var06List = Arrays.asList( var06array );
		ctx.setVariable( "var06", var06array );
		
		String[] var07array = {"Joe Bloggs","Grimsby","fish"};
		List<String> var07List = Arrays.asList( var07array );
		ctx.setVariable( "var07", var07array );
		ctx.setVariable( "var07List", var07List );
		
		String[] var08array = {"Marie-Antoinette","France","cake"};
		List<String> var08List = Arrays.asList( var08array );
		ctx.setVariable( "var08", var08array );
		ctx.setVariable( "var08List", var08List );
		
		String[] var09array = {"Wallace","62 West Wallaby Street","cheese"};
		List<String> var09List = Arrays.asList( var09array );
		ctx.setVariable( "var09", var09array );
		ctx.setVariable( "var09List", var09List );
		
		String[] var10array = {"Mr. C. Monster","Sesame Street","cookies"};
		List<String> var10List = Arrays.asList( var10array );
		ctx.setVariable( "var10", var10array );
		ctx.setVariable( "var10List", var10List );
		

		String[] msgArray1 = {"msg05","msg06","msg07"};
		List<String> msgList1 = Arrays.asList( msgArray1 );
		Set<String> msgSet1 = new TreeSet<String>(msgList1);

		ctx.setVariable( "msgArray1", msgArray1 );
		ctx.setVariable( "msgList1", msgList1 );
		ctx.setVariable( "msgSet1", msgSet1 );
				
		ctx.setVariable( "thing1", 1 );
		ctx.setVariable( "thing2", 10 );
		
		ctx.setVariable( "level", "../../" );
		
	
		
		Map< String, Object > product5Var = new LinkedHashMap< String, Object >();
		product5Var.put("name", "Cucumber");
		product5Var.put("price", "1.0");

		Map< String, Object > product6Var = new LinkedHashMap< String, Object >();
		product6Var.put("name", "Melon");
		product6Var.put("price", "6.0");

		Map< String, Object > product7Var = new LinkedHashMap< String, Object >();
		product7Var.put("name", "Beetroot");
		product7Var.put("price", "1.45");

		Map< String, Object > product8Var = new LinkedHashMap< String, Object >();
		product8Var.put("name", "Peach");
		product8Var.put("price", "0.75");

		Map< String, Object > product9Var = new LinkedHashMap< String, Object >();
		product9Var.put("name", "Celery");
		product9Var.put("price", "2.0");

		Map< String, Object > product10Var = new LinkedHashMap< String, Object >();
		product10Var.put("name", "Pineapple");
		product10Var.put("price", "28.0");

		List< Object > productList2 = new LinkedList< Object >(products);
		productList2.add(product5Var);
		productList2.add(product6Var);
		productList2.add(product7Var);
		productList2.add(product8Var);
		productList2.add(product9Var);
		productList2.add(product10Var);
		
		ctx.setVariable( "productList2", productList2 );		
		ctx.setVariable( "product2", product2Var );		
		ctx.setVariable( "v1", new Integer(3) );		
		
		Integer[] numListArray = {5, 3, 9, 4, 1, 6, 2, 10, 8, 7};
		List< Integer > numList = Arrays.asList( numListArray );
		ctx.setVariable( "numList", numList );		
		
		Map<String,Object> affiliate = new HashMap<String,Object>();
		affiliate.put("identificationCode1","1234");
		affiliate.put("identificationCode2","5678");
		ctx.setVariable( "affiliate", affiliate );		
		
		ctx.setVariable( "base_url2", "/base/url" );
		
		Map< String, Object > user2Var = new LinkedHashMap< String, Object >();
		user2Var.put("name", "John Apricot");
		user2Var.put("firstName", "John");
		user2Var.put("lastName", "Apricot");
		user2Var.put("nationality", "Antarctica");
		user2Var.put("age", "(no age specified)");		
		ctx.setVariable( "user2", user2Var );		
		
		ctx.setVariable( "onevar2", "Some text over here" );		
		ctx.setVariable( "twovar2", "Other text (second)" );
		
/*		

var receipt = {
        paymentDetails: [
             {
                key: "PaymentDetailsMaskedAccount",
                label: "Account",
                value: "1234"
            }, {
                key: "PaymentDetailsSource",
                label: "Entry Mode",
                value: "Magstripe"
            }, {
                key: "PaymentDetailsCardIssueNumber",
                label: "Card Issue No.",
                value: "01"
            }
        ]
};

*/
		
		
		Map<String,Object> details1 = new HashMap<String,Object>();
		details1.put("key", "PaymentDetailsMaskedAccount");
		details1.put("label", "Account");
		details1.put("value", "1234");
		Map<String,Object> details2 = new HashMap<String,Object>();
		details2.put("key", "PaymentDetailsSource");
		details2.put("label", "Entry Mode");
		details2.put("value", "Magstripe");
		Map<String,Object> details3 = new HashMap<String,Object>();
		details3.put("key", "PaymentDetailsCardIssueNumber");
		details3.put("label", "Card Issue No.");
		details3.put("value", "01");
		
		List<Map<String,Object>> paymentDetails = new LinkedList<Map<String,Object>>();
		paymentDetails.add(details1);
		paymentDetails.add(details2);
		paymentDetails.add(details3);

		Map<String,List<Map<String,Object>>> receipt = new HashMap<String,List<Map<String,Object>>>();
		receipt.put("paymentDetails",paymentDetails);
		
		ctx.setVariable( "receipt", receipt );

		Map< String, Object > petVar = new LinkedHashMap< String, Object >();
		//'2008-04-23'
		PCDate petVarBirthDate = new PCDate( new GregorianCalendar(2008, Calendar.APRIL, 23) );
		petVar.put("birthDate", petVarBirthDate);
		ctx.setVariable( "pet", petVar );
		
//	  thymol.applicationContext.createVariable("birthDate",thymol.objects.thDatesObject.create(1940, 10, 9));
		Calendar bdc = new GregorianCalendar(1940, Calendar.OCTOBER, 9);
		Date bDate = bdc.getTime();
		ctx.setVariable( "birthDate1", bDate );
		ctx.setVariable( "birthDate2", bDate );

				
	}
	
	public static class JunkObject {
		String value;
		JunkObject(String thing) {
			this.value = thing;
		}
	}
	
	public static class PCDate {
		Calendar calendar;
		PCDate(Calendar c) {
			this.calendar = c;
		}
		public Date toDate() {
			return calendar.getTime();
		}
	}
	
}
