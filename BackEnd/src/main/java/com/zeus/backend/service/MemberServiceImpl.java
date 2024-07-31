package com.zeus.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zeus.backend.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberMapper mapper;

	// 등록 처리
	@Transactional
	@Override
	public void register(Map<String, Object> map) throws Exception {
		// 회원권한 부여
		map.put("authority", "ROLE_MEMBER");
		mapper.create(map);
	}

	// 목록 페이지
	@Override
	public List<Map<String, Object>> list() throws Exception {
		return mapper.list();
	}

	// 상세 페이지
	@Override
	public Map<String, Object> read(int user_no) throws Exception {
		return mapper.read(user_no);
	}

	// 수정 처리
	@Transactional
	@Override
	public void modify(Map<String, Object> map) throws Exception {
		// 회원프로필 수정
		mapper.update(map);

		// 회원권한 수정
		int user_no = (int) map.get("user_no");

		// 회원권한 삭제
		mapper.deleteAuth(user_no);

		List<Map<String, Object>> authList = (List<Map<String, Object>>) map.get("authorities");
		for (int i = 0; i < authList.size(); i++) {
			String auth = (String) authList.get(i).get("authority");

			if (auth == null) {
				continue;
			}
			if (auth.trim().length() == 0) {
				continue;
			}
			// 변경된 회원권한 추가
			authList.get(i).put("user_no", user_no);
			mapper.modifyAuth(authList.get(i));
		}
	}

	// 삭제 처리
	@Transactional
	@Override
	public void remove(int user_no) throws Exception {
		// 회원 권한 삭제
		mapper.deleteAuth(user_no);
		mapper.delete(user_no);
	}

	// 회원 테이블의 데이터 건수를 반환한다.
	@Override
	public int countAll() throws Exception {
		return mapper.countAll();
	}

	// 이메일 중복 조회한다.
	@Override
	public int checkEmail(String user_email) throws Exception {
		return mapper.checkEmail(user_email);
	}

	// 복구 이메일 조회
	@Override
	public int checkRestoreEmail(String restore_email) throws Exception{
		return mapper.checkEmail(restore_email);
	}

	// 최초 관리자를 생성한다.
	@Transactional
	@Override
	public void setupAdmin(Map<String, Object> map) throws Exception {
		// 회원 권한 생성
		map.put("authority", "ROLE_ADMIN");
		mapper.create(map);
	}
	
	// 이메일로 패스워드 재설정
	@Transactional
	@Override
	public void updatePw(String user_password) throws Exception {
		mapper.updatePw(user_password);
	}
	
	// 복구 이메일로 이메일 아이디 보여주기
	@Override
	public String selectEmail(String restore_email) throws Exception {
		return mapper.selectEmail(restore_email);
	}
}