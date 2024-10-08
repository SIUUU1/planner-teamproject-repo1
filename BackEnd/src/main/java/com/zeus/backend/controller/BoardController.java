package com.zeus.backend.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import com.zeus.backend.domain.Board;
import com.zeus.backend.domain.Notification;
import com.zeus.backend.service.BoardService;
import com.zeus.backend.service.NotificationService;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/board")
public class BoardController {

	@Autowired
	private BoardService boardService;

	@Autowired
	private NotificationService notificationService;

	// 게시판 리스트
	@GetMapping("/list")
	public ResponseEntity<List<Board>> getBoardList() {
		System.out.println("getBoardList");
		List<Board> boardList = null;
		try {
			boardList = boardService.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(boardList);
		}
		return new ResponseEntity<>(boardList, HttpStatus.OK);
	}

	// 게시판 상세보기(수정 시 사용)
	@GetMapping("/read/{no}")
	public ResponseEntity<Board> getBoard(@PathVariable int no) {
		System.out.println("getBoard no:" + no);
		Board board = null;
		try {
			board = boardService.read(no);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(board);
		}
		return new ResponseEntity<>(board, HttpStatus.OK);
	}

	// 조회수 올리기
	@GetMapping("/readCount/{no}")
	public ResponseEntity<?> incrementReadCount(@PathVariable int no) {
		System.out.println("readCount no:" + no);
		try {
			boardService.incrementReadCount(no);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail to increment readCount");
		}
		return new ResponseEntity<>("success to increment readCount", HttpStatus.OK);
	}

	// 게시판 등록
	@Transactional
	@PostMapping("/insert")
	public ResponseEntity<?> insert(@RequestParam Map<String, Object> map,
			@RequestParam(name = "img", required = false) MultipartFile img, HttpServletRequest request)
			throws Exception {
		log.info("insert map.toString()=" + map.toString());

		String filename = null;
		if (img != null && !img.isEmpty()) {
			log.info("insert img =" + img.getOriginalFilename());
			filename = img.getOriginalFilename();
			try {
				ServletContext application = request.getSession().getServletContext();
				String path = application.getRealPath("/static/images/board/");
				img.transferTo(new File(path + filename));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			int no = Integer.parseInt(String.valueOf(map.get("no")));
			filename = boardService.filename(no);
		}
		map.put("filename", filename);
		try {
			boardService.createNew(map);
			return ResponseEntity.ok("Board insert successfully");
		} catch (Exception e) {
			log.error("Error inserting Board", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Board");
		}
	}

	// 게시판 댓글 등록
	@Transactional
	@PostMapping("/insert/comment")
	public ResponseEntity<?> insertComment(@RequestParam Map<String, Object> map, HttpServletRequest request)
			throws Exception {
		log.info("insertComment map.toString()=" + map.toString());
		map.put("filename", null);
		try {
			boardService.createNew(map);

			// 게시글 원글 작성자 아이디 찾기
			Board board = boardService.readByRef(Integer.parseInt(String.valueOf(map.get("ref"))));

			// 게시글 댓글 등록 알림 보내기
			if(!board.getUser_id().equals(String.valueOf(map.get("user_id")))) { //본인 작성 제외
				Notification notification = new Notification();
				notification.setUser_id(board.getUser_id());
				notification.setType("BoardComment");
				notification.setLink("/boarddetail/"+String.valueOf(map.get("ref")));
				notificationService.create(notification);
			}
			
			return ResponseEntity.ok("Board insert successfully");
			
		} catch (Exception e) {
			log.error("Error inserting Board", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting Board");
		}
	}

	// 게시판 댓글수정
	@Transactional
	@PostMapping("/update/comment")
	public ResponseEntity<?> updateComment(@RequestParam Map<String, Object> map, HttpServletRequest request)
			throws Exception {
		log.info("updateComment map.toString()=" + map.toString());
		map.put("filename", null);
		try {
			boardService.modify(map);
			return ResponseEntity.ok("Board updateComment successfully");
		} catch (Exception e) {
			log.error("Error updateComment Board", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updateComment Board");
		}
	}

	// 게시판 댓글삭제
	@Transactional
	@PostMapping("/delete/comment")
	public ResponseEntity<?> deleteComment(@RequestBody Map<String, Object> payload, HttpServletRequest request)
			throws Exception {
		log.info("deleteComment payload.toString()=" + payload.toString());
		String noString = String.valueOf(payload.get("no"));
		int no;
		try {
			no = Integer.parseInt(noString);
		} catch (NumberFormatException e) {
			log.error("Invalid 'no' format: " + noString, e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid 'no' format.");
		}

		try {
			boardService.delete(no);
			return ResponseEntity.ok("board comment remove successfully");
		} catch (Exception e) {
			log.error("Error removing board", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing board comment");
		}
	}

	// 게시판 수정
	@Transactional
	@PostMapping("/update")
	public ResponseEntity<?> update(@RequestParam Map<String, Object> map,
			@RequestParam(name = "img", required = false) MultipartFile img, HttpServletRequest request)
			throws Exception {

		log.info("update map.toString()=" + map.toString());
		String filename = null;
		if (img != null && !img.isEmpty()) {
			log.info("update img =" + img.getOriginalFilename());
			filename = img.getOriginalFilename();
			try {
				ServletContext application = request.getSession().getServletContext();
				String path = application.getRealPath("/static/images/board/");
				img.transferTo(new File(path + filename));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			int no = Integer.parseInt(String.valueOf(map.get("no")));
			filename = boardService.filename(no);
		}
		map.put("filename", filename);
		try {
			boardService.modify(map);
			return ResponseEntity.ok("Board updated successfully");
		} catch (Exception e) {
			log.error("Error updating Board", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating Board");
		}

	}

	// 게시판 삭제
	@Transactional
	@PostMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody Map<String, Object> payload, HttpServletRequest request)
			throws NumberFormatException, Exception {
		String noString = String.valueOf(payload.get("no"));
		int no;
		try {
			no = Integer.parseInt(noString);
		} catch (NumberFormatException e) {
			log.error("Invalid 'no' format: " + noString, e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid 'no' format.");
		}
		System.out.println("delete board:" + no);

		String filename = boardService.filename(no);
		if (filename != null && !filename.equals("-")) {
			ServletContext application = request.getSession().getServletContext();
			String path = application.getRealPath("/static/images/board/");
			File file = new File(path + filename);
			if (file.exists()) {
				file.delete();
			}
		}
		try {
			boardService.delete(no);
			return ResponseEntity.ok("board remove successfully");
		} catch (Exception e) {
			log.error("Error removing board", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing board");
		}
	}

	// 게시판 검색
	@PostMapping("/search")
	public ResponseEntity<List<Board>> searchBoard(
			@RequestParam(name = "category", defaultValue = "study") String category,
			@RequestParam(name = "search", defaultValue = "") String search) {

		System.out.println("searchBoard");
		System.out.println("category:" + category);
		System.out.println("search:" + search);
		List<Board> boardList = null;

		try {
			boardList = boardService.search(search, category);
			log.info("boardList" + boardList.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(boardList);
		}
		return new ResponseEntity<>(boardList, HttpStatus.OK);
	}

	// 파일 다운로드
	@GetMapping("/download/{filename}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
		System.out.println("filename" + filename);
		try {
			// 파일을 클래스패스 내에서 찾음
			File file = ResourceUtils.getFile("src/main/webapp/static/images/board/" + filename);
			Path filePath = file.toPath().normalize();
			Resource resource = new UrlResource(filePath.toUri());

			if (!resource.exists()) {
				System.out.println("File not found: " + filename);
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
			// 캐시 무효화를 위해 Cache-Control 헤더 추가
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.CONTENT_DISPOSITION,
					"attachment; filename=\"" + UriUtils.encode(resource.getFilename(), "UTF-8") + "\"");
			headers.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
			headers.add(HttpHeaders.PRAGMA, "no-cache");
			headers.add(HttpHeaders.EXPIRES, "0");

			return ResponseEntity.ok().headers(headers).body(resource);

		} catch (MalformedURLException e) {
			System.out.println("MalformedURLException: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} catch (FileNotFoundException e) {
			System.out.println("FileNotFoundException: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} catch (Exception e) {
			System.out.println("Exception: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}