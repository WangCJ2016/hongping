package com.hp.commons.exception;

public class SessionException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3886295949359538967L;

	public SessionException(String error) {
		super(error) ;
	}

	public SessionException(Exception e) {
		super(e) ;
	}

	public SessionException(String error, Exception e) {
		super(error,e) ;
	}

}
