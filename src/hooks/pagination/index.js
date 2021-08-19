import { useQuery } from "react-query";

/**
 * 获取测试数据渲染
 * @returns []
 */
export const queryPageData = async ({
  page = 0,
  size = 10,
  param = {},
  sorter = {},
  filter = {},
}) => {
  const cursor = page <= 0 ? 0 : (page - 1) * size;
  try {
    const response = await fetch("/cats/page", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ cursor, size, param, filter, sorter }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

/**
 * 增加一条数据
 * @param {*} data
 * @returns
 */
export const addData = async (data) => {
  try {
    const response = await fetch("/cats/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const QUER_PAGE_KEY = "page";
// 导出自定义hooks
export default function usePageData(param) {
  // TODO 后续再考虑排序和过滤 先处理表单查询
  return useQuery([QUER_PAGE_KEY, param], () => queryPageData(param), {
    keepPreviousData: true,
    staleTime: 5000,
  });
}

export function createPrefetch(param, queryClient) {
  return queryClient.prefetchQuery([QUER_PAGE_KEY, param], () =>
    queryPageData(param)
  );
}
