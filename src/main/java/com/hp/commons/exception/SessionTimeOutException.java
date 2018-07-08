package com.hp.commons.exception;

public class SessionTimeOutException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3760908061591486477L;

	public SessionTimeOutException(String error) {
		super(error) ;
	}

	public SessionTimeOutException(Exception e) {
		super(e) ;
	}

	public SessionTimeOutException(String error, Exception e) {
		super(error,e) ;
	}


}
