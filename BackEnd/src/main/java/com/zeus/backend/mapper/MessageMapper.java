package com.zeus.backend.mapper;

import java.util.List;
import java.util.Map;

import com.zeus.backend.domain.Message;

public interface MessageMapper {
	// 메시지 삽입
	public void create(Message message) throws Exception;

	// 특정 사용자의 쪽지 목록 조회
	public List<Message> findByUserId(String receiver_id) throws Exception;

	// 특정 사용자의 특정 보낸이로부터 쪽지 목록 조회
	public List<Message> findByReceiverId(Map<String, Object> map) throws Exception;

	// 쪽지를 읽음 상태로 업데이트
	public void updateRead(int message_id) throws Exception;

	// 쪽지 삭제
	public void deleteById(int message_id) throws Exception;

	// 특정 사용자가 받은 모든 쪽지 삭제
	public void deleteByReceiverId(String receiver_id) throws Exception;
	
}
