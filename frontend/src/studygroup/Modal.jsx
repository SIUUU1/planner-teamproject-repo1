const Modal =({ group, onClose })=>{
  if (!group) return null; // 그룹이 선택되지 않으면 모달을 표시하지 않음

  const handleJoinGroup = () => {
    console.log("그룹에 가입되었습니다!");  // 여기서 그룹 가입 로직을 구현하거나 다른 처리를 가능
    onClose();  // 가입 후 모달을 닫을 수 있음.
  };

  const formatModalContent = (content) => {
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, index) => line === '---' ? <hr key={index} /> : <p key={index}>{line}</p>);
  };

  return(
    <>
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>X</button>
        <h1>{group.group_name}</h1>
        <hr />
        <div>{group.group_notice ? formatModalContent(group.group_notice) : '기본 모달 내용'}</div> {/* Display custom content */}
        <button className="joinButton" onClick={handleJoinGroup}>그룹 가입</button>
        <button className="cancelButton" onClick={onClose}>취소</button>
      </div>
    </div>
    </>
  );
};
export default Modal;