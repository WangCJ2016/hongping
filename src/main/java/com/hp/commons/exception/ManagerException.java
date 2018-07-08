package com.hp.commons.exception;

public class ManagerException extends Exception {

	private static final long serialVersionUID = 2995820710343651815L;

	private String code;

	public ManagerException(){

	}

	public ManagerException(String code, String message, Throwable cause){
		super(message, cause);
		this.setCode(code);
	}

	public ManagerException(String code, String message){
		super(message);
		this.setCode(code);
	}

	public ManagerException(Throwable cause){
		super(cause);
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
