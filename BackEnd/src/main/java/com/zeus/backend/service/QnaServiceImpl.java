package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Qna;
import com.zeus.backend.mapper.QnaMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

	@Autowired
	private QnaMapper mapper;

	@Override
	public void createByMngr(Qna qna) throws Exception {
		qna.setQora(2);	//답변
		qna.setReply(1); //답변 여부
		mapper.create(qna);
	}

	@Override
	public void createByUser(Qna qna) throws Exception {
		qna.setQora(1);
		qna.setGroup_id(mapper.maxGroupId());
		mapper.create(qna);
	}

	@Override
	public List<Qna> listAll() throws Exception {
		return mapper.listAll();
	}

	@Override
	public List<Qna> listByUser(String user_id) throws Exception {
		return mapper.listByUser(user_id);
	}

	@Override
	public int countAll() throws Exception {
		return mapper.countAll();
	}

	@Override
	public int countByUser(String user_id) throws Exception {
		return mapper.countByUser(user_id);
	}

	@Override
	public Qna read(int qna_id) throws Exception {
		return mapper.read(qna_id);
	}

	@Override
	public void delete(int qna_id) throws Exception {
		mapper.delete(qna_id);
	}

	@Override
	public void modify(Qna qna) throws Exception {
		mapper.modify(qna);
	}

}
