package com.zeus.backend.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zeus.backend.domain.ChatRoom;


@Mapper
public interface ChatRoomMapper {

    // 채팅방 생성
    void createChatRoom(ChatRoom chatRoom);

    // 특정 채팅방 조회
    ChatRoom getChatRoomById(String room_id);

    // 모든 채팅방 조회
    List<ChatRoom> getAllChatRooms();

    //내 채팅방 조회
	List<ChatRoom> getMyChatRooms(String user_id);

	//방장인 채팅방 조회
	List<ChatRoom> getChatRoomsByCreater(String user_id);
	
	//채팅방 수정
	void updateChatRoom(ChatRoom room);

	//채팅방 삭제
	void deleteChatRoom(String room_id);
}