package org.thymoljs.thymol.test.json;

public interface JSONCodec {
	
	public String encode( Object source );
	
	public Object decode( String source );	

}
