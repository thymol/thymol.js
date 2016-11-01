package org.thymoljs.thymol.test.selenium.cases;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.junit.Test;
import org.thymoljs.thymol.test.context.Context;
import org.thymoljs.thymol.test.selenium.ResultMode;
import org.thymoljs.thymol.test.selenium.SeleniumCases;

import com.cedarsoftware.util.io.JsonObject;

public class StringsCases extends SeleniumCases {
	
	Context stringsBaseContext = new Context( "thymol/strings/" );
	
	String strings01Result =
			"\n" +
			"\t\t<p>Hello world!</p>\n" +
			"\t\t<p>Bonjour tout le monde!</p>\n" +
			"\t\t<p>Hola mundo!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>Bonjour tout le monde!,Hello world!,Hola mundo!,Kaixo mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span>Bonjour tout le monde!,Hello world!,Hola mundo!,Kaixo mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings02Result =
			"\n" +
			"\t\t<p>He...</p>\n" +
			"\t\t<p>Bo...</p>\n" +
			"\t\t<p>Ho...</p>\n" +
			"\t\t<p>Ka...</p>\n" +
			"\t\t<p>Array of strings: <span>Bo...,He...,Ho...,Ka...</span></p>\n" +
			"\t\t<p>Set of strings: <span>Bo...,He...,Ho...,Ka...</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings03Result =
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings04Result =
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings05Result =
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>Array of strings: <span>false,false,false,true</span></p>\n" +
			"\t\t<p>Set of strings: <span>false</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings06Result =
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>Array of strings: <span>false,false,false,true</span></p>\n" +
			"\t\t<p>Set of strings: <span>false</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings07Result =
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>Array of strings: <span>false,false,false,true</span></p>\n" +
			"\t\t<p>Set of strings: <span>false,true</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings08Result =
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>Array of strings: <span>true,true,true,true</span></p>\n" +
			"\t\t<p>Set of strings: <span>true</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings09Result =
			"\n" +
			"\t\t<p>world!</p>\n" +
			"\t\t<p>monde!</p>\n" +
			"\t\t<p>!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>r tout le monde!,world!,undo!,mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span>r tout le monde!,world!,undo!,mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings10Result =
			"\n" +
			"\t\t<p>wor</p>\n" +
			"\t\t<p>mon</p>\n" +
			"\t\t<p>!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>r t,wor,und,mun</span></p>\n" +
			"\t\t<p>Set of strings: <span>r t,wor,und,mun</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings11Result =
			"\n" +
			"\t\t<p></p>\n" +
			"\t\t<p>monde!</p>\n" +
			"\t\t<p></p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>e monde!,lo world!,a mundo!,</span></p>\n" +
			"\t\t<p>Set of strings: <span>njour tout le monde!, world!,la mundo!, mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	

	String strings12Result =
			"\n" +
			"\t\t<p>Hello</p>\n" +
			"\t\t<p>Bonjour</p>\n" +
			"\t\t<p></p>\n" +
			"\t\t<p>Kaixo mundua</p>\n" +
			"\t\t<p>Array of strings: <span>Bonjour tout ,He,Ho,</span></p>\n" +
			"\t\t<p>Set of strings: <span>B,Hell,H,Kaix</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings13Result =
			"\n" +
			"\t\t<p>A Big Hello world!</p>\n" +
			"\t\t<p>Un Grand Bonjour tout le monde!</p>\n" +
			"\t\t<p>Una Gran Hola mundo!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>**Bonjour tout le monde!,**Hello world!,**Hola mundo!,**Kaixo mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span>$$Bonjour tout le monde!,$$Hello world!,$$Hola mundo!,$$Kaixo mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";
	
	String strings14Result =
			"\n" +
			"\t\t<p>Happy! Happy! Happy! Happy! Happy! Happy! Happy! Happy! Happy! Happy! Happy! Happy! </p>\n" +
			"\t\t<p>............</p>\n" +
			"\t\t<p></p>\n" +
			"\t\t<p></p>\n" +
			"\t\n" +
			"\n\n";
		
	String strings15Result =
			"\n" +
			"\t\t<p>A Big Hello world!</p>\n" +
			"\t\t<p>Un Grand Bonjour tout le monde!</p>\n" +
			"\t\t<p>Una Gran Hola mundo!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Hello world! from Everyone!</p>\n" +
			"\t\t<p>Bonjour tout le monde! de tout le monde!</p>\n" +
			"\t\t<p>Hola mundo! de todos!</p>\n" +
			"\t\t<p>Kaixo denek mundu!</p>\n" +
			"\t\t<p>Array of strings: <span>Bonjour tout le monde!!,Hello world!!,Hola mundo!!,Kaixo mundua!!</span></p>\n" +
			"\t\t<p>Set of strings: <span>Bonjour tout le monde!Hello world!,Hello world!Hello world!,Hola mundo!Hello world!,Kaixo mundua!Hello world!</span></p>\n" +
			"\t\n" +
			"\n\n";
	
	String strings16Result =
			"\n" +
			"\t\t<p>Hello world!Bonjour tout le monde!</p>\n" +
			"\t\t<p>Hello world! or in French, Bonjour tout le monde!</p>\n" +
			"\t\t<p>Kaixo mundua! is Basque, Bonjour tout le monde! is French</p>\n" +
			"\t\t<p>Hello world!</p>\n" +
			"\t\t<p> (null) or not null Bonjour tout le monde!</p>\n" +
			"\t\t<p>Kaixo mundua! is Basque , (null) is null</p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings17ResultThymol =
			"\n" +
			"\t\t<p>Hello world!Bonjour tout le monde!</p>\n" +
			"\t\t<p>Hello world! or in French, Bonjour tout le monde!</p>\n" +
			"\t\t<p>Kaixo mundua! is Basque, Bonjour tout le monde! is French</p>\n" +
			"\t\t<p>Hello world!nil</p>\n" +
			"\t\t<p>nil (null) or not null Bonjour tout le monde!</p>\n" +
			"\t\t<p>Kaixo mundua! is Basque nil, (null) is null</p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings17ResultThymeleaf =
			"\n" +
			"\t\t<p>Hello world!Bonjour tout le monde!</p>\n" +
			"\t\t<p>Hello world! or in French, Bonjour tout le monde!</p>\n" +
			"\t\t<p>Kaixo mundua! is Basque, Bonjour tout le monde! is French</p>\n" +
			"\t\t<p>Hello world!</p>\n" +
			"\t\t<p> (null) or not null Bonjour tout le monde!</p>\n" +
			"\t\t<p>Kaixo mundua! is Basque , (null) is null</p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings18Result =
			"\n" +
			"\t\t<p>4</p>\n" +
			"\t\t<p>-1</p>\n" +
			"\t\t<p>1</p>\n" +
			"\t\t<p>0</p>\n" +
			"\t\t<p>Array of strings: <span>1,4,1,4</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">10,11,12,21</span></p>\n" +
			"\t\n" +
			"\n\n";	

