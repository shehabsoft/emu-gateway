package com.mycompany.myapp.domain;

/**
 * Copyright 2021-2022 By Dirac Systems.
 * <p>
 * Created by {@khalid.nouh on 16/6/2021}.
 */

public class KeyCloackAuthRequest {
    private String granType;
    private String clientSecret;
    private String clientId;
    private String userName;
    private String password;

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public KeyCloackAuthRequest() {}

    public String getGranType() {
        return granType;
    }

    public void setGranType(String granType) {
        this.granType = granType;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public String getClientId() {
        return clientId;
    }
}
