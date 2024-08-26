package com.zeus.backend.service;

import java.util.List;

import com.zeus.backend.domain.NotificationMsg;

public interface NotificationMsgService {
	// 해당 타입의 알림 내용 삽입
	public void create(NotificationMsg notificationMsg) throws Exception;

	// 전체 목록 조회
	public List<NotificationMsg> list() throws Exception;

	// 특정 타입의 알림 내용 조회
	public NotificationMsg read(String type) throws Exception;

	// 특정 타입의 알림 내용 삭제
	public void delete(int notificationmsg_id) throws Exception;

	// 특정 타입의 알림 내용 수정
	public void update(NotificationMsg notificationMsg) throws Exception;
}
