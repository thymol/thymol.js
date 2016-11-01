package org.thymoljs.thymol.test.json;

import com.cedarsoftware.util.io.JsonReader;
import com.cedarsoftware.util.io.JsonWriter;

public class JDEREGJsonCodec implements JSONCodec {
	
		
	// Using the most cool https://github.com/jdereg/json-io
	
	public JDEREGJsonCodec() {
	}	

	@Override
	public String encode( Object source ) {
		String target = JsonWriter.objectToJson( source );
		return target;
	}

	@Override
	public Object decode( String source ) {
		Object target = JsonReader.jsonToJava( source );
		return target;
	}

}
