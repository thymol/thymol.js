package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import java.util.Locale;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class CalendarsCases extends SeleniumCases {
	
	String calendars01ResultThymol =
			"\n" +
			"\t\t<p>12 October 1992 00:00:00 GMT</p>\n" +
			"\t\t<p>12 October 1732 00:00:00 GMT</p>\n" +
			"\t\n" +
			"\n\n";	
		
	String calendars01ResultThymeleaf =
			"\n" +
			"\t\t<p>12 October 1992 00:00:00 BST</p>\n" +
			"\t\t<p>12 October 1732 00:00:00 GMT</p>\n" +
			"\t\n" +
			"\n\n";	
		
	String calendars02Result =
			"\n" +
	        "\t\t<p>12/Oct/1732 00:00</p>\n" +
	        "\t\t<p>1732-12/10</p>\n" +
	        "\t\t<p>12 October 1732 00:00:00 GMT</p>\n" +
	        "\t\n" +
			"\n\n";	
		
	String calendars03ResultThymol =
			"\n" +
			"\t\t<p>12 October 1492 00:00:00 GMT</p>\n" +
			"\t\t<p>02 September 1666 00:00:00 GMT</p>\n" +
			"\t\t<p>16 December 1835 00:00:00 GMT</p>\n" +
			"\t\t<p>03 May 1901 00:00:00 GMT</p>\n" +
			"\t\t<p>13 September 1922 00:00:00 GMT</p>\n" +
			"\t\t<p>Array of calendars: <span><span>12 October 1492 00:00:00 GMT</span><span>, </span></span><span><span>02 September 1666 00:00:00 GMT</span><span>, </span></span><span><span>16 December 1835 00:00:00 GMT</span><span>, </span></span><span><span>03 May 1901 00:00:00 GMT</span><span>, </span></span><span><span>13 September 1922 00:00:00 GMT</span><span></span></span></p>\n" +
			"\t\t<p>Set of calendars: <span id=\"sort\"> 02 September 1666 00:00:00 GMT, 03 May 1901 00:00:00 GMT, 12 October 1492 00:00:00 GMT, 13 September 1922 00:00:00 GMT, 16 December 1835 00:00:00 GMT</span></p>\n" +					
			"\t\n" +
			"\n\n\n\n" +
			"\n\n";	
	
	String calendars03ResultThymeleaf =
			"\n" +
			"\t\t<p>12 October 1492 00:00:00 GMT</p>\n" +
			"\t\t<p>02 September 1666 00:00:00 GMT</p>\n" +
			"\t\t<p>16 December 1835 00:00:00 GMT</p>\n" +
			"\t\t<p>03 May 1901 00:00:00 GMT</p>\n" +
			"\t\t<p>13 September 1922 00:00:00 BST</p>\n" +
			"\t\t<p>Array of calendars: <span><span>12 October 1492 00:00:00 GMT</span><span>, </span></span><span><span>02 September 1666 00:00:00 GMT</span><span>, </span></span><span><span>16 December 1835 00:00:00 GMT</span><span>, </span></span><span><span>03 May 1901 00:00:00 GMT</span><span>, </span></span><span><span>13 September 1922 00:00:00 BST</span><span></span></span></p>\n" +
			"\t\t<p>Set of calendars: <span id=\"sort\"> 02 September 1666 00:00:00 GMT, 03 May 1901 00:00:00 GMT, 12 October 1492 00:00:00 GMT, 13 September 1922 00:00:00 BST, 16 December 1835 00:00:00 GMT</span></p>\n" +					
			"\t\n" +
			"\n\n\n\n" +
			"\n\n";	
	
	String calendars04Result =
			"\n" +
	        "\t\t<p>12</p>\n" +
	        "\t\t<p>2</p>\n" +
	        "\t\t<p>16</p>\n" +
	        "\t\t<p>3</p>\n" +
	        "\t\t<p>13</p>\n" +
	        "\t\t<p>Array of days: <span>12,2,16,3,13</span></p>\n" +
	        "\t\t<p>Set of days: <span id=\"sort\">2,3,12,13,16</span></p>\n" +
	        "\t\n" +
	        "\n" +	        
	        "\n\n";	
	
	String calendars05Result =
			"\n" +
			"\t\t<p>10</p>\n" +
			"\t\t<p>9</p>\n" +
			"\t\t<p>12</p>\n" +
			"\t\t<p>5</p>\n" +
			"\t\t<p>9</p>\n" +
			"\t\t<p>Array of months: <span>10,9,12,5,9</span></p>\n" +
			"\t\t<p>Set of months: <span id=\"sort\">5,9,10,12</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars06Result =
			"\n" +
			"\t\t<p>October</p>\n" +
			"\t\t<p>September</p>\n" +
			"\t\t<p>December</p>\n" +
			"\t\t<p>May</p>\n" +
			"\t\t<p>September</p>\n" +
			"\t\t<p>Array of month names: <span>October,September,December,May,September</span></p>\n" +
			"\t\t<p>Set of month names: <span id=\"sort\">December,May,October,September</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars07Result =
			"\n" +
			"\t\t<p>Oct</p>\n" +
			"\t\t<p>Sep</p>\n" +
			"\t\t<p>Dec</p>\n" +
			"\t\t<p>May</p>\n" +
			"\t\t<p>Sep</p>\n" +
			"\t\t<p>Array of short month names: <span>Oct,Sep,Dec,May,Sep</span></p>\n" +
			"\t\t<p>Set of short month names: <span id=\"sort\">Dec,May,Oct,Sep</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars08Result =
			"\n" +
			"\t\t<p>1492</p>\n" +
			"\t\t<p>1666</p>\n" +
			"\t\t<p>1835</p>\n" +
			"\t\t<p>1901</p>\n" +
			"\t\t<p>1922</p>\n" +
			"\t\t<p>Array of years: <span>1492,1666,1835,1901,1922</span></p>\n" +
			"\t\t<p>Set of years: <span id=\"sort\">1492,1666,1835,1901,1922</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars09Result =
			"\n" +
			"\t\t<p>6</p>\n" +
			"\t\t<p>5</p>\n" +
			"\t\t<p>4</p>\n" +
			"\t\t<p>6</p>\n" +
			"\t\t<p>4</p>\n" +
			"\t\t<p>Array of days of week: <span>6,5,4,6,4</span></p>\n" +
			"\t\t<p>Set of days of week: <span id=\"sort\">4,5,6</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars10Result =
			"\n" +
			"\t\t<p>Friday</p>\n" +
			"\t\t<p>Thursday</p>\n" +
			"\t\t<p>Wednesday</p>\n" +
			"\t\t<p>Friday</p>\n" +
			"\t\t<p>Wednesday</p>\n" +
			"\t\t<p>Array of days of week: <span>Friday,Thursday,Wednesday,Friday,Wednesday</span></p>\n" +
			"\t\t<p>Set of days of week: <span id=\"sort\">Friday,Thursday,Wednesday</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars11Result =
			"\n" +
			"\t\t<p>Fri</p>\n" +
			"\t\t<p>Thu</p>\n" +
			"\t\t<p>Wed</p>\n" +
			"\t\t<p>Fri</p>\n" +
			"\t\t<p>Wed</p>\n" +
			"\t\t<p>Array of days of week: <span>Fri,Thu,Wed,Fri,Wed</span></p>\n" +
			"\t\t<p>Set of days of week: <span id=\"sort\">Fri,Thu,Wed</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars12Result =
			"\n" +
			"\t\t<p>8</p>\n" +
			"\t\t<p>12</p>\n" +
			"\t\t<p>14</p>\n" +
			"\t\t<p>16</p>\n" +
			"\t\t<p>Array of hours values: <span>8,12,14,16</span></p>\n" +
			"\t\t<p>Set of hours values: <span id=\"sort\">8,12,14,16</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars13Result =
			"\n" +
			"\t\t<p>25</p>\n" +
			"\t\t<p>35</p>\n" +
			"\t\t<p>45</p>\n" +
			"\t\t<p>55</p>\n" +
			"\t\t<p>Array of minutes values: <span>25,35,45,55</span></p>\n" +
			"\t\t<p>Set of minutes values: <span id=\"sort\">25,35,45,55</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars14Result =
			"\n" +
			"\t\t<p>9</p>\n" +
			"\t\t<p>19</p>\n" +
			"\t\t<p>29</p>\n" +
			"\t\t<p>39</p>\n" +
			"\t\t<p>Array of seconds values: <span>9,19,29,39</span></p>\n" +
			"\t\t<p>Set of seconds values: <span id=\"sort\">19,29,39,9</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	String calendars15Result =
			"\n" +
			"\t\t<p>321</p>\n" +
			"\t\t<p>543</p>\n" +
			"\t\t<p>765</p>\n" +
			"\t\t<p>987</p>\n" +
			"\t\t<p>Array of milliseconds values: <span>321,543,765,987</span></p>\n" +
			"\t\t<p>Set of milliseconds values: <span id=\"sort\">321,543,765,987</span></p>\n" +
			"\t\n" +
			"\n" +
			"\n\n";	
	
	@Test
	public void calendars01() {
		localise( "thymol/calendars/", new Locale( "en", "GB", "" ) );
		String result = getResult( "calendars01.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( calendars01ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( calendars01ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void calendars02() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars02.html", ResultMode.HTML );
		assertEquals( clean( calendars02Result ), clean( result ) );
	}

	@Test
	public void calendars03() {
		localise( "thymol/calendars/", new Locale( "en", "GB", "" ) );
		String result = getResult( "calendars03.html", ResultMode.HTML );
		if( expectThymolResult() ) {
			assertEquals( clean( calendars03ResultThymol ), clean( result ) );
		}
		else {
			assertEquals( clean( calendars03ResultThymeleaf ), clean( result ) );
		}
	}

	@Test
	public void calendars04() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars04.html", ResultMode.HTML );		
		assertEquals( clean( calendars04Result ), clean( result ) );
	}

	@Test
	public void calendars05() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars05.html", ResultMode.HTML );
		assertEquals( clean( calendars05Result ), clean( result ) );
	}

	@Test
	public void calendars06() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars06.html", ResultMode.HTML );
		assertEquals( clean( calendars06Result ), clean( result ) );
	}

	@Test
	public void calendars07() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars07.html", ResultMode.HTML );
		assertEquals( clean( calendars07Result ), clean( result ) );
	}

	@Test
	public void calendars08() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars08.html", ResultMode.HTML );
		assertEquals( clean( calendars08Result ), clean( result ) );
	}

	@Test
	public void calendars09() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars09.html", ResultMode.HTML );
		assertEquals( clean( calendars09Result ), clean( result ) );
	}

	@Test
	public void calendars10() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars10.html", ResultMode.HTML );
		assertEquals( clean( calendars10Result ), clean( result ) );
	}

	@Test
	public void calendars11() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars11.html", ResultMode.HTML );
		assertEquals( clean( calendars11Result ), clean( result ) );
	}

	@Test
	public void calendars12() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars12.html", ResultMode.HTML );
		assertEquals( clean( calendars12Result ), clean( result ) );
	}

	@Test
	public void calendars13() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars13.html", ResultMode.HTML );
		assertEquals( clean( calendars13Result ), clean( result ) );
	}

	@Test
	public void calendars14() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars14.html", ResultMode.HTML );
		assertEquals( clean( calendars14Result ), clean( result ) );
	}

	@Test
	public void calendars15() {
		localise( "thymol/calendars/" );
		String result = getResult( "calendars15.html", ResultMode.HTML );
		assertEquals( clean( calendars15Result ), clean( result ) );
	}

}
