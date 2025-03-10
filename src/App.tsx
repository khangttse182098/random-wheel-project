import { ColumnType } from "antd/es/table";
import AntDCustomTable from "./components/cTableAntD/cTableAntD";

const mockData = [
  {
    name: "khang",
    age: 21,
  },
  {
    name: "mile",
    age: 21,
  },
  {
    name: "nhim",
    age: 21,
  },
  {
    name: "manh",
    age: 21,
  },
];

const columns: ColumnType[] = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Tuổi",
    dataIndex: "age",
  },
];

function App() {
  return (
    <div>
      <AntDCustomTable dataSource={mockData} columns={columns} />
    </div>
  );
}

export default App;
