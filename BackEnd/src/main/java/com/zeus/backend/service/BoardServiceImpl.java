package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Notice;
import com.zeus.backend.mapper.BoardMapper;
import com.zeus.backend.mapper.NoticeMapper;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper mapper;

	@Override
	public void createNew(Notice notice) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void createReply(Notice notice) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Notice> list() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Notice read(int no) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void modify(Notice notice) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(int no) throws Exception {
		// TODO Auto-generated method stub
		
	}

	//답변글 작성
	//새글 작성
	
//	@Override
//	public void create(Notice notice) throws Exception {
//		mapper.create(notice);
//	}
//
//	@Override
//	public List<Notice> list() throws Exception {
//		return mapper.list();
//	}
//
//	@Override
//	public Notice read(int no) throws Exception {
//		//조회수 올리기
//		mapper.incrementReadCount(no);
//		return mapper.read(no);
//	}
//
//	@Override
//	public void modify(Notice notice) throws Exception {
//		mapper.modify(notice);
//
//	}
//
//	@Override
//	public void delete(int no) throws Exception {
//		mapper.delete(no);
//	}

}
