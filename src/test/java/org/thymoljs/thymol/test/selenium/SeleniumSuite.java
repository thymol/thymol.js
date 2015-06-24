package org.thymoljs.thymol.test.selenium;

import org.thymoljs.thymol.test.selenium.cases.AggregatesCases;
import org.thymoljs.thymol.test.selenium.cases.AppendPrependCases;
import org.thymoljs.thymol.test.selenium.cases.ArraysCases;
import org.thymoljs.thymol.test.selenium.cases.AttrCases;
import org.thymoljs.thymol.test.selenium.cases.BoolsCases;
import org.thymoljs.thymol.test.selenium.cases.CalendarsCases;
import org.thymoljs.thymol.test.selenium.cases.DatesCases;
import org.thymoljs.thymol.test.selenium.cases.DebugCases;
import org.thymoljs.thymol.test.selenium.cases.DomSelectorCases;
import org.thymoljs.thymol.test.selenium.cases.EachCases;
import org.thymoljs.thymol.test.selenium.cases.ExprCases;
import org.thymoljs.thymol.test.selenium.cases.ExpressionCases;
import org.thymoljs.thymol.test.selenium.cases.ExpressionDerivedCases;
import org.thymoljs.thymol.test.selenium.cases.IdsCases;
import org.thymoljs.thymol.test.selenium.cases.IfCases;
import org.thymoljs.thymol.test.selenium.cases.IncludeCases;
import org.thymoljs.thymol.test.selenium.cases.InlineCases;
import org.thymoljs.thymol.test.selenium.cases.LinkCases;
import org.thymoljs.thymol.test.selenium.cases.ClassicMessageCases;
import org.thymoljs.thymol.test.selenium.cases.ListsCases;
import org.thymoljs.thymol.test.selenium.cases.MapsCases;
import org.thymoljs.thymol.test.selenium.cases.MessagesCases;
import org.thymoljs.thymol.test.selenium.cases.ObjectCases;
import org.thymoljs.thymol.test.selenium.cases.ObjectsCases;
import org.thymoljs.thymol.test.selenium.cases.ParamsCases;
import org.thymoljs.thymol.test.selenium.cases.RefCases;
import org.thymoljs.thymol.test.selenium.cases.RemoveCases;
import org.thymoljs.thymol.test.selenium.cases.ReplaceCases;
import org.thymoljs.thymol.test.selenium.cases.SetsCases;
import org.thymoljs.thymol.test.selenium.cases.StringsCases;
import org.thymoljs.thymol.test.selenium.cases.WithCases;
import org.thymoljs.thymol.test.selenium.issues.IssuesCases;
import org.thymoljs.thymol.test.selenium.thymol20.Thymol20Cases;
import org.thymoljs.thymol.test.selenium.v21cases.AssertCases21;
import org.thymoljs.thymol.test.selenium.v21cases.BlockCases21;
import org.thymoljs.thymol.test.selenium.v21cases.DomSelectorCases21;
import org.thymoljs.thymol.test.selenium.v21cases.ExpressionCases21;
import org.thymoljs.thymol.test.selenium.v21cases.IncludeCases21;
import org.thymoljs.thymol.test.selenium.v21cases.LinkCases21;
import org.thymoljs.thymol.test.selenium.v21cases.LiteralSubstCases21;
import org.thymoljs.thymol.test.selenium.v21cases.ParsingCases21;
import org.thymoljs.thymol.test.selenium.v21cases.RemoveCases21;
import org.thymoljs.thymol.test.selenium.v21cases.ReplaceCases21;
import org.thymoljs.thymol.test.selenium.v21cases.SyntaxCases21;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({	
	AggregatesCases.class,
	AppendPrependCases.class,
	ArraysCases.class,
	AttrCases.class,
	BoolsCases.class,
	CalendarsCases.class,
	DatesCases.class,
	DebugCases.class,
	DomSelectorCases.class,                                                                                                                                                                                                                        
	EachCases.class,                                                                                                                                                                                                                               
	ExprCases.class,                                                                                                                                                                                                                               
	ExpressionCases.class,                                                                                                                                                                                                                         
	ExpressionDerivedCases.class,                                                                                                                                                                                                                  
	IdsCases.class,                                                                                                                                                                                                                                
	IfCases.class,                                                                                                                                                                                                                                 
	IncludeCases.class,                                                                                                                                                                                                                            
	InlineCases.class,                                                                                                                                                                                                                             
	LinkCases.class,                                                                                                                                                                                                                              
	ClassicMessageCases.class,                                                                                                                                                                                                                              
	ListsCases.class,                                                                                                                                                                                                                              
	MapsCases.class,                                                                                                                                                                                                                               
	MessagesCases.class,                                                                                                                                                                                                                           
	ObjectCases.class,                                                                                                                                                                                                                             
	ObjectsCases.class,                                                                                                                                                                                                                            
	ParamsCases.class,                                                                                                                                                                                                                            
	RefCases.class,                                                                                                                                                                                                                                
	RemoveCases.class,                                                                                                                                                                                                                             
	ReplaceCases.class,                                                                                                                                                                                                                            
	SetsCases.class,                                                                                                                                                                                                                               
	StringsCases.class,                                                                                                                                                                                                                            
	WithCases.class,                                                                                                                                                                                                                               		
	Thymol20Cases.class,
	AssertCases21.class,
	BlockCases21.class,
	DomSelectorCases21.class,
	ExpressionCases21.class,
	IncludeCases21.class,
	LinkCases21.class,
	LiteralSubstCases21.class,
	ParsingCases21.class,
	RemoveCases21.class,
	ReplaceCases21.class,
	SyntaxCases21.class,
	IssuesCases.class
})

public class SeleniumSuite  {
}
