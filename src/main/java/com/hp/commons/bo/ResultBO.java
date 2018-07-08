package com.hp.commons.bo;

import java.io.Serializable;

public class ResultBO implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 3207484677360279293L;
	private boolean success;
    private Object object;
    private String msg = "";

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

}
