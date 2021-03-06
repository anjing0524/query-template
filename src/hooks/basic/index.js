import { useQuery } from "react-query";

/**
 * 获取测试数据渲染
 * @returns []
 */
const getBasicData = async () => {
  const response = await fetch("/cats/data");
  if (response.ok) {
    return response.json();
  }
  return [];
};

// 导出自定义hooks
export default function useBasicData() {
  return useQuery("basic", getBasicData);
}
