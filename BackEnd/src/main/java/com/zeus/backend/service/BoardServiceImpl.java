package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Board;
import com.zeus.backend.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper mapper;

	// 게시글 및 댓글 작성
	@Override
	public void createNew(Map<String, Object> map) throws Exception {
		int no = Integer.parseInt(String.valueOf(map.get("no")));
		int ref = Integer.parseInt(String.valueOf(map.get("ref")));
		int step = Integer.parseInt(String.valueOf(map.get("step")));
		int depth = Integer.parseInt(String.valueOf(map.get("depth")));
		int number = 0;

		// 가장 최근 num 값을 가져온다.
		Integer maxNo = mapper.maxNo();
		if (maxNo != null) {
			number = maxNo;
		} else {
			number = 1;
		}

		if (no != 0) { // 댓글인 경우(사용자 등)
			Board board = new Board();
			board.setRef(ref);
			board.setStep(step);
			mapper.modifyReply(board);

			step += 1;
			depth += 1;
			map.put("subject", "re: " + map.get("subject"));
		} else {// 새글인 경우(관리자)
			ref = number;
			step = 0;
			depth = 0;
		}

		map.put("ref", ref);
		map.put("step", step);
		map.put("depth", depth);
		mapper.create(map);
		System.out.println("createBoard" + map.toString());

	}

	@Override
	public List<Board> list() throws Exception {
		return mapper.list();
	}

	@Override
	public Board read(int no) throws Exception {
		return mapper.read(no);
	}

	@Override
	public void modify(Map<String, Object> map) throws Exception {
		mapper.modify(map);
	}

	@Override
	public void delete(int no) throws Exception {
		mapper.delete(no);
	}

	@Override
	public void incrementReadCount(int no) throws Exception {
		mapper.incrementReadCount(no);
	}

	// 검색
	@Override
	public List<Board> search(String search, String category) throws Exception {
		search = "%" + search + "%";
		if (category.equals("all")) {
			return mapper.search(search);
		} else {
			return mapper.searchByCategory(search, category);
		}
	}

	@Override
	public String filename(int no) throws Exception {
		return mapper.filename(no);
	}

	@Override
	public Board readByRef(int ref) throws Exception {
		return mapper.readByRef(ref);
	}

}
