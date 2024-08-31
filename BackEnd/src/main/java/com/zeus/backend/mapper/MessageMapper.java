package com.zeus.backend.mapper;

import java.util.List;

import com.zeus.backend.domain.Message;

public interface MessageMapper {
	// 메시지 삽입
	public void create(Message message) throws Exception;

	// 전체 쪽지 목록 조회
	public List<Message> list() throws Exception;

	// 특정 사용자의 쪽지 목록 조회
	public List<Message> findByUserId(String user_id) throws Exception;

	// 특정 쪽지 조회
	public Message read(int message_id) throws Exception;

	// 쪽지를 읽음 상태로 업데이트
	public void updateRead(int ref) throws Exception;

	// 쪽지 삭제
	public void deleteById(int message_id) throws Exception;

	// 특정 사용자가 받은 모든 쪽지 삭제
	public void deleteByUserId(String user_id) throws Exception;

	// message_id의 최댓값
	public Integer maxMessageId() throws Exception;

	// 안읽은 쪽지 갯수
	public int msgCountNotRead(String user_id) throws Exception;

	// 쪽지 검색
	public List<Message> search(String search, String user_id) throws Exception;
}
