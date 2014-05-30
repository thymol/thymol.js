/* Start of thHttpSessionObject implementation

java.lang.Object 	getAttribute(java.lang.String name)
         Returns the object bound with the specified name in this session, or null if no object is bound under the name.

java.util.Enumeration<java.lang.String> 	getAttributeNames()
         Returns an Enumeration of String objects containing the names of all the objects bound to this session.

long 	getCreationTime()
         Returns the time when this session was created, measured in milliseconds since midnight January 1, 1970 GMT.

java.lang.String 	getId()
         Returns a string containing the unique identifier assigned to this session.

long 	getLastAccessedTime()
         Returns the last time the client sent a request associated with this session, as the number of milliseconds since midnight January 1, 1970 GMT, and marked by the time the container received the request.

int 	getMaxInactiveInterval()
         Returns the maximum time interval, in seconds, that the servlet container will keep this session open between client accesses.

ServletContext 	getServletContext()
         Returns the ServletContext to which this session belongs.

//HttpSessionContext 	getSessionContext()
//         Deprecated. As of Version 2.1, this method is deprecated and has no replacement. It will be removed in a future version of the Java Servlet API.

//java.lang.Object 	getValue(java.lang.String name)
//         Deprecated. As of Version 2.2, this method is replaced by getAttribute(java.lang.String).

//java.lang.String[] 	getValueNames()
//         Deprecated. As of Version 2.2, this method is replaced by getAttributeNames()

void 	invalidate()
         Invalidates this session then unbinds any objects bound to it.

boolean 	isNew()
         Returns true if the client does not yet know about the session or if the client chooses not to join the session.

//void 	putValue(java.lang.String name, java.lang.Object value)
//         Deprecated. As of Version 2.2, this method is replaced by setAttribute(java.lang.String, java.lang.Object)

void 	removeAttribute(java.lang.String name)
         Removes the object bound with the specified name from this session.

//void 	removeValue(java.lang.String name)
//         Deprecated. As of Version 2.2, this method is replaced by removeAttribute(java.lang.String)

void 	setAttribute(java.lang.String name, java.lang.Object value)
         Binds an object to this session, using the name specified.

void 	setMaxInactiveInterval(int interval)
         Specifies the time, in seconds, between client requests before the servlet container will invalidate this session.

*/

thymol.objects.thHttpSessionObject = function() {

	var thExpressionObjectName = "#httpSession";
	
	function getAttribute(name) {
		var result = thymol.sessionContext[name];
		return result;
	}

	function getParameter(name) {
		var result = thymol.sessionContext[name];
		return result;
	}

	function getServletContext() {
		var result = thymol.applicationContext;
		return result;
	}

	function getSessionContext() {
		var result = thymol.sessionContext;
		return result;
	}

	function getContextPath() {
		var result = "";
		return result;
	}

	function getRequestName() {
		var result = "";
		return result;
	}

	function getParameterValues(name) {
		var result = thymol.sessionContext[name];
		return result;
	}


	return {
		thExpressionObjectName: thExpressionObjectName,
		getAttribute : getAttribute,
		getParameter : getParameter,
		getServletContext : getServletContext,
		getSessionContext : getSessionContext,
		getContextPath : getContextPath,
		getRequestName : getRequestName,
		getParameterValues : getParameterValues
	};

}();

