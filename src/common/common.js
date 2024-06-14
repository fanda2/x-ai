import { http_post } from "./request";

export function generateImages() {
  const buttonTextsWithGroup = this.selectedButtons.map(
    (button) => button.name
  );
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
export const chatMessage = async (role, content) => {
  return await http_post("chat", "", {
    role: role,
    content: content,
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