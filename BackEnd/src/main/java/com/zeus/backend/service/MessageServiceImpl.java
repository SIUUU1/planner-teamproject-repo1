package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Message;
import com.zeus.backend.mapper.MessageMapper;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageMapper mapper;

	@Override
	public void create(Message message) throws Exception {
		mapper.create(message);
	}

	@Override
	public List<Message> findByUserId(String receiver_id) throws Exception {
		return mapper.findByUserId(receiver_id);
	}

	@Override
	public List<Message> findByReceiverId(Map<String, Object> map) throws Exception {
		return mapper.findByReceiverId(map);
	}

	@Override
	public void updateRead(int message_id) throws Exception {
		mapper.updateRead(message_id);
	}

	@Override
	public void deleteById(int message_id) throws Exception {
		mapper.deleteById(message_id);
	}

	@Override
	public void deleteByReceiverId(String receiver_id) throws Exception {
		mapper.deleteByReceiverId(receiver_id);
	}

}