	String strings19Result =
			"\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>Array of strings: <span>false,false,false,false</span></p>\n" +
			"\t\t<p>Set of strings: <span>false</span></p>\n" +
			"\t\t<p>Another array of strings: <span>false,true,true,true</span></p>\n" +
			"\t\t<p>Another set of strings: <span>false,true</span></p>\n" +
			"\t\n" +
			"\n\n";	

	String strings19aResult =
			"\n" +
			"\t\t<p>true</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\t<p>false</p>\n" +
			"\t\n" +
			"\n\n";	

	String strings20Result =
			"\n" +
			"\t\t<p>Joined array of strings: <span>Bonjour tout le monde! and Hello world! and Hola mundo! and Kaixo mundua!</span></p>\n" +
			"\t\t<p>Another joined array of strings: <span>njour tout le monde! &amp;  world! &amp; la mundo! &amp;  mundua!</span></p>\n" +
			"\t\t<p>Joined set of strings: <span>Bonjour tout le monde! and Hello world! and Hola mundo! and Kaixo mundua!</span></p>\n" +
			"\t\t<p>Another joined set of strings: <span>njour tout le monde! &amp;  world! &amp; la mundo! &amp;  mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
			 	
	String strings20aResult =
			"\n" +
			"\t\t<p>Joined list of strings: <span>Bonjour tout le monde! and Hello world! and Hola mundo! and Kaixo mundua!</span></p>\n" +
			"\t\t<p>Another joined list of strings: <span>njour tout le monde! &amp;  world! &amp; la mundo! &amp;  mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
			 	
	String strings21Result =
			"\n" +
			"\t\t<p>Array of strings: <span>Bo,jour,tout,le,mo,e!,Hello,worl,!,Hol,mu,o!,K,ixo,mu,u,!</span></p>\n" +
			"\t\t<p>Another array of strings: <span>njour,tout,le,monde!,world!,la,mundo!,mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span>Bo,jour,tout,le,mo,e!,Hello,worl,!,Hol,mu,o!,K,ixo,u</span></p>\n" +
			"\t\t<p>Another set of strings: <span>njour,tout,le,monde!,world!,la,mundo!,mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	

	String strings22Result =
			"\n" +
			"\t\t<p>12</p>\n" +
			"\t\t<p>1</p>\n" +
			"\t\t<p>11</p>\n" +
			"\t\t<p>0</p>\n" +
			"\t\t<p>Array of strings: <span>22,12,11,13</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">11,12,13,22</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings23Result =
			"\n" +
			"\t\t<p>HellO wOrld!</p>\n" +
			"\t\t<p>Bonjourtoutlemonde!</p>\n" +
			"\t\t<p>Hola mundo!</p>\n" +
			"\t\t<p>62E'" + "\u2194" + "\\(RH'EJ'H09" + "\u20AC" + "_H@D\"G+_$?B&lt;\\" + "\u00A3" + "'%\\)</p>\n" +
			"\t\t<p>62E" + "\u2194" + "\\(RHEJ'H09" + "\u20AC" + "_H@D\"G+_$?B&lt;\\" + "\u00A3" + "%\\)</p>\n" +
			"\t\t<p>Array of strings: <span>BOnjOur tOut le mOnde!,HellO wOrld!,HOla mundO!,KaixO mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">Bonjourtoutlemonde!,Helloworld!,Holamundo!,Kaixomundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings24Result =
			"\n" +
			"\t\t<p>HellOwOrld!</p>\n" +
			"\t\t<p>BOnjOurtOutlemOnde!</p>\n" +
			"\t\t<p>HOlamundO!</p>\n" +
			"\t\t<p>Array of strings: <span>BOnjOurtOutlemOnde!,HellOwOrld!,HOlamundO!,KaixOmundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">BOnjOurtOutlemOnde!,HellOwOrld!,HOlamundO!,KaixOmundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings25Result =
			"\n" +
			"\t\t<p>HELLO WORLD!</p>\n" +
			"\t\t<p>BONJOUR TOUT LE MONDE!</p>\n" +
			"\t\t<p>HOLA MUNDO!</p>\n" +
			"\t\t<p>KAIXO MUNDUA!</p>\n" +
			"\t\t<p>Array of strings: <span>BONJOUR TOUT LE MONDE!,HELLO WORLD!,HOLA MUNDO!,KAIXO MUNDUA!</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">BONJOUR TOUT LE MONDE!,HELLO WORLD!,HOLA MUNDO!,KAIXO MUNDUA!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings26Result =
			"\n" +
			"\t\t<p>hello world!</p>\n" +
			"\t\t<p>bonjour tout le monde!</p>\n" +
			"\t\t<p>hola mundo!</p>\n" +
			"\t\t<p>kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>bonjour tout le monde!,hello world!,hola mundo!,kaixo mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">bonjour tout le monde!,hello world!,hola mundo!,kaixo mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	

