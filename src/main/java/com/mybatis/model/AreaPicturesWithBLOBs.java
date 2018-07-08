package com.mybatis.model;

public class AreaPicturesWithBLOBs extends AreaPictures {
    private String picture;

    private String picturex;

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture == null ? null : picture.trim();
    }

    public String getPicturex() {
        return picturex;
    }

    public void setPicturex(String picturex) {
        this.picturex = picturex == null ? null : picturex.trim();
    }
}