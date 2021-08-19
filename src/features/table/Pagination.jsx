import { useEffect, useState } from "react";
import { Button, Tooltip, Dropdown, Menu, Input } from "antd";
import {
  EllipsisOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import {
  LightFilter,
  ProFormDatePicker,
  ProFormText,
} from "@ant-design/pro-form";
import usePageData, {
  createPrefetch,
  addData,
  QUER_PAGE_KEY,
} from "../../hooks/pagination";
import { useMutation, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const columns = [
  {
    title: "排序",
    dataIndex: "index",
    valueType: "in  dexBorder",
    width: 48,
  },
  {
    title: "初始序号",
    dataIndex: "key",
    width: 80,
  },
  {
    title: "应用名称",
    dataIndex: "name",
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: function FilterDropDown() {
      return (
        <div style={{ padding: 8 }}>
          <Input style={{ width: 188, marginBottom: 8, display: "block" }} />
        </div>
      );
    },
    filterIcon: function FilterIcon(filtered) {
      return (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      );
    },
  },
  {
    title: "创建者",
    dataIndex: "creator",
    valueEnum: {
      all: { text: "全部" },
      付小小: { text: "付小小" },
      曲丽丽: { text: "曲丽丽" },
      林东东: { text: "林东东" },
      陈帅帅: { text: "陈帅帅" },
      兼某某: { text: "兼某某" },
    },
  },
  {
    title: "状态",
    dataIndex: "status",
    initialValue: "all",
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: "全部", status: "Default" },
      close: { text: "关闭", status: "Default" },
      running: { text: "运行中", status: "Processing" },
      online: { text: "已上线", status: "Success" },
      error: { text: "异常", status: "Error" },
    },
  },
  {
    title: (
      <>
        创建时间
        <Tooltip placement="top" title="这是一段描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: "since",
    dataIndex: "createdAt",
    valueType: "date",
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: "备注",
    dataIndex: "memo",
    ellipsis: true,
    copyable: true,
  },
  {
    title: "操作",
    width: 180,
    key: "option",
    valueType: "option",
    render: () => [
      <Button type="link" key="link">
        链路
      </Button>,
      <Button type="link" key="link2">
        报警
      </Button>,
      <Button type="link" key="link3">
        监控
      </Button>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];
const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default function Pagination() {
  const [page, setPage] = useState({ page: 1, size: 10 });
  const [params, setParams] = useState(null);
  const [sorter, setSorter] = useState(null);
  const [filters, setFilter] = useState(null);
  const { data, isPreviousData, isLoading } = usePageData({
    ...page,
    params,
    sorter,
    filters,
  });

  const queryClient = useQueryClient();

  // 新增
  const addMutation = useMutation(addData, {
    onMutate: async (data) => {
      // 提交之前动作
      await queryClient.cancelQueries(QUER_PAGE_KEY);

      const previousValue = queryClient.getQueryData(QUER_PAGE_KEY);

      queryClient.setQueryData(QUER_PAGE_KEY, (old) => ({
        ...old,
        data: [...old.data, data],
      }));

      return previousValue;
    },
    onError: (_err, _variables, previousValue) =>
      queryClient.setQueryData(QUER_PAGE_KEY, previousValue),
    onSettled: () => {
      queryClient.invalidateQueries(QUER_PAGE_KEY);
    },
  });

  console.log(addMutation.mutate);

  useEffect(() => {
    if (data?.hasMore) {
      createPrefetch(
        { ...page, page: page.page + 1, params, sorter, filters },
        queryClient
      );
    }
  }, [queryClient, data, page, params, sorter, filters]);

  return (
    <>
      <ProTable
        onColumnsStateChange={(map) => alert(JSON.stringify(map))}
        options={{
          reload: (e, action) => alert(e, action),
        }}
        loading={isLoading}
        onSubmit={(param) => {
          // 表单提交
          setParams(param);
        }}
        onChange={(_, filters, sorter) => {
          setFilter(filters);
          const { field, order } = sorter;
          setSorter({ field, order });
        }}
        dataSource={data?.data || []}
        columns={columns}
        rowKey="key"
        pagination={{
          onShowSizeChange: (current, size) => {
            if (!isPreviousData) {
              setPage({ page: current, size });
            }
          },
          showQuickJumper: true,
          total: data?.total || 0,
          pageSize: page.size,
          current: page.page,
        }}
        search={{
          // layout: "vertical",
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: "高级表格",
          tooltip: "这是一个标题提示",
          filter: (
            <>
              <LightFilter onFinish={(v) => alert(JSON.stringify(v))}>
                <ProFormDatePicker name="createAt" label="创建时间" />
              </LightFilter>
              <LightFilter onFinish={(v) => alert(JSON.stringify(v))}>
                <ProFormText name="name" label="应用名称" />
              </LightFilter>
            </>
          ),
          actions: [
            <Button
              key="primary"
              type="primary"
              onClick={() => {
                alert("add");
              }}
            >
              添加
            </Button>,
          ],
        }}
        toolBarRender={() => [
          <Button key="danger" danger>
            危险按钮
          </Button>,
          <Button key="show">查看日志</Button>,
          <Button type="primary" key="primary">
            创建应用
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <ReactQueryDevtools initialIsOpen></ReactQueryDevtools>
    </>
  );
}
