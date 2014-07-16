package org.thymoljs.thymol.test.selenium.cases;

import static junit.framework.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class DatesCases extends SeleniumCases {
	
	String dates01Result =
			"\n" +
			"\t\t<p>12 October 1992 00:00:00 BST</p>\n" +
			"\t\t<p>12 October 1732 00:00:00 GMT</p>\n" +
			"\t\n" +
			"\n\n";	
		
	String dates02Result =
			"\n" +
	        "\t\t<p>12/Oct/1732 00:00</p>\n" +
	        "\t\t<p>1732-12/10</p>\n" +
	        "\t\t<p>12 October 1732 00:00:00 GMT</p>\n" +
	        "\t\n" +
			"\n\n";	
		
	String dates03Result =
			"\n" +
			"\t\t<p>12 October 1492 00:00:00 GMT</p>\n" +
			"\t\t<p>02 September 1666 00:00:00 GMT</p>\n" +
			"\t\t<p>16 December 1835 00:00:00 GMT</p>\n" +
			"\t\t<p>03 May 1901 00:00:00 GMT</p>\n" +
			"\t\t<p>13 September 1922 00:00:00 BST</p>\n" +
			"\t\t<p>Array of dates: <span><span>12 October 1492 00:00:00 GMT</span><span>, </span></span><span><span>02 September 1666 00:00:00 GMT</span><span>, </span></span><span><span>16 December 1835 00:00:00 GMT</span><span>, </span></span><span><span>03 May 1901 00:00:00 GMT</span><span>, </span></span><span><span>13 September 1922 00:00:00 BST</span><span></span></span></p>\n" +
			"\t\t<p>Set of dates: <span id=\"sort\"> 02 September 1666 00:00:00 GMT, 03 May 1901 00:00:00 GMT, 12 October 1492 00:00:00 GMT, 13 September 1922 00:00:00 BST, 16 December 1835 00:00:00 GMT</span></p>\n" +					
			"\t\n" +
			"\n\n\n\n" +
			"\n\n";	
	
	String dates04Result =
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
	
	String dates05Result =
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
	
	String dates06Result =
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
	
	String dates07Result =
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
	
	String dates08Result =
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
	
	String dates09Result =
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
	
	String dates10Result =
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
	
	String dates11Result =
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
	
	String dates12Result =
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
	
	String dates13Result =
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
	
	String dates14Result =
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
	
	String dates15Result =
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
	public void dates01() {
		localise( "thymol/dates/" );
		String result = getResult( "dates01.html", ResultMode.HTML );
		assertEquals( clean( dates01Result ), clean( result ) );
	}

	@Test
	public void dates02() {
		localise( "thymol/dates/" );
		String result = getResult( "dates02.html", ResultMode.HTML );
		assertEquals( clean( dates02Result ), clean( result ) );
	}

	@Test
	public void dates03() {
		localise( "thymol/dates/" );
		String result = getResult( "dates03.html", ResultMode.HTML );
		assertEquals( clean( dates03Result ), clean( result ) );
	}

	@Test
	public void dates04() {
		localise( "thymol/dates/" );
		String result = getResult( "dates04.html", ResultMode.HTML );		
		assertEquals( clean( dates04Result ), clean( result ) );
	}

	@Test
	public void dates05() {
		localise( "thymol/dates/" );
		String result = getResult( "dates05.html", ResultMode.HTML );
		assertEquals( clean( dates05Result ), clean( result ) );
	}

	@Test
	public void dates06() {
		localise( "thymol/dates/" );
		String result = getResult( "dates06.html", ResultMode.HTML );
		assertEquals( clean( dates06Result ), clean( result ) );
	}

	@Test
	public void dates07() {
		localise( "thymol/dates/" );
		String result = getResult( "dates07.html", ResultMode.HTML );
		assertEquals( clean( dates07Result ), clean( result ) );
	}

	@Test
	public void dates08() {
		localise( "thymol/dates/" );
		String result = getResult( "dates08.html", ResultMode.HTML );
		assertEquals( clean( dates08Result ), clean( result ) );
	}

	@Test
	public void dates09() {
		localise( "thymol/dates/" );
		String result = getResult( "dates09.html", ResultMode.HTML );
		assertEquals( clean( dates09Result ), clean( result ) );
	}

	@Test
	public void dates10() {
		localise( "thymol/dates/" );
		String result = getResult( "dates10.html", ResultMode.HTML );
		assertEquals( clean( dates10Result ), clean( result ) );
	}

	@Test
	public void dates11() {
		localise( "thymol/dates/" );
		String result = getResult( "dates11.html", ResultMode.HTML );
		assertEquals( clean( dates11Result ), clean( result ) );
	}

	@Test
	public void dates12() {
		localise( "thymol/dates/" );
		String result = getResult( "dates12.html", ResultMode.HTML );
		assertEquals( clean( dates12Result ), clean( result ) );
	}

	@Test
	public void dates13() {
		localise( "thymol/dates/" );
		String result = getResult( "dates13.html", ResultMode.HTML );
		assertEquals( clean( dates13Result ), clean( result ) );
	}

	@Test
	public void dates14() {
		localise( "thymol/dates/" );
		String result = getResult( "dates14.html", ResultMode.HTML );
		assertEquals( clean( dates14Result ), clean( result ) );
	}

	@Test
	public void dates15() {
		localise( "thymol/dates/" );
		String result = getResult( "dates15.html", ResultMode.HTML );
		assertEquals( clean( dates15Result ), clean( result ) );
	}

}
