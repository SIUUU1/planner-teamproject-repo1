package com.zeus.backend.security.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.User;
import com.zeus.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PrincipalDetailsService implements UserDetailsService {
	private final UserService userService;

	@Override
	public UserDetails loadUserByUsername(String user_id) throws UsernameNotFoundException {
		System.out.println("================================");
		System.out.println("PrincipalDetailsService user_id : " + user_id);
		System.out.println("user_id : " + user_id);
		User user = null;
		try {
			user = userService.findByUserId(user_id);
			System.out.println("user_id : " + user_id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			System.out.println("user_id : not found");
			throw new UsernameNotFoundException("ID : " + user_id + " not found.");
		}
		System.out.println("User Entity : " + user.toString());
		return new PrincipalDetails(user);
	}
}
