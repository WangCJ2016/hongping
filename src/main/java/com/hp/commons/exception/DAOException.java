package com.hp.commons.exception;

public class DAOException extends Exception{

	private static final long serialVersionUID = -5704021382639693161L;

	public DAOException() {
		super();
	}

	public DAOException(String message) {
		super(message);
	}

	public DAOException(Throwable cause) {
		super(cause);
	}

	public DAOException(String message, Throwable cause) {
		super(message, cause);
	}

}
