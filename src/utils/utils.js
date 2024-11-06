export function formatTimeDifference(date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff < 0) return "已过期";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} Months`;
  } else if (days > 0) {
    return `${days} Days`;
  } else if (hours > 0) {
    return `${hours} Hours`;
  } else if (minutes > 0) {
    return `${minutes} Minutes`;
  } else {
    return `${seconds} Seconds`;
  }
}

export function extractTags(message, allowList) {
  // 将 allowList 中的标签转换为正则表达式,并设置为不区分大小写
  const regex = new RegExp(allowList.map((tag) => `(${tag})`).join("|"), "gi");

  // 从消息中提取所有匹配的标签
  const tags = message.match(regex) || [];

  // 去重并返回标签数组
  return [...new Set(tags.map((tag) => tag.trim()))];
}

/**
 * 模拟睡眠函数
 * @param {number} ms 毫秒数
 */
export async function sleep(ms) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });
}

/**
 * 格式化时间
 */
export function formatTime(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  let months = newDate.getMonth() + 1;
  let day = newDate.getDate();
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();
  let second = newDate.getSeconds();

  if (months < 10) {
    months = `0${months}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }

  return `${year}-${months}-${day} ${hour}:${minute}:${second}`;
}

export function timeDiffWithNow(date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return diff;
}
