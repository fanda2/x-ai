import { http_post, http_all } from "./request";

export function generateImages() {
  const allText = this.inputprompt + "," + buttonTextsWithGroup.join(",");

  axios
    .post("http://localhost:5000/generateimage", { textData: allText })
    .then((response) => {
      this.generatedImages = ["data:image/png;base64," + response.data.image];
      this.previousImages = this.generatedImages.slice();
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

//调用文生图接口
export const generateImage = async (allText) => {
  const response = await http_all("http://localhost:5000/generateimage", {
    textData: allText,
  });

  const image = "data:image/png;base64," + response.image;

  return {
    code: 200,
    data: {
      image,
    },
    msg: "success",
  };
};

//用户注册/登录
export const userLogin = async (id) => {
  return await http_post("login", "", { userNo: id });
};

//获取设计师发需求列表
export const getDesignList = async (designerId, classify) => {
  return await http_post("requestList", "", {
    designerId: designerId,
    classify: classify,
  });
};

//获取对应需求列表的消息
export const getMessigeList = async (requestId) => {
  return await http_post("messageList", "", {
    requestId: requestId,
  });
};
//查询图片列表
export const getImageList = async () => {
  return await http_post("imgList", "", {});
};

//与ai对话，发送内容哦那个
export const chatMessage = async (messages, requestId) => {
  console.log("dd", messages);
  return await http_post("chat", "", {
    messages: messages,
    requestId: requestId,
  });
};

//设计师发表内容createMessage
export const createMessage = async (requestId, message, designerId) => {
  return await http_post("createMessage", "", {
    requestId: requestId,
    message: message,
    designerId: designerId,
  });
};

// 添加需求
export const createRequest = async (
  creator,
  content,
  designerId,
  classify,
  preTags,
  preBadTags,
  allowTime
) => {
  return await http_post("request", "", {
    creator,
    content,
    designerId: Number(designerId),
    classify,
    preTags,
    preBadTags,
    allowTime,
  });
};

// 任意回复
export const createMessageAny = async (requestId, message, creator) => {
  return await http_post("createMessageAny", "", {
    requestId: Number(requestId),
    message,
    creator,
  });
};

// 任意删除需求
export const deleteRequestAny = async (requestId) => {
  return await http_post("deleteRequestAny", "", {
    requestId: Number(requestId),
  });
};

// 删除任意回复
export const deleteMessageAny = async (messageId) => {
  return await http_post("deleteMessageAny", "", {
    messageId: Number(messageId),
  });
};

//本地上传生成的图片
export const uplodImage = async (img, keyword) => {
  return await http_post("addImg", "", {
    img: img,
    keyword: keyword,
  });
};

// 拉取所有需求
export const requestListAll = async () => {
  return await http_post("requestListAll", "", {});
};

// 添加冲突
export const createConflict = async (requestIdIdA, requestIdIdB) => {
  return await http_post("createConflict", "", {
    requestIdIdA,
    requestIdIdB,
  });
};

// 查询冲突列表
export const conflictList = async () => {
  return await http_post("conflictList", "", {});
};

// 删除冲突
export const deleteConflict = async (conflictId) => {
  return await http_post("deleteConflict", "", { conflictId });
};
