package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Notice;
import com.zeus.backend.mapper.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeMapper mapper;

	// 공지사항 및 댓글 작성
	@Override
	public void createNew(Notice notice) throws Exception {
		int no = notice.getNo();
		int ref = notice.getRef();
		int step = notice.getStep();
		int depth = notice.getDepth();
		int number = 0;
		
		Integer maxNo = mapper.maxNo();
		if (maxNo != null) {
			number = maxNo + 1;
		} else {
			number = 1;
		}

		if (no != 0) { // 댓글인 경우(사용자 등)
			mapper.modifyReply(notice);
			step = step + 1;
			depth = depth + 1;
		} else {// 새글인 경우(관리자)
			ref = number;
			step = 0;
			depth = 0;
		}

		notice.setRef(ref);
		notice.setStep(step);
		notice.setDepth(depth);
		mapper.create(notice);
	}

	
	@Override
	public List<Notice> list() throws Exception {
		return mapper.list();
	}

	@Override
	public Notice read(int no) throws Exception {
		mapper.incrementReadCount(no);
		return mapper.read(no);
	}

	@Override
	public void modify(Notice notice) throws Exception {
		notice.setRead_count(notice.getRead_count()-1);
		mapper.modify(notice);
	}

	@Override
	public void delete(int no) throws Exception {
		mapper.delete(no);
	}

}
