package com.zeus.backend.service;

import java.util.List;

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
		int number = 0;

		// 가장 최근 num 값을 가져온다.
		Integer maxNo = mapper.maxMessageId();
		if (maxNo != null) {
			number = maxNo + 1;
		} else {
			number = 1;
		}

		message.setRef(number);

		// 보낸이 쪽지함
		message.setUser_id(message.getSender_id());
		mapper.create(message);
		
		if (!message.getSender_id().equals(message.getReceiver_id())) { // 내게 보내기할 때 두 번 등록하지 않는다.
			// 받는이 쪽지함
			maxNo = mapper.maxMessageId();
			number = maxNo;

			message.setUser_id(message.getReceiver_id());
			mapper.create(message);
		}
		
	}

	@Override
	public List<Message> findByUserId(String user_id) throws Exception {
		return mapper.findByUserId(user_id);
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
	public List<Message> list() throws Exception {
		return mapper.list();
	}

	@Override
	public void deleteByReceiverId(String user_id) throws Exception {
		mapper.deleteByUserId(user_id);
	}

	@Override
	public List<Message> search(String search, String user_id) throws Exception {
		search = "%" + search + "%";
		return mapper.search(search, user_id);
	}

	@Override
	public Message read(int message_id) throws Exception {
		return mapper.read(message_id);
	}

}
