package org.thymoljs.thymol.test.selenium;

import org.junit.BeforeClass;


public class RunSureFire extends SeleniumSuite {

	@BeforeClass
	public static void startUp() {
		SeleniumCases.setup( new SureFireEnv() );
	}
	
	public RunSureFire() {		
	}

}
