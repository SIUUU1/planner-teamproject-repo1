package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.NotificationMsg;
import com.zeus.backend.mapper.NotificationMsgMapper;

@Service
public class NotificationMsgServiceImpl implements NotificationMsgService {

	@Autowired
	NotificationMsgMapper notificationMsgMapper;

	@Override
	public void create(NotificationMsg notificationMsg) throws Exception {
		notificationMsgMapper.create(notificationMsg);
	}

	@Override
	public List<NotificationMsg> list() throws Exception {
		return notificationMsgMapper.list();
	}

	@Override
	public NotificationMsg read(String type) throws Exception {
		return notificationMsgMapper.read(type);
	}

	@Override
	public void delete(int notificationmsg_id) throws Exception {
		notificationMsgMapper.delete(notificationmsg_id);
	}

	@Override
	public void update(NotificationMsg notificationMsg) throws Exception {
		notificationMsgMapper.update(notificationMsg);
	}

}