/* Start of thHttpServletRequestObject implementation

Excerpts from http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html

Copyright © 2009-2011, Oracle Corporation and/or its affiliates. All Rights Reserved. Use is subject to license terms. 

 static java.lang.String 	BASIC_AUTH
          String identifier for Basic authentication.
static java.lang.String 	CLIENT_CERT_AUTH
          String identifier for Client Certificate authentication.
static java.lang.String 	DIGEST_AUTH
          String identifier for Digest authentication.
static java.lang.String 	FORM_AUTH
          String identifier for Form authentication.



 boolean 	authenticate(HttpServletResponse response)
          Use the container login mechanism configured for the ServletContext to authenticate the user making this request.
 java.lang.String 	getAuthType()          Returns the name of the authentication scheme used to protect the servlet.
 java.lang.String 	getContextPath()
          Returns the portion of the request URI that indicates the context of the request.
 Cookie[] 	getCookies()
          Returns an array containing all of the Cookie objects the client sent with this request.
 long 	getDateHeader(java.lang.String name)
          Returns the value of the specified request header as a long value that represents a Date object.
 java.lang.String 	getHeader(java.lang.String name)
          Returns the value of the specified request header as a String.
 java.util.Enumeration<java.lang.String> 	getHeaderNames()
          Returns an enumeration of all the header names this request contains.
 java.util.Enumeration<java.lang.String> 	getHeaders(java.lang.String name)
          Returns all the values of the specified request header as an Enumeration of String objects.
 int 	getIntHeader(java.lang.String name)
          Returns the value of the specified request header as an int.
 java.lang.String 	getMethod()
          Returns the name of the HTTP method with which this request was made, for example, GET, POST, or PUT.
 Part 	getPart(java.lang.String name)
          Gets the Part with the given name.
 java.util.Collection<Part> 	getParts()
          Gets all the Part components of this request, provided that it is of type multipart/form-data.
 java.lang.String 	getPathInfo()
          Returns any extra path information associated with the URL the client sent when it made this request.
 java.lang.String 	getPathTranslated()
          Returns any extra path information after the servlet name but before the query string, and translates it to a real path.
 java.lang.String 	getQueryString()
          Returns the query string that is contained in the request URL after the path.
 java.lang.String 	getRemoteUser()
          Returns the login of the user making this request, if the user has been authenticated, or null if the user has not been authenticated.
 java.lang.String 	getRequestedSessionId()
          Returns the session ID specified by the client.
 java.lang.String 	getRequestURI()
          Returns the part of this request's URL from the protocol name up to the query string in the first line of the HTTP request.
 java.lang.StringBuffer 	getRequestURL()
          Reconstructs the URL the client used to make the request.
 java.lang.String 	getServletPath()
          Returns the part of this request's URL that calls the servlet.
 HttpSession 	getSession()
          Returns the current session associated with this request, or if the request does not have a session, creates one.
 HttpSession 	getSession(boolean create)
          Returns the current HttpSession associated with this request or, if there is no current session and create is true, returns a new session.
 java.security.Principal 	getUserPrincipal()
          Returns a java.security.Principal object containing the name of the current authenticated user.
 boolean 	isRequestedSessionIdFromCookie()
          Checks whether the requested session ID came in as a cookie.
 boolean 	isRequestedSessionIdFromUrl()
          Deprecated. As of Version 2.1 of the Java Servlet API, use isRequestedSessionIdFromURL() instead.
 boolean 	isRequestedSessionIdFromURL()
          Checks whether the requested session ID came in as part of the request URL.
 boolean 	isRequestedSessionIdValid()
          Checks whether the requested session ID is still valid.
 boolean 	isUserInRole(java.lang.String role)
          Returns a boolean indicating whether the authenticated user is included in the specified logical "role".
 void 	login(java.lang.String username, java.lang.String password)
          Validate the provided username and password in the password validation realm used by the web container login mechanism configured for the ServletContext.
 void 	logout()
          Establish null as the value returned when getUserPrincipal, getRemoteUser, and getAuthType is called on the request.

*

getAsyncContext, 
getAttribute, 
getAttributeNames, 
getCharacterEncoding, 
getContentLength, 
getContentType, 
getDispatcherType, 
getInputStream, 
getLocalAddr, 
getLocale, 
getLocales, 
getLocalName, 
getLocalPort, 
getParameter, 
getParameterMap, 
getParameterNames, 
getParameterValues, 
getProtocol, 
getReader, 
getRealPath, 
getRemoteAddr, 
getRemoteHost, 
getRemotePort, 
getRequestDispatcher, 
getScheme, 
getServerName, 
getServerPort, 
getServletContext, 
isAsyncStarted, 
isAsyncSupported, 
isSecure, 
removeAttribute, 
setAttribute, 
setCharacterEncoding, 
startAsync, 
startAsync

*
*/

thymol.objects.thHttpServletRequestObject = function() {

	var thExpressionObjectName = "#httpServletRequest";
	
	function getAttribute(name) {
		var result = thymol.requestContext[name][0];
		if( result instanceof ThParam ) {
			result = ThUtils.unQuote(result.value);
		}
		return result;
	}

	function getParameter(name) {
		var result = thymol.requestContext[name];
		return result;
	}

	function getContextPath() {
		var result = "";
		return result;
	}

	function getRequestName() {
		var result = "";
		return result;
	}

	function getParameterValues(name) {
		var result = thymol.requestContext[name];
		return result;
	}

//     Returns the current session associated with this request, or if the request does not have a session, creates one.
//     Returns the current HttpSession associated with this request or, if there is no current session and create is true, returns a new session.

	function getSession(create) {
		return thymol.objects.thHttpSessionObject;
	}

	return {
		thExpressionObjectName: thExpressionObjectName,
		getAttribute : getAttribute,
		getParameter : getParameter,
		getContextPath : getContextPath,
		getRequestName : getRequestName,
		getParameterValues : getParameterValues,
		getSession : getSession
	};

}();