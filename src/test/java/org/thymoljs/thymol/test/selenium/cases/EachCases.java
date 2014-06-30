package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;
import org.junit.Test;

public class EachCases extends SeleniumCases {

	String each01Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
 	
	String each02Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>0</td>\n" +
			"    <td>1</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>1</td>\n" +
			"    <td>2</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>2</td>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
 	
	String each03Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>0</td>\n" +
			"    <td>1</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>1</td>\n" +
			"    <td>2</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>2</td>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
  	
	String each04Result =
			"\n" +
			"<table>\n" +
			"  <tbody><tr>\n" +
			"    <td>0</td>\n" +
			"    <td>1</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Lettuce</td>\n" +
			"    <td>12</td>\n" +
			"  </tr>\n<tr>\n" +
			"    <td>1</td>\n" +
			"    <td>2</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Apricot</td>\n" +
			"    <td>8</td>\n" +
			"  </tr><tr>\n" +
			"    <td>2</td>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>F</td>\n" +
			"    <td>Thyme</td>\n" +
			"    <td>1.23</td>\n" +
			"  </tr><tr>\n" +
			"    <td>3</td>\n" +
			"    <td>4</td>\n" +
			"    <td>4</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>F</td>\n" +
			"    <td>T</td>\n" +
			"    <td>Carrot</td>\n" +
			"    <td>2</td>\n" +
			"  </tr></tbody></table>\n" +
			"\n\n";
 	
	String each05Result =
			"\n" +
			"<div>\n" +
			"  <span>Galicia</span> : <span>Santiago de Compostela</span>\n" +
			"</div>\n" +
			"\n\n" +
			"<div>\n" +
			"  <span>Asturias</span> : <span>Oviedo</span>\n" +
			"</div><div>\n" +
			"  <span>Cantabria</span> : <span>Santander</span>\n" +
			"</div>";
 	
	@Test
	public void each01() {
		localise("tests/each/");
		String result = getResult( "each01.html", ResultMode.HTML );
		assertEquals( clean(each01Result), clean(result) );
	}

	@Test
	public void each02() {
		localise("tests/each/");
		String result = getResult( "each02.html", ResultMode.HTML );
		assertEquals( clean(each02Result), clean(result) );
	}

	@Test
	public void each03() {
		localise("tests/each/");
		String result = getResult( "each03.html", ResultMode.HTML );
		assertEquals( clean(each03Result), clean(result) );
	}

	@Test
	public void each04() {
		localise("tests/each/");
		String result = getResult( "each04.html", ResultMode.HTML );
		assertEquals( clean(each04Result), clean(result) );
	}

	@Test
	public void each05() {
		localise("tests/each/");
		String result = getResult( "each05.html", ResultMode.HTML );
		assertEquals( clean(each05Result), clean(result) );
	}

}
