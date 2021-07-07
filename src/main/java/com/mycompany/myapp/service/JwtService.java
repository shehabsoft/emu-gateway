package com.mycompany.myapp.service;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.UrlJwkProvider;
import java.net.URL;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Copyright 2021-2022 By Dirac Systems.
 * <p>
 * Created by khalid.nouh on 16/6/2021.
 */

@Service
public class JwtService {
    @Value("${keycloak.jwk-set-uri}")
    private String jwksUrl;

    @Value("${keycloak.certs-id}")
    private String certsId;

    @Cacheable(value = "jwkCache")
    public Jwk getJwk() throws Exception {
        return new UrlJwkProvider(new URL(jwksUrl)).get(certsId);
    }
}
