package com.zeus.backend.mapper;

import java.util.List;

import com.zeus.backend.domain.Notification;

public interface NotificationMapper {
	// 알림 삽입
	public void create(Notification notification) throws Exception;

	// 전체 알림 목록 조회
	public List<Notification> list() throws Exception;

	// 특정 사용자의 쪽지 목록 조회
	public List<Notification> getNotificationByUserId(String user_id) throws Exception;

	// 특정 알림 조회
	public Notification read(int notifications_id) throws Exception;

	// 알림 수정
	public void update(Notification notification) throws Exception;

	// 알림 읽음 상태로 업데이트
	public void updateRead(int notifications_id) throws Exception;

	// 알림 삭제
	public void deleteById(int notifications_id) throws Exception;

	// 특정 사용자가 받은 모든 알림 삭제
	public void deleteByUserId(String user_id) throws Exception;

}
