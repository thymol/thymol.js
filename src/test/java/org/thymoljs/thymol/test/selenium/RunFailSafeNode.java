package org.thymoljs.thymol.test.selenium;

import org.junit.BeforeClass;


public class RunFailSafeNode extends SeleniumSuite {

	@BeforeClass
	public static void startUp() {
		SeleniumCases.setup( new FailSafeEnvNode() );
	}
	
	public RunFailSafeNode() {		
	}

}
