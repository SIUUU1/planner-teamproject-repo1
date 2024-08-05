package com.zeus.backend.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.filter.CorsFilter;

import com.zeus.backend.domain.User;
import com.zeus.backend.security.auth.PrincipalDetails;
import com.zeus.backend.security.auth.PrincipalDetailsService;
import com.zeus.backend.security.auth.PrincipalOAuth2UserService;
import com.zeus.backend.security.jwt.JwtAuthenticationFilter;
import com.zeus.backend.security.jwt.JwtAuthorizationFilter;
import com.zeus.backend.security.jwt.JwtModel;
import com.zeus.backend.security.jwt.JwtService;
import com.zeus.backend.service.UserOauthService;
import com.zeus.backend.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/*  (1)  */
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {

	private final CorsFilter corsFilter;
	private final UserOauthService userOauthService;
	private final JwtService jwtService;
	private final UserService userService;
	private final PrincipalDetailsService principalDetailsService;
	private final PrincipalOAuth2UserService principalOAuth2UserService;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		/* (2) */
		http.csrf().disable().httpBasic().disable().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.cors();
		/* (3) */
		http.headers().cacheControl().disable().contentTypeOptions().disable().frameOptions().sameOrigin()
				.httpStrictTransportSecurity().disable().xssProtection().disable();

		/* role 주소 다시 설정할 것 */
		http.authorizeRequests().requestMatchers("/api/user/**").authenticated().requestMatchers("/api/mngr/**")
				.hasRole("MANAGER").requestMatchers("/api/pro/**").hasRole("PRO").anyRequest().permitAll();

		//실패시 url 추가할 것!
		http.formLogin().loginPage("/loginForm").loginProcessingUrl("/api/login").defaultSuccessUrl("/user", true);

		http.oauth2Login().loginPage("/loginForm").userInfoEndpoint()
				.userService(principalOAuth2UserService).and().successHandler(authenticationSuccessHandler());;

		/* (5) */
		http.logout().logoutUrl("/logout").deleteCookies(jwtService.getHEADER_NAME()).logoutSuccessUrl("/")
				.invalidateHttpSession(true);

		/* (6) */
		http.addFilter(corsFilter)
				.addFilter(new JwtAuthenticationFilter(authenticationManager(authenticationConfiguration),
						userOauthService, jwtService))
				.addFilter(new JwtAuthorizationFilter(authenticationManager(authenticationConfiguration), userService,
						jwtService, userOauthService, principalDetailsService,principalOAuth2UserService));

		return http.build();

	}

	/* (7) */
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return (request, response, authentication) -> {
			// PrincipalDetails에서 사용자 정보 가져오기
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            User user = principalDetails.getUser();

            // 첫 로그인 시 추가 정보 입력 페이지로 리디렉션
            if (user.isFirstLogin()) {
            	System.out.println("첫 로그인 시 추가 정보 입력 페이지로 리디렉션");
                response.sendRedirect("http://localhost:5173/joinform");
            } else {
                // JWT 생성 및 쿠키에 추가 수정 필요함
            	System.out.println("첫 로그인 아님");
            	
            	String user_id = user.getUser_id();
            	JwtModel jwt = jwtService.createToken(user_id);
                jwtService.createCookie(response, jwt.getAccessToken());
                
                try {
					userOauthService.deleteUserOauth(user_id);
					userOauthService.insertUserOauth(user_id, jwt);
				} catch (Exception e) {
					e.printStackTrace();
				}
                response.sendRedirect("http://localhost:5173/user");
            }
		};
	}

	// CustomAccessDeniedHandler를 정의하여 접근 거부 처리
	private static class CustomAccessDeniedHandler implements AccessDeniedHandler {
		@Override
		public void handle(HttpServletRequest request, HttpServletResponse response,
				AccessDeniedException accessDeniedException) throws IOException, ServletException {
			System.out.println("권한이 없는 경우 이동");
			response.sendRedirect("http://localhost:5173/welcome"); // 권한이 없는 경우 이동할 페이지
		}
	}


}
