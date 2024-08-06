package com.zeus.backend.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.ObjectUtils;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.zeus.backend.domain.UserOauth;
import com.zeus.backend.security.auth.PrincipalDetails;
import com.zeus.backend.security.auth.PrincipalDetailsService;
import com.zeus.backend.security.auth.PrincipalOAuth2UserService;
import com.zeus.backend.service.UserOauthService;
import com.zeus.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserService userService,
			JwtService jwtService, UserOauthService userOauthService, PrincipalDetailsService principalDetailsService,
			PrincipalOAuth2UserService principalOAuth2UserService) {
		super(authenticationManager);
		this.jwtService = jwtService;
		this.userService = userService;
		this.userOauthService = userOauthService;
		this.principalDetailsService = principalDetailsService;
		this.principalOAuth2UserService = principalOAuth2UserService;
	}

	private final JwtService jwtService;
	private final UserOauthService userOauthService;
	private final PrincipalDetailsService principalDetailsService;
	private final UserService userService;
	private final PrincipalOAuth2UserService principalOAuth2UserService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("=====================================");
		System.out.println("JwtAuthorizationFilter 시작");
		/* (1) */
		String accessToken = jwtService.resolveCookie(request);
		String refreshToken = null;
		String user_id = null;
		System.out.println("accessToken : " + accessToken);
		/* (2) */
		// access 토큰 검증
		try {
			if (StringUtils.isNotBlank(accessToken) && jwtService.validateToken(accessToken)) {
				// 스프링 시큐리티로 권한 처리를 위해 세션을 넣어줌
				Authentication auth = this.getAuthentication(accessToken);
				System.out.println("세션 추가");
				SecurityContextHolder.getContext().setAuthentication(auth);
			} // access 토큰만료시 refresh 토큰 가져오기
				// TODO : 리프레시 토큰 가져와서 검증하기 & ACCESS 토큰 새로 발급해주기
			/* (3) */
		} catch (TokenExpiredException e) {
			System.out.println("access 토큰 만료됨");
			user_id = jwtService.getClaimFromExpiredToken(accessToken, "user_id"); // 만료된 토큰에서 유저네임 클레임 추출
			System.out.println("access 토큰 검증 username : " + user_id);
			UserOauth userOauth = null;
			try {
				userOauth = userOauthService.findUserOauthByUserId(user_id);
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			if (!ObjectUtils.isEmpty(userOauth)) {
				refreshToken = userOauth.getRefresh_token(); // db에서 유저네임으로 리프레시 토큰 가져오기
				System.out.println("userOauth.getUser_id() : " + userOauth.getUser_id());
				System.out.println("refreshToken : " + refreshToken);
			}
		} catch (Exception e) {
			SecurityContextHolder.clearContext();
			System.out.println("JwtAuthorizationFilter internal error " + e.getMessage());
			return;
		}
		/* (4) */
		// refresh 토큰으로 access 토큰 발급
		if (StringUtils.isNotBlank(refreshToken)) {
			try {
				try {
					if (jwtService.validateToken(refreshToken)) {
						Authentication auth = this.getAuthentication(refreshToken);
						SecurityContextHolder.getContext().setAuthentication(auth);

						// 새로운 accessToken 발급
						String newAccessToken = jwtService.createToken(user_id).getAccessToken();
						// 쿠키에 넣어줌
						jwtService.createCookie(response, newAccessToken);
					}
				} catch (TokenExpiredException e) {
					System.out.println("JWT token expired : " + e.getMessage());
				}
			} catch (Exception e) {
				SecurityContextHolder.clearContext();
				System.out.println("JwtAuthorizationFilter internal error " + e.getMessage());
				return;
			}
		}

		filterChain.doFilter(request, response);
	}

	/* (5) */
	public Authentication getAuthentication(String token) {
		System.out.println("getAuthentication username");
		String user_id = jwtService.getClaim(token, "user_id");
		PrincipalDetails userDetails=null;
		
		try {
			userDetails = (PrincipalDetails) principalDetailsService.loadUserByUsername(user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if (userDetails == null) {
			try {
				userDetails = principalOAuth2UserService.loadUserByUsername(user_id);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
