package org.thymoljs.thymol.test.selenium;

import org.junit.BeforeClass;


public class RunFailSafe extends SeleniumSuite {

	@BeforeClass
	public static void startUp() {
		SeleniumCases.setup( new FailSafeEnv() );
	}
	
	public RunFailSafe() {		
	}

}
