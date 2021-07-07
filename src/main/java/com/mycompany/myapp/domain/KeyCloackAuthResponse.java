package com.mycompany.myapp.domain;

/**
 * Copyright 2021-2022 By Dirac Systems.
 * <p>
 * Created by {@khalid.nouh on 16/6/2021}.
 */

public class KeyCloackAuthResponse {
    private String access_token;
    private double expires_in;
    private double refresh_expires_in;
    private String token_type;
    private String scope;

    @Override
    public String toString() {
        return (
            "KeyCloackResponse{" +
            "access_token='" +
            access_token +
            '\'' +
            ", expires_in=" +
            expires_in +
            ", refresh_expires_in=" +
            refresh_expires_in +
            ", token_type='" +
            token_type +
            '\'' +
            ", scope='" +
            scope +
            '\'' +
            '}'
        );
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public double getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(double expires_in) {
        this.expires_in = expires_in;
    }

    public double getRefresh_expires_in() {
        return refresh_expires_in;
    }

    public void setRefresh_expires_in(double refresh_expires_in) {
        this.refresh_expires_in = refresh_expires_in;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
}
