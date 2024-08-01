import React, { useState, useEffect } from 'react';
import useLoading from "../util/useLoading";

const EmojiItem = ({ emoji_item_url, customHeight, customWidth }) => {
  const { data, loading, error } = useLoading(emoji_item_url, 'image');
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (data && data instanceof Blob) {
      const imageUrl = URL.createObjectURL(data);
      setImageSrc(imageUrl);

      // 컴포넌트가 언마운트될 때 객체 URL을 해제하기 위한 정리 함수
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [data]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }


  // 이미지 크기 설정
  const imgStyle = {
    height: customHeight || 'auto', // customHeight가 없으면 'auto'로 설정
    width: customWidth || 'auto' // customWidth가 없으면 'auto'로 설정
  };

  return (
    <div className="emojiItem">
      {imageSrc && <img src={imageSrc} style={imgStyle} alt="Emoji" />}
    </div>
  );
};

export default EmojiItem;