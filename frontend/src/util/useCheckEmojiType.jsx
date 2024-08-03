import { useMemo } from 'react';
//커스텀 이모지 인지 기본 이모지 인지 검사해서 해당 url를 찾아주는 커스텀 훅
const useCheckEmojiType = (data, emojiData) => {
  const { emoji_item_url, emoji_item_no } = data;

  const computedEmojiItemUrl = useMemo(() => {

    if (emoji_item_url === null && emoji_item_no !== null) { //커스텀 이모지인 경우
      const foundItem = emojiData.find(e => e.emoji_item_no === emoji_item_no);
      return foundItem ? foundItem.emoji_item_url : null;
    } else if (emoji_item_url !== null && emoji_item_no === null) { //기본 이모지 인 경우
      return emoji_item_url;
    }
    return null;
  }, [emojiData, emoji_item_url, emoji_item_no]);

  return computedEmojiItemUrl;
};

export default useCheckEmojiType;