	String strings27Result =
			"\n" +
			"\t\t<p>Bonjour tout le monde!</p>\n" +
			"\t\t<p>Hello world!</p>\n" +
			"\t\t<p>Hola mundo!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>Bonjour tout le monde!,Hello world!,Hola mundo!,Kaixo mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">Bonjour tout le monde!,Hello world!,Hola mundo!,Kaixo mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings28Result =
			"\n" +
			"\t\t<p>Hello world!</p>\n" +
			"\t\t<p>Bonjour tout le monde!</p>\n" +
			"\t\t<p>Hola mundo!</p>\n" +
			"\t\t<p>Kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>Bonjour tout le monde!,Hello world!,Hola mundo!,Kaixo mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">Bonjour tout le monde!,Hello world!,Hola mundo!,Kaixo mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings29Result =
			"\n" +
			"\t\t<p>hello world!</p>\n" +
			"\t\t<p>bonjour tout le monde!</p>\n" +
			"\t\t<p>hola mundo!</p>\n" +
			"\t\t<p>kaixo mundua!</p>\n" +
			"\t\t<p>Array of strings: <span>bonjour tout le monde!,hello world!,hola mundo!,kaixo mundua!</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">bonjour tout le monde!,hello world!,hola mundo!,kaixo mundua!</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings30Result =
			"\n" +
			"\t\t<p>The Quick Brown Fox Jumps	Over The\nLazy Dog</p>\n" +
			"\t\t<p>\t\tEvery\tGood\tBoy\tDeserves\tFavour\t\t</p>\n" +
//			"\t\t<p>\nA\n\"rose\"\nBy\nAny\n'other'\nName Would N'ere Smell" + "\u000B" + "As\fSweet\r</p>\n" + // Selenium translates the /r to /n and so tests fail
			"\t\t<p>\nA\n\"rose\"\nBy\nAny\n'other'\nName Would N'ere Smell" + "\u000B" + "As\fSweet\n</p>\n" +
			"\t\t<p>Array of strings: <span>\t\tEvery\tGood\tBoy\tDeserves\tFavour\t\t,\nA\n\"rose\"\nBy\nAny\n'other'\nName Would N'ere Smell" + "\u000B" + "As\fSweet\n,The Quick Brown Fox Jumps	Over The\nLazy Dog</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">\t\tEvery\tGood\tBoy\tDeserves\tFavour\t\t,\nA\n\"rose\"\nBy\nAny\n'other'\nName Would N'ere Smell" + "\u000B" + "As\fSweet\n,The Quick Brown Fox Jumps	Over The\nLazy Dog</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings31Result =
			"\n" +
			"\t\t<p>The~Quick#Brown@Fox:Jumps:@~Over#The#Lazy#Dog</p>\n" +
			"\t\t<p>~~~Every:good@Boy~Deserves#Favour~~~</p>\n" +
			"\t\t<p>A?Rose?By?Any?Other?Name?Would?N'ere?Smell?As?Sweet</p>\n" +
			"\t\t<p>Array of strings: <span>A?Rose?By?Any?Other?Name?Would?N'ere?Smell?As?Sweet,The~Quick#Brown@Fox:Jumps:@~Over#The#Lazy#Dog,~~~Every:Good@Boy~Deserves#Favour~~~</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">A?Rose?By?Any?Other?Name?Would?N'ere?Smell?As?Sweet,The~Quick#Brown@Fox:Jumps:@~Over#The#Lazy#Dog,~~~Every:Good@Boy~Deserves#Favour~~~</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings32Result =
			"\n" +
			"\t\t<p>&amp;lt;a&amp;gt;b&amp;lt;c&amp;gt;&amp;lt;/a&amp;gt;</p>\n" +
			"\t\t<p>Be consistent when you use apostrophes after words that end in &amp;quot;s.&amp;lt;/b&amp;gt;&amp;lt;b&amp;gt;&amp;quot;&amp;lt;/b&amp;gt; When someone&amp;#39;s name ends with an &amp;quot;s,&amp;quot; it is acceptable to use an apostrophe without an &amp;quot;s&amp;quot; to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an &amp;quot;s&amp;quot; after the apostrophe.</p>\n" +
			"\t\t<p>If the family&amp;#39;s last name ends in &amp;quot;s,&amp;quot; make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become &amp;quot;the Williamses&amp;quot; in a plural sense. If you wanted to reference their dog, you&amp;#39;d say &amp;quot;the Williamses&amp;#39; dog.&amp;quot; If the last name seems awkward to say that way, sidestep the issue by saying &amp;quot;the Williams family&amp;quot; and &amp;quot;the Williams family&amp;#39;s dog.&amp;quot;</p>\n" +
			"\t\t<p>&amp;lt;b class=&amp;quot;whb&amp;quot;&amp;gt;Use apostrophes in contractions.&amp;lt;/b&amp;gt; Sometimes, especially in &amp;lt;a href=&amp;quot;/Avoid-Colloquial-(Informal)-Writing&amp;quot; title=&amp;quot;Avoid Colloquial (Informal) Writing&amp;quot;&amp;gt;informal writing&amp;lt;/a&amp;gt;, apostrophes are used to indicate one or more missing letters. For example, the word &amp;quot;don&amp;#39;t&amp;quot; is short for &amp;quot;do not&amp;quot;; other examples include &amp;quot;isn&amp;#39;t,&amp;quot; &amp;quot;wouldn&amp;#39;t,&amp;quot; and &amp;quot;can&amp;#39;t.&amp;quot; Contractions can also be made with the verbs &amp;quot;is,&amp;quot; &amp;quot;has,&amp;quot; and &amp;quot;have.&amp;quot; For example, we can write &amp;quot;She&amp;#39;s going to school&amp;quot; instead of &amp;quot;She is going to school&amp;quot;; or &amp;quot;He&amp;#39;s lost the game&amp;quot; instead of &amp;quot;He has lost the game.&amp;quot;&amp;lt;div class=&amp;quot;clearall&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;</p>\n" +
			"\t\t<p>Array of strings: <span>&amp;lt;a&amp;gt;b&amp;lt;c&amp;gt;&amp;lt;/a&amp;gt;,&amp;lt;b class=&amp;quot;whb&amp;quot;&amp;gt;Use apostrophes in contractions.&amp;lt;/b&amp;gt; Sometimes, especially in &amp;lt;a href=&amp;quot;/Avoid-Colloquial-(Informal)-Writing&amp;quot; title=&amp;quot;Avoid Colloquial (Informal) Writing&amp;quot;&amp;gt;informal writing&amp;lt;/a&amp;gt;, apostrophes are used to indicate one or more missing letters. For example, the word &amp;quot;don&amp;#39;t&amp;quot; is short for &amp;quot;do not&amp;quot;; other examples include &amp;quot;isn&amp;#39;t,&amp;quot; &amp;quot;wouldn&amp;#39;t,&amp;quot; and &amp;quot;can&amp;#39;t.&amp;quot; Contractions can also be made with the verbs &amp;quot;is,&amp;quot; &amp;quot;has,&amp;quot; and &amp;quot;have.&amp;quot; For example, we can write &amp;quot;She&amp;#39;s going to school&amp;quot; instead of &amp;quot;She is going to school&amp;quot;; or &amp;quot;He&amp;#39;s lost the game&amp;quot; instead of &amp;quot;He has lost the game.&amp;quot;&amp;lt;div class=&amp;quot;clearall&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;,Be consistent when you use apostrophes after words that end in &amp;quot;s.&amp;lt;/b&amp;gt;&amp;lt;b&amp;gt;&amp;quot;&amp;lt;/b&amp;gt; When someone&amp;#39;s name ends with an &amp;quot;s,&amp;quot; it is acceptable to use an apostrophe without an &amp;quot;s&amp;quot; to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an &amp;quot;s&amp;quot; after the apostrophe.,If the family&amp;#39;s last name ends in &amp;quot;s,&amp;quot; make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become &amp;quot;the Williamses&amp;quot; in a plural sense. If you wanted to reference their dog, you&amp;#39;d say &amp;quot;the Williamses&amp;#39; dog.&amp;quot; If the last name seems awkward to say that way, sidestep the issue by saying &amp;quot;the Williams family&amp;quot; and &amp;quot;the Williams family&amp;#39;s dog.&amp;quot;</span></p>\t\t \n" +
			"\t\t<p>Set of strings: <span id=\"sort\">&amp;lt;a&amp;gt;b&amp;lt;c&amp;gt;&amp;lt;/a&amp;gt;,&amp;lt;b class=&amp;quot;whb&amp;quot;&amp;gt;Use apostrophes in contractions.&amp;lt;/b&amp;gt; Sometimes, especially in &amp;lt;a href=&amp;quot;/Avoid-Colloquial-(Informal)-Writing&amp;quot; title=&amp;quot;Avoid Colloquial (Informal) Writing&amp;quot;&amp;gt;informal writing&amp;lt;/a&amp;gt;, apostrophes are used to indicate one or more missing letters. For example, the word &amp;quot;don&amp;#39;t&amp;quot; is short for &amp;quot;do not&amp;quot;; other examples include &amp;quot;isn&amp;#39;t,&amp;quot; &amp;quot;wouldn&amp;#39;t,&amp;quot; and &amp;quot;can&amp;#39;t.&amp;quot; Contractions can also be made with the verbs &amp;quot;is,&amp;quot; &amp;quot;has,&amp;quot; and &amp;quot;have.&amp;quot; For example, we can write &amp;quot;She&amp;#39;s going to school&amp;quot; instead of &amp;quot;She is going to school&amp;quot;; or &amp;quot;He&amp;#39;s lost the game&amp;quot; instead of &amp;quot;He has lost the game.&amp;quot;&amp;lt;div class=&amp;quot;clearall&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;,Be consistent when you use apostrophes after words that end in &amp;quot;s.&amp;lt;/b&amp;gt;&amp;lt;b&amp;gt;&amp;quot;&amp;lt;/b&amp;gt; When someone&amp;#39;s name ends with an &amp;quot;s,&amp;quot; it is acceptable to use an apostrophe without an &amp;quot;s&amp;quot; to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an &amp;quot;s&amp;quot; after the apostrophe.,If the family&amp;#39;s last name ends in &amp;quot;s,&amp;quot; make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become &amp;quot;the Williamses&amp;quot; in a plural sense. If you wanted to reference their dog, you&amp;#39;d say &amp;quot;the Williamses&amp;#39; dog.&amp;quot; If the last name seems awkward to say that way, sidestep the issue by saying &amp;quot;the Williams family&amp;quot; and &amp;quot;the Williams family&amp;#39;s dog.&amp;quot;</span></p>\n" +
			"\t\n" +
			"\n\n";	
	
	String strings32aResult =
			"\n" +
			"\t\t<p>&lt;a&gt;b&lt;c&gt;&lt;/a&gt;</p>\n" +
			"\t\t<p>Be consistent when you use apostrophes after words that end in \"s.&lt;/b&gt;&lt;b&gt;\"&lt;/b&gt; When someone's name ends with an \"s,\" it is acceptable to use an apostrophe without an \"s\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \"s\" after the apostrophe.</p>\n" +
			"\t\t<p>If the family's last name ends in \"s,\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \"the Williamses\" in a plural sense. If you wanted to reference their dog, you'd say \"the Williamses' dog.\" If the last name seems awkward to say that way, sidestep the issue by saying \"the Williams family\" and \"the Williams family's dog.\"</p>\n" +
			"\t\t<p>&lt;b class=\"whb\"&gt;Use apostrophes in contractions.&lt;/b&gt; Sometimes, especially in &lt;a href=\"/Avoid-Colloquial-(Informal)-Writing\" title=\"Avoid Colloquial (Informal) Writing\"&gt;informal writing&lt;/a&gt;, apostrophes are used to indicate one or more missing letters. For example, the word \"don't\" is short for \"do not\"; other examples include \"isn't,\" \"wouldn't,\" and \"can't.\" Contractions can also be made with the verbs \"is,\" \"has,\" and \"have.\" For example, we can write \"She's going to school\" instead of \"She is going to school\"; or \"He's lost the game\" instead of \"He has lost the game.\"&lt;div class=\"clearall\"&gt;&lt;/div&gt;</p>\n" +
			"\t\n" +
			"\n\n";	

	String strings33Result =
			"\n" +
			"\t\t<p>&lt;a&gt;b&lt;c&gt;&lt;\\/a&gt;</p>\n" +
			"\t\t<p>Be consistent when you use apostrophes after words that end in \\\"s.&lt;\\/b&gt;&lt;b&gt;\\\"&lt;\\/b&gt; When someone\\'s name ends with an \\\"s,\\\" it is acceptable to use an apostrophe without an \\\"s\\\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \\\"s\\\" after the apostrophe.</p>\n" +
			"\t\t<p>If the family\\'s last name ends in \\\"s,\\\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \\\"the Williamses\\\" in a plural sense. If you wanted to reference their dog, you\\'d say \\\"the Williamses\\' dog.\\\" If the last name seems awkward to say that way, sidestep the issue by saying \\\"the Williams family\\\" and \\\"the Williams family\\'s dog.\\\"</p>\n" +
			"\t\t<p>&lt;b class=\\\"whb\\\"&gt;Use apostrophes in contractions.&lt;\\/b&gt; Sometimes, especially in &lt;a href=\\\"/Avoid-Colloquial-(Informal)-Writing\\\" title=\\\"Avoid Colloquial (Informal) Writing\\\"&gt;informal writing&lt;\\/a&gt;, apostrophes are used to indicate one or more missing letters. For example, the word \\\"don\\'t\\\" is short for \\\"do not\\\"; other examples include \\\"isn\\'t,\\\" \\\"wouldn\\'t,\\\" and \\\"can\\'t.\\\" Contractions can also be made with the verbs \\\"is,\\\" \\\"has,\\\" and \\\"have.\\\" For example, we can write \\\"She\\'s going to school\\\" instead of \\\"She is going to school\\\"; or \\\"He\\'s lost the game\\\" instead of \\\"He has lost the game.\\\"&lt;div class=\\\"clearall\\\"&gt;&lt;\\/div&gt;</p>\n" +
			"\t\t<p>Array of strings: <span>&lt;a&gt;b&lt;c&gt;&lt;\\/a&gt;,&lt;b class=\\\"whb\\\"&gt;Use apostrophes in contractions.&lt;\\/b&gt; Sometimes, especially in &lt;a href=\\\"/Avoid-Colloquial-(Informal)-Writing\\\" title=\\\"Avoid Colloquial (Informal) Writing\\\"&gt;informal writing&lt;\\/a&gt;, apostrophes are used to indicate one or more missing letters. For example, the word \\\"don\\'t\\\" is short for \\\"do not\\\"; other examples include \\\"isn\\'t,\\\" \\\"wouldn\\'t,\\\" and \\\"can\\'t.\\\" Contractions can also be made with the verbs \\\"is,\\\" \\\"has,\\\" and \\\"have.\\\" For example, we can write \\\"She\\'s going to school\\\" instead of \\\"She is going to school\\\"; or \\\"He\\'s lost the game\\\" instead of \\\"He has lost the game.\\\"&lt;div class=\\\"clearall\\\"&gt;&lt;\\/div&gt;,Be consistent when you use apostrophes after words that end in \\\"s.&lt;\\/b&gt;&lt;b&gt;\\\"&lt;\\/b&gt; When someone\\'s name ends with an \\\"s,\\\" it is acceptable to use an apostrophe without an \\\"s\\\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \\\"s\\\" after the apostrophe.,If the family\\'s last name ends in \\\"s,\\\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \\\"the Williamses\\\" in a plural sense. If you wanted to reference their dog, you\\'d say \\\"the Williamses\\' dog.\\\" If the last name seems awkward to say that way, sidestep the issue by saying \\\"the Williams family\\\" and \\\"the Williams family\\'s dog.\\\"</span></p>\n" +
			"\t\t<p>Set of strings: <span>&lt;a&gt;b&lt;c&gt;&lt;\\/a&gt;,&lt;b class=\\\"whb\\\"&gt;Use apostrophes in contractions.&lt;\\/b&gt; Sometimes, especially in &lt;a href=\\\"/Avoid-Colloquial-(Informal)-Writing\\\" title=\\\"Avoid Colloquial (Informal) Writing\\\"&gt;informal writing&lt;\\/a&gt;, apostrophes are used to indicate one or more missing letters. For example, the word \\\"don\\'t\\\" is short for \\\"do not\\\"; other examples include \\\"isn\\'t,\\\" \\\"wouldn\\'t,\\\" and \\\"can\\'t.\\\" Contractions can also be made with the verbs \\\"is,\\\" \\\"has,\\\" and \\\"have.\\\" For example, we can write \\\"She\\'s going to school\\\" instead of \\\"She is going to school\\\"; or \\\"He\\'s lost the game\\\" instead of \\\"He has lost the game.\\\"&lt;div class=\\\"clearall\\\"&gt;&lt;\\/div&gt;,Be consistent when you use apostrophes after words that end in \\\"s.&lt;\\/b&gt;&lt;b&gt;\\\"&lt;\\/b&gt; When someone\\'s name ends with an \\\"s,\\\" it is acceptable to use an apostrophe without an \\\"s\\\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \\\"s\\\" after the apostrophe.,If the family\\'s last name ends in \\\"s,\\\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \\\"the Williamses\\\" in a plural sense. If you wanted to reference their dog, you\\'d say \\\"the Williamses\\' dog.\\\" If the last name seems awkward to say that way, sidestep the issue by saying \\\"the Williams family\\\" and \\\"the Williams family\\'s dog.\\\"</span></p>\n" +
			"\n\n\n\n\n";	

	String strings33aResult =
			"\n" +
			"\t\t<p>the quick brown fox jumps\\tover the\\nlazy dog</p>\n" +
			"\t\t<p>\\t\\tevery\\tgood\\tboy\\tdeserves\\tfavour\\t\\t</p>\n" +
			"\t\t<p>\\na\\n\\\"rose\\\"\\nby\\nany\\n\\'other\\'\\nname would n\\'ere smell\\x0Bas\\fsweet\\n</p>\n" +
			"\t\t<p>Array of strings: <span>\\t\\tevery\\tgood\\tboy\\tdeserves\\tfavour\\t\\t,\\na\\n\\\"rose\\\"\\nby\\nany\\n\\'other\\'\\nname would n\\'ere smell\\x0Bas\\fsweet\\n,the quick brown fox jumps\\tover the\\nlazy dog</span></p>\t\t \n" +
			"\t\t<p>Set of strings: <span id=\"sort\">\\t\\tevery\\tgood\\tboy\\tdeserves\\tfavour\\t\\t,\\na\\n\\\"rose\\\"\\nby\\nany\\n\\'other\\'\\nname would n\\'ere smell\\x0Bas\\fsweet\\n,the quick brown fox jumps\\tover the\\nlazy dog</span></p>\n" +
			"\t\n" +
			"\n\n";	

	String strings34Result =
			"\n" +
			"\t\t<p>the quick brown fox jumps\tover the\nlazy dog</p>\n" +
			"\t\t<p>\t\tevery\tgood\tboy\tdeserves\tfavour\t\t</p>\n" +
			"\t\t<p>\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell" + "\u000B" + "as\fsweet\n</p>\n" +
			"\t\t<p>silly m\\u009</p>\n" +
			"\t\t<p>someone needs a\\</p>\n" +
			"\t\t<p>Array of strings: <span>\t\tevery\tgood\tboy\tdeserves\tfavour\t\t,\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell" + "\u000B" + "as\fsweet\n,the quick brown fox jumps\tover the\nlazy dog</span></p>\n" +
			"\t\t<p>Set of strings: <span>\t\tevery\tgood\tboy\tdeserves\tfavour\t\t,\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell" + "\u000B" + "as\fsweet\n,the quick brown fox jumps\tover the\nlazy dog</span></p>\n" +
			"\t\n" +
			"\n\n\n";	

	String strings34aResult =
			"\n" +
			"\t\t<p>silly M\\u09ngo and Midge</p>\n" +
			"\t\n" +
			"\n\n\n";	
		
	String strings35Result =
			"\n" +
			"\t<p>&lt;a&gt;b&lt;c&gt;&lt;/a&gt;</p>\n" +
			"\t<p>Be consistent when you use apostrophes after words that end in \\\"s.&lt;/b&gt;&lt;b&gt;\\\"&lt;/b&gt; When someone's name ends with an \\\"s,\\\" it is acceptable to use an apostrophe without an \\\"s\\\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \\\"s\\\" after the apostrophe.</p>\n" +
			"\t<p>If the family's last name ends in \\\"s,\\\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \\\"the Williamses\\\" in a plural sense. If you wanted to reference their dog, you'd say \\\"the Williamses' dog.\\\" If the last name seems awkward to say that way, sidestep the issue by saying \\\"the Williams family\\\" and \\\"the Williams family's dog.\\\"</p>\n" +
			"\t<p>&lt;b class=\\\"whb\\\"&gt;Use apostrophes in contractions.&lt;/b&gt; Sometimes, especially in &lt;a href=\\\"/Avoid-Colloquial-(Informal)-Writing\\\" title=\\\"Avoid Colloquial (Informal) Writing\\\"&gt;informal writing&lt;/a&gt;, apostrophes are used to indicate one or more missing letters. For example, the word \\\"don't\\\" is short for \\\"do not\\\"; other examples include \\\"isn't,\\\" \\\"wouldn't,\\\" and \\\"can't.\\\" Contractions can also be made with the verbs \\\"is,\\\" \\\"has,\\\" and \\\"have.\\\" For example, we can write \\\"She's going to school\\\" instead of \\\"She is going to school\\\"; or \\\"He's lost the game\\\" instead of \\\"He has lost the game.\\\"&lt;div class=\\\"clearall\\\"&gt;&lt;/div&gt;</p>\n" +
			"\t<p>Array of strings: <span>&lt;a&gt;b&lt;c&gt;&lt;/a&gt;,&lt;b class=\\\"whb\\\"&gt;Use apostrophes in contractions.&lt;/b&gt; Sometimes, especially in &lt;a href=\\\"/Avoid-Colloquial-(Informal)-Writing\\\" title=\\\"Avoid Colloquial (Informal) Writing\\\"&gt;informal writing&lt;/a&gt;, apostrophes are used to indicate one or more missing letters. For example, the word \\\"don't\\\" is short for \\\"do not\\\"; other examples include \\\"isn't,\\\" \\\"wouldn't,\\\" and \\\"can't.\\\" Contractions can also be made with the verbs \\\"is,\\\" \\\"has,\\\" and \\\"have.\\\" For example, we can write \\\"She's going to school\\\" instead of \\\"She is going to school\\\"; or \\\"He's lost the game\\\" instead of \\\"He has lost the game.\\\"&lt;div class=\\\"clearall\\\"&gt;&lt;/div&gt;,Be consistent when you use apostrophes after words that end in \\\"s.&lt;/b&gt;&lt;b&gt;\\\"&lt;/b&gt; When someone's name ends with an \\\"s,\\\" it is acceptable to use an apostrophe without an \\\"s\\\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \\\"s\\\" after the apostrophe.,If the family's last name ends in \\\"s,\\\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \\\"the Williamses\\\" in a plural sense. If you wanted to reference their dog, you'd say \\\"the Williamses' dog.\\\" If the last name seems awkward to say that way, sidestep the issue by saying \\\"the Williams family\\\" and \\\"the Williams family's dog.\\\"</span></p>\n" +
			"\t<p>Set of strings: <span>&lt;a&gt;b&lt;c&gt;&lt;/a&gt;,&lt;b class=\\\"whb\\\"&gt;Use apostrophes in contractions.&lt;/b&gt; Sometimes, especially in &lt;a href=\\\"/Avoid-Colloquial-(Informal)-Writing\\\" title=\\\"Avoid Colloquial (Informal) Writing\\\"&gt;informal writing&lt;/a&gt;, apostrophes are used to indicate one or more missing letters. For example, the word \\\"don't\\\" is short for \\\"do not\\\"; other examples include \\\"isn't,\\\" \\\"wouldn't,\\\" and \\\"can't.\\\" Contractions can also be made with the verbs \\\"is,\\\" \\\"has,\\\" and \\\"have.\\\" For example, we can write \\\"She's going to school\\\" instead of \\\"She is going to school\\\"; or \\\"He's lost the game\\\" instead of \\\"He has lost the game.\\\"&lt;div class=\\\"clearall\\\"&gt;&lt;/div&gt;,Be consistent when you use apostrophes after words that end in \\\"s.&lt;/b&gt;&lt;b&gt;\\\"&lt;/b&gt; When someone's name ends with an \\\"s,\\\" it is acceptable to use an apostrophe without an \\\"s\\\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \\\"s\\\" after the apostrophe.,If the family's last name ends in \\\"s,\\\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \\\"the Williamses\\\" in a plural sense. If you wanted to reference their dog, you'd say \\\"the Williamses' dog.\\\" If the last name seems awkward to say that way, sidestep the issue by saying \\\"the Williams family\\\" and \\\"the Williams family's dog.\\\"</span></p>\n" +
			"\n\n\n\n";

	String strings35aResult =
			"\n" +
			"\t\t<p>the quick brown fox jumps\\tover the\\nlazy dog</p>\n" +
			"\t\t<p>\\t\\tevery\\tgood\\tboy\\tdeserves\\tfavour\\t\\t</p>\n" +
			"\t\t<p>\\na\\n\\\"rose\\\"\\nby\\nany\\n'other'\\nname would n'ere smell\\u000Bas\\fsweet\\n</p>\n" +
			"\t\t<p>Array of strings: <span>\\t\\tevery\\tgood\\tboy\\tdeserves\\tfavour\\t\\t,\\na\\n\\\"rose\\\"\\nby\\nany\\n'other'\\nname would n'ere smell\\u000Bas\\fsweet\\n,the quick brown fox jumps\\tover the\\nlazy dog</span></p>\t\t \n" +
			"\t\t<p>Set of strings: <span id=\"sort\">\\t\\tevery\\tgood\\tboy\\tdeserves\\tfavour\\t\\t,\\na\\n\\\"rose\\\"\\nby\\nany\\n'other'\\nname would n'ere smell\\u000Bas\\fsweet\\n,the quick brown fox jumps\\tover the\\nlazy dog</span></p>\n" +
			"\t\n\n\n\n";

	String strings37Result =
			"\n" +
			"\t<p>%26lt;stuff%26gt;hello+world!%26lt;/stuff%26gt;</p>\n" +
			"\t<p>%26lt;stuff%26gt;hello+world!%26lt;/stuff%26gt;</p>\n" +
			"\t<p>%26lt;stuff%26gt;hello+world!%26lt;/stuff%26gt;</p>\n" +
			"\n\n\n\n";
			
	String strings38Result =
			"\n" +
			"\t\t<p>the~quick#brown@fox:jumps:@~over#the#lazy#dog</p>\n" +
			"\t\t<p>the~quick#brown@fox:jumps:@~over#the#lazy#dog</p>\n" +
			"\t\t<p></p>\n" +
			"\t\t<p>fred</p>\n" +
			"\t\t<p></p>\n" +
			"\t\t<p>fred</p>\n" +
			"\t\t<p>Array of strings: <span>the~quick#brown@fox:jumps:@~over#the#lazy#dog,fred,fred,~~~every:good@boy~deserves#favour~~~,fred,fred,a?rose?by?any?other?name?would?n'ere?smell?as?sweet</span></p>\n" +
			"\t\t<p>Set of strings: <span id=\"sort\">fred,a?rose?by?any?other?name?would?n'ere?smell?as?sweet,the~quick#brown@fox:jumps:@~over#the#lazy#dog,~~~every:good@boy~deserves#favour~~~</span></p>\n" +
			"\t\n\n\n\n";
			
	
	private Context getStrings01Context() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		String p1 = "Hello world!";
		String p2 = "Bonjour tout le monde!";
		String p3 = "Hola mundo!";
		String p4 = "Kaixo mundua!";
		variables.put( "p1", p1 );
		variables.put( "p2", p2 );
		variables.put( "p3", p3 );
		variables.put( "p4", p4 );
		String[] pArray = {p1,p2,p3,p4};
		Arrays.sort( pArray );
		variables.put( "pArray", pArray );
		List<String> pList = Arrays.asList( pArray );
		variables.put( "pList", pList );
		Set<String> pSet = new TreeSet<String>( pList );
		variables.put( "pSet", pSet );

	    return stringsBaseContext.copy().setVariables( variables );
		
	}
	
	private Context strings01Context = getStrings01Context();
	

	@Test
	public void strings01() {
		localise( strings01Context );
		String result = getResult( "strings01.html", ResultMode.HTML );
		assertEquals( clean( strings01Result ), clean( result ) );
	}

	@Test
	public void strings02() {
		localise( strings01Context );
		String result = getResult( "strings02.html", ResultMode.HTML );
		assertEquals( clean( strings02Result ), clean( result ) );
	}

	@Test
	public void strings03() {
		localise( strings01Context );
		String result = getResult( "strings03.html", ResultMode.HTML );
		assertEquals( clean( strings03Result ), clean( result ) );
	}

	@Test
	public void strings04() {
		localise( strings01Context );
		String result = getResult( "strings04.html", ResultMode.HTML );
		assertEquals( clean( strings04Result ), clean( result ) );
	}

	@Test
	public void strings05() {
		localise( strings01Context );
		String result = getResult( "strings05.html", ResultMode.HTML );
		assertEquals( clean( strings05Result ), clean( result ) );
	}

	@Test
	public void strings06() {
		localise( strings01Context );
		String result = getResult( "strings06.html", ResultMode.HTML );
		assertEquals( clean( strings06Result ), clean( result ) );
	}

	@Test
	public void strings07() {
		localise( strings01Context );
		String result = getResult( "strings07.html", ResultMode.HTML );
		assertEquals( clean( strings07Result ), clean( result ) );
	}

	@Test
	public void strings08() {
		localise( strings01Context );
		String result = getResult( "strings08.html", ResultMode.HTML );
		assertEquals( clean( strings08Result ), clean( result ) );
	}

	@Test
	public void strings09() {
		localise( strings01Context );
		String result = getResult( "strings09.html", ResultMode.HTML );
		assertEquals( clean( strings09Result ), clean( result ) );
	}

	@Test
	public void strings10() {
		localise( strings01Context );
		String result = getResult( "strings10.html", ResultMode.HTML );
		assertEquals( clean( strings10Result ), clean( result ) );
	}

	@Test
	public void strings11() {
		localise( strings01Context );
		String result = getResult( "strings11.html", ResultMode.HTML );
		assertEquals( clean( strings11Result ), clean( result ) );
	}

	@Test
	public void strings12() {
		localise( strings01Context );
		String result = getResult( "strings12.html", ResultMode.HTML );
		assertEquals( clean( strings12Result ), clean( result ) );
	}

	@Test
	public void strings13() {
		localise( strings01Context );
		String result = getResult( "strings13.html", ResultMode.HTML );
		assertEquals( clean( strings13Result ), clean( result ) );
	}

	@Test
	public void strings14() {
		localise( stringsBaseContext );
		String result = getResult( "strings14.html", ResultMode.HTML );
		assertEquals( clean( strings14Result ), clean( result ) );
	}

	@Test
	public void strings15() {
		localise( strings01Context );
		String result = getResult( "strings15.html", ResultMode.HTML );
		assertEquals( clean( strings15Result ), clean( result ) );
	}

	@Test
	public void strings16() {
		localise( strings01Context );
		String result = getResult( "strings16.html", ResultMode.HTML );
		assertEquals( clean( strings16Result ), clean( result ) );
	}

	@Test
	public void strings17() {
		localise( strings01Context );
		String result = getResult( "strings17.html", ResultMode.HTML );
		if( expectThymolResult() || expectNodeResult() ) {
			assertEquals( clean( strings17ResultThymol ), clean( result ) );
		}
		else {			
			assertEquals( clean( strings17ResultThymeleaf ), clean( result ) );
		}		
	}

	@Test
	public void strings18() {
		localise( strings01Context );
		String result = getResult( "strings18.html", ResultMode.HTML );
		assertEquals( clean( strings18Result ), clean( result ) );
	}

	@Test
	public void strings19() {
		localise( strings01Context );
		String result = getResult( "strings19.html", ResultMode.HTML );
		assertEquals( clean( strings19Result ), clean( result ) );
	}

	@Test
	public void strings19a() {
		localise( strings01Context );
		String result = getResult( "strings19a.html", ResultMode.HTML );
		assertEquals( clean( strings19aResult ), clean( result ) );
	}

	@Test
	public void strings20() {
		localise( strings01Context );
		String result = getResult( "strings20.html", ResultMode.HTML );
		assertEquals( clean( strings20Result ), clean( result ) );
	}

	@Test
	public void strings20a() {
		localise( strings01Context );
		String result = getResult( "strings20a.html", ResultMode.HTML );
		assertEquals( clean( strings20aResult ), clean( result ) );
	}

	@Test
	public void strings21() {
		localise( strings01Context );
		String result = getResult( "strings21.html", ResultMode.HTML );
		assertEquals( clean( strings21Result ), clean( result ) );
	}

	@Test
	public void strings22() {
		localise( strings01Context );
		String result = getResult( "strings22.html", ResultMode.HTML );
		assertEquals( clean( strings22Result ), clean( result ) );
	}

	@Test
	public void strings23() {
		localise( strings01Context );
		String result = getResult( "strings23.html", ResultMode.HTML );
		assertEquals( clean( strings23Result ), clean( result ) );
	}

	private Context getStrings24Context() {
		
		JsonObject< String, Object > variables24 = new JsonObject< String, Object >();
		
		String b1 = "o";
		String b2 = " ";
		String b3 = "X";
		String[] bArray = {b1,b2,b3};
		variables24.put( "bArray", bArray );
		
		String a1 = "O";
		String a2 = "";
		String a3 = "!";
		String[] aArray = {a1,a2,a3};
		variables24.put( "aArray", aArray );

		variables24.putAll( strings01Context.getVariables() );
		
	    return stringsBaseContext.copy().setVariables( variables24 );
				
	}
	
	@Test
	public void strings24() {
		localise( getStrings24Context() );
		String result = getResult( "strings24.html", ResultMode.HTML );
		assertEquals( clean( strings24Result ), clean( result ) );
	}

	@Test
	public void strings25() {
		localise( strings01Context );
		String result = getResult( "strings25.html", ResultMode.HTML );
		assertEquals( clean( strings25Result ), clean( result ) );
	}

	@Test
	public void strings26() {
		localise( strings01Context );
		String result = getResult( "strings26.html", ResultMode.HTML );
		assertEquals( clean( strings26Result ), clean( result ) );
	}

	private Context getStrings27Context() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		String ps1 = "Bonjour tout le monde!   ";
		String ps2 = "   Hello world!  ";
		String ps3 = "    Hola mundo!";
		String ps4 = "\tKaixo mundua!\t\n";
		String[] psArray = {ps1,ps2,ps3,ps4};
//		psArray = psArray.sort();
	    variables.put("ps1", ps1 );
	    variables.put("ps2", ps2 );
	    variables.put("ps3", ps3 );
	    variables.put("ps4", ps4 );
	    variables.put("psArray", psArray );

		List<String> psList = Arrays.asList( psArray );
		variables.put( "psList", psList );
		Set<String> psSet = new TreeSet<String>( psList );
		variables.put( "psSet", psSet );

		
	    return stringsBaseContext.copy().setVariables( variables );
				
	}
	
	@Test
	public void strings27() {
		localise( getStrings27Context() );
		String result = getResult( "strings27.html", ResultMode.HTML );
		assertEquals( clean( strings27Result ), clean( result ) );
	}

	@Test
	public void strings28() {
		localise( strings01Context );
		String result = getResult( "strings28.html", ResultMode.HTML );
		assertEquals( clean( strings28Result ), clean( result ) );
	}

	@Test
	public void strings29() {
		localise( strings01Context );
		String result = getResult( "strings29.html", ResultMode.HTML );
		assertEquals( clean( strings29Result ), clean( result ) );
	}

	private Context getStrings30Context() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		String s1 = "the quick brown fox jumps	over the\nlazy dog";
		String s2 = "\t\tevery\tgood\tboy\tdeserves\tfavour\t\t";
