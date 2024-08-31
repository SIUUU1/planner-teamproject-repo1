package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Notification;
import com.zeus.backend.domain.NotificationMsg;
import com.zeus.backend.mapper.NotificationMapper;
import com.zeus.backend.mapper.NotificationMsgMapper;

@Service
public class NotificationServiceImpl implements NotificationService {

	@Autowired
	NotificationMapper notificationMapper;

	@Autowired
	NotificationMsgMapper notificationMsgMapper;

	@Override
	public void create(Notification notification) throws Exception {

		// type에 따른 msg찾기
		NotificationMsg notifyMsg = notificationMsgMapper.read(notification.getType());

		// 그룹 알림의 경우 msg 수정후 notify content 삽입
		String content = notifyMsg.getContent();
		if (content.startsWith("Group")) {
			content = notification.getContent() + " " + content;
		}

		// notification insert
		notification.setContent(content);
		notificationMapper.create(notification);
	}

	@Override
	public void update(Notification notification) throws Exception {
		// type에 따른 msg찾기
		NotificationMsg notifyMsg = notificationMsgMapper.read(notification.getType());

		// 그룹 알림의 경우 msg 수정후 notify content 삽입
		String content = notifyMsg.getContent();
		if (content.startsWith("Group")) {
			content = notification.getContent() + " " + content;
		}

		// notification update
		notification.setContent(content);
		notificationMapper.update(notification);
	}

	@Override
	public List<Notification> list() throws Exception {
		return notificationMapper.list();
	}

	@Override
	public List<Notification> getNotificationByUserId(String user_id) throws Exception {
		return notificationMapper.getNotificationByUserId(user_id);
	}

	@Override
	public Notification read(int notifications_id) throws Exception {
		return notificationMapper.read(notifications_id);
	}

	@Override
	public void updateRead(int notifications_id) throws Exception {
		notificationMapper.updateRead(notifications_id);
	}

	@Override
	public void deleteById(int notifications_id) throws Exception {
		notificationMapper.deleteById(notifications_id);
	}

	@Override
	public void deleteByUserId(String user_id) throws Exception {
		notificationMapper.deleteByUserId(user_id);
	}

	@Override
	public int notifyCountNotRead(String user_id) throws Exception {
		return notificationMapper.notifyCountNotRead(user_id);
	}

}
