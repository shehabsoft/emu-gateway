package com.mycompany.myapp.config;

import com.mycompany.myapp.gateway.accesscontrol.AccessControlFilter;
import com.mycompany.myapp.gateway.responserewriting.SwaggerBasePathRewritingFilter;
import io.github.jhipster.config.JHipsterProperties;
import org.springframework.cloud.netflix.zuul.filters.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class GatewayConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Configuration
    public static class SwaggerBasePathRewritingConfiguration {

        @Bean
        public SwaggerBasePathRewritingFilter swaggerBasePathRewritingFilter() {
            return new SwaggerBasePathRewritingFilter();
        }
    }

    @Configuration
    public static class AccessControlFilterConfiguration {

        @Bean
        public AccessControlFilter accessControlFilter(RouteLocator routeLocator, JHipsterProperties jHipsterProperties) {
            return new AccessControlFilter(routeLocator, jHipsterProperties);
        }
    }
}