//		char cr = 13;
//	    var s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell\vas\fsweet\r"; // Selenium translates the /r to /n and so tests fail
//	    var s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell\vas\fsweet\n";
//		String s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell" + "\u000B" + "as\fsweet" + cr;
		String s3 = "\na\n\"rose\"\nby\nany\n'other'\nname would n'ere smell" + "\u000B" + "as\fsweet\n";
	    variables.put("s1", s1 );
	    variables.put("s2", s2 );
	    variables.put("s3", s3 );
		String[] sArray = {s1,s2,s3};
		Arrays.sort( sArray );
	    variables.put("sArray", sArray );

		List<String> sList = Arrays.asList( sArray );
		variables.put( "sList", sList );
		Set<String> sSet = new TreeSet<String>( sList );
		variables.put( "sSet", sSet );
		
	    String s4 = "silly m\\u009";
	    String s5 = "someone needs a\\";
	    String s6 = "silly M\\u09ngo and Midge";
	    variables.put( "s4", s4 );
	    variables.put( "s5", s5 );
	    variables.put( "s6", s6 );
		
	    return stringsBaseContext.copy().setVariables( variables );
				
	}
	
	private Context strings30Context = getStrings30Context();
	
	@Test
	public void strings30() {
		localise( strings30Context );
		String result = getResult( "strings30.html", ResultMode.HTML );
		assertEquals( clean( strings30Result ), clean( result ) );
	}

	private Context getStrings31Context() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		String sa1 = "the~quick#brown@fox:jumps:@~over#the#lazy#dog";
		String sa2 = "~~~every:good@boy~deserves#favour~~~";
		String sa3 = "a?rose?by?any?other?name?would?n'ere?smell?as?sweet";
	    variables.put("sa1", sa1 );
	    variables.put("sa2", sa2 );
	    variables.put("sa3", sa3 );
		String[] saArray = {sa1,sa2,sa3};
		Arrays.sort( saArray );
	    variables.put("saArray", saArray );

		List<String> saList = Arrays.asList( saArray );
		variables.put( "saList", saList );
		Set<String> saSet = new TreeSet<String>( saList );
		variables.put( "saSet", saSet );
		
		String[] sa2Array = {sa1,null,"",sa2,"",null,sa3};
	    variables.put("sa2Array", sa2Array );

		String[] sa3Array = {sa1,"",sa2,"",sa3}; // Don't include the nulls Sets don't like nulls
//		Arrays.sort( sa3Array );
		List<String> sa3List = Arrays.asList( sa3Array );
		Set<String> sa2Set = new TreeSet<String>( sa3List );
	    variables.put("sa2Set", sa2Set );		
		
	    return stringsBaseContext.copy().setVariables( variables );
				
	}
	
	private Context strings31Context = getStrings31Context();
	
	@Test
	public void strings31() {
		localise( strings31Context );
		String result = getResult( "strings31.html", ResultMode.HTML );
		assertEquals( clean( strings31Result ), clean( result ) );
	}

	
	private Context getStrings32Context() {
		
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
	    String xs1 = "<a>b<c></a>";
		variables.put( "xs1", xs1 );		
	    String xs2 = "Be consistent when you use apostrophes after words that end in \"s.</b><b>\"</b> When someone's name ends with an \"s,\" it is acceptable to use an apostrophe without an \"s\" to show ownership, but linguists with the Chicago Manual of Style, along with others, prefer to add an \"s\" after the apostrophe.";
	    variables.put( "xs2", xs2 );    
	    String xs3 = "If the family's last name ends in \"s,\" make it plural before adding an apostrophe. For instance, if you wanted to discuss the Williams family, they would become \"the Williamses\" in a plural sense. If you wanted to reference their dog, you'd say \"the Williamses' dog.\" If the last name seems awkward to say that way, sidestep the issue by saying \"the Williams family\" and \"the Williams family's dog.\"";
	    variables.put( "xs3", xs3 );
	    String xs4 = "<b class=\"whb\">Use apostrophes in contractions.</b> Sometimes, especially in <a href=\"/Avoid-Colloquial-(Informal)-Writing\" title=\"Avoid Colloquial (Informal) Writing\">informal writing</a>, apostrophes are used to indicate one or more missing letters. For example, the word \"don't\" is short for \"do not\"; other examples include \"isn't,\" \"wouldn't,\" and \"can't.\" Contractions can also be made with the verbs \"is,\" \"has,\" and \"have.\" For example, we can write \"She's going to school\" instead of \"She is going to school\"; or \"He's lost the game\" instead of \"He has lost the game.\"<div class=\"clearall\"></div>";
	    variables.put( "xs4", xs4 );
		String[] xsArray = {xs1,xs2,xs3,xs4};
		Arrays.sort( xsArray );
	    variables.put("xsArray", xsArray );
		List<String> xsList = Arrays.asList( xsArray );
		variables.put( "xsList", xsList );
		Set<String> xsSet = new TreeSet<String>( xsList );
		variables.put( "xsSet", xsSet );

	    return stringsBaseContext.copy().setVariables( variables );
		
	}
	
	private Context strings32Context = getStrings32Context();
	
	
	@Test
	public void strings32() {
		localise( strings32Context );
		String result = getResult( "strings32.html", ResultMode.HTML );
		assertEquals( clean( strings32Result ), clean( result ) );
	}

	@Test
	public void strings32a() {
		localise( strings32Context );
		if( expectThymolResult() ) {
			String result = getResult( "strings32a.html", ResultMode.HTML );
			assertEquals( clean( strings32aResult ), clean( result ) );
		}
	}

	@Test
	public void strings33() {
		localise( strings32Context );
		String result = getResult( "strings33.html", ResultMode.HTML );
		assertEquals( clean( strings33Result ), clean( result ) );
	}

	@Test
	public void strings33a() {
		localise( strings30Context );
		String result = getResult( "strings33a.html", ResultMode.HTML );
		assertEquals( clean( strings33aResult ), clean( result ) );
	}

	@Test
	public void strings34() {
		localise( strings30Context );
		String result = getResult( "strings34.html", ResultMode.HTML );
		assertEquals( clean( strings34Result ), clean( result ) );
	}

	@Test
	public void strings34a() {
		localise( strings30Context );
		String result = getResult( "strings34a.html", ResultMode.HTML );
		assertEquals( clean(strings34aResult), clean(result) );			
	}

	@Test
	public void strings35() {
		localise( strings32Context );
		String result = getResult( "strings35.html", ResultMode.HTML );
		assertEquals( clean( strings35Result ), clean( result ) );
	}

	@Test
	public void strings35a() {
		localise( strings30Context );
		String result = getResult( "strings35a.html", ResultMode.HTML );
		assertEquals( clean( strings35aResult ), clean( result ) );
	}

// strings-data-2	
	
	@Test
	public void strings35b() {
		localise( strings30Context );
		String result = getResult( "strings35b.html", ResultMode.HTML );
		assertEquals( clean( strings35aResult ), clean( result ) );
	}

	private Context getStrings37Context() {
			
		JsonObject< String, Object > variables = new JsonObject< String, Object >();
		
		String target = "<stuff>hello world!</stuff>";
		String[] before = {"&"," "};
		String[] after = {"%26","+"};
		variables.put( "target", target );
		variables.put( "before", before );
		variables.put( "after", after );

		return stringsBaseContext.copy().setVariables( variables );
		
	}
	
	@Test
	public void strings37() {
		localise( getStrings37Context() );
		String result;
		if( expectNodeResult() ) {
			result = getResult( "strings37-node.html", ResultMode.HTML );			
		}
		else {
			result = getResult( "strings37.html", ResultMode.HTML );
		}
		assertEquals( clean( strings37Result ), clean( result ) );	
	}

	@Test
	public void strings38() {
		localise( strings31Context );
		String result = getResult( "strings38.html", ResultMode.HTML );
		assertEquals( clean( strings38Result ), clean( result ) );
	}

}
