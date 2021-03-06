import { Table, Tag, Space, Typography } from "antd";
import useBasicData from "../../hooks/basic";

const { Text } = Typography;

export default function Basic() {
  const { data = [] } = useBasicData();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: function NameRender(text) {
        return <Text>{text}</Text>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: function TagRender(tags) {
        return (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: function ActionRender(text, record) {
        return (
          <Space size="middle">
            <Text>Invite {record.name}</Text>
            <Text>Delete</Text>
          </Space>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
