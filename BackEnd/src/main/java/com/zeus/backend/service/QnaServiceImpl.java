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
		//문의내역 답변 처리
		mapper.reply(qna.getGroup_id());
		
		//답변 등록
		qna.setQora(2);	//답변
		mapper.create(qna);
	}

	@Override
	public void createByUser(Qna qna) throws Exception {
		qna.setQora(1);
		Integer group_id = mapper.maxGroupId();
	    if (group_id == null) {
	    	qna.setGroup_id(1); // 기본값 설정
	    }else {
	    	qna.setGroup_id(++group_id);
	    }
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
		// 문의내역 삭제시 답변도 같이 삭제
		if(mapper.read(qna_id).getQora()==1) {
			mapper.deleteByGroupId(mapper.read(qna_id).getGroup_id());	
		}else { //답변 삭제시 답변만 삭제
			mapper.delete(qna_id);
		}
	}

	@Override
	public void modify(Qna qna) throws Exception {
		mapper.modify(qna);
	}

	@Override
	public Qna listByCategory(String category) throws Exception {
		return mapper.listByCategory(category);
	}

	@Override
	public Qna readByGroupId(int group_id) throws Exception {
		return mapper.readByGroupId(group_id);
	}

	@Override
	public Qna readByReply(int group_id) throws Exception {
		return mapper.readByReply(group_id);
	}

}
