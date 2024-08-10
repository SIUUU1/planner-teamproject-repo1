package com.zeus.backend.chat.controller;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zeus.backend.chat.service.ChatMessageService;
import com.zeus.backend.chat.service.ChatRoomMemberService;
import com.zeus.backend.chat.service.ChatRoomService;
import com.zeus.backend.domain.ChatMessage;
import com.zeus.backend.domain.ChatRoom;
import com.zeus.backend.domain.ChatRoomMember;
import com.zeus.backend.domain.User;
import com.zeus.backend.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

	@Autowired
	private ChatRoomService chatRoomService;

	@Autowired
	private ChatMessageService chatMessageService;

	@Autowired
	private UserServiceImpl userServiceImpl;

	@Autowired
	private ChatRoomMemberService chatRoomMemberService;

	@PostMapping("/create-room")
	public ResponseEntity<String> createChatRoom(HttpServletRequest request, @RequestBody ChatRoom roomRequest) {
		System.out.println("==================");
		System.out.println("start create chat room");
		System.out.println("room name:" + roomRequest.getRoom_name());

		User user = null;
		try {
			user = userServiceImpl.read();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (user == null) {
			return ResponseEntity.status(499).build(); // 499 Custom Unauthorized
		}
		String creator = user.getUser_id();
		System.out.println("creator:" + creator);

		String clientIp = null;
		try {
			Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();
			while (networkInterfaces.hasMoreElements()) {
				NetworkInterface networkInterface = networkInterfaces.nextElement();
				Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
				while (inetAddresses.hasMoreElements()) {
					InetAddress inetAddress = inetAddresses.nextElement();
					if (inetAddress.isSiteLocalAddress()) {
						clientIp = inetAddress.getHostAddress();
						System.out.println("내부 IP 주소: " + clientIp);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 방 생성 처리 후 방 URL 반환
		String roomUrl = chatRoomService.createChatRoom(roomRequest, creator, clientIp);
		return ResponseEntity.ok(roomUrl); // 방 URL 반환
	}

	@GetMapping("/rooms")
	public List<ChatRoom> getAllChatRooms() {
		return chatRoomService.getAllChatRooms();
	}
	
	@PostMapping("/myRooms")
	public List<ChatRoom> getMyChatRooms(@RequestBody User user) {
		return chatRoomService.getMyChatRooms(user.getUser_id());
	}
	@PostMapping("/settingMyRoom")
	public List<ChatRoom> getChatRoomsByCreater(@RequestBody User user) {
		return chatRoomService.getChatRoomsByCreater(user.getUser_id());
	}

	@GetMapping("/room/{room_id}")
	public ChatRoom getChatRoomById(@PathVariable String room_id) {
		return chatRoomService.getChatRoomById(room_id);
	}

	@PostMapping("/message")
	public ResponseEntity<String> saveChatMessage(@RequestBody ChatMessage chatMessage) {
		System.out.println("========================");
		System.out.println("sart save message");
		try {
			chatMessageService.saveMessage(chatMessage);
			return ResponseEntity.ok("Message saved successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save message");
		}
	}

	// 특정 채팅방의 모든 메시지
	@GetMapping("/room/{room_id}/messages")
	public ResponseEntity<List<ChatMessage>> getMessagesByRoomId(@PathVariable("room_id") String roomId) {
		try {
			List<ChatMessage> messages = chatMessageService.getMessagesByRoomId(roomId);
			return ResponseEntity.ok(messages);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}

	// 채팅 방에 맴버 추가
	@PostMapping("/room/joinMembers")
	public ResponseEntity<String> addMemberToRoom(@RequestBody ChatRoomMember chatRoomMember) {
		System.out.println("===========================");
		System.out.println("Adding member to room");
		try {
			chatRoomMemberService.addMemberToRoom(chatRoomMember);
			return ResponseEntity.ok("Member added to room.");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add member to room.");
		}
	}
	
	
	@PostMapping("/update-room")
	public ResponseEntity<String> updateChatRoom(@RequestBody ChatRoom roomRequest) {
		System.out.println("========================");
		System.out.println("sart updateChatRoom");
		try {
			chatRoomService.updateChatRoom(roomRequest);
			return ResponseEntity.ok("chat room update successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update chat rooom");
		}
	}
	
	@PostMapping("/delete-room")
	public ResponseEntity<String> deleteChatRoom(@RequestBody ChatRoom roomRequest) {
		System.out.println("========================");
		System.out.println("sart deleteChatRoom");
		System.out.println("room id: "+roomRequest.getRoom_id());
		try {
			chatRoomService.deleteChatRoom(roomRequest.getRoom_id());
			return ResponseEntity.ok("chat room delete successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete chat rooom");
		}
	}

}