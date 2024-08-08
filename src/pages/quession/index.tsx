import { QuessionTable } from "@ui"
import { Button, Space } from "antd";
import { TableProps } from "antd/lib";
import { useState } from "react";
import { AddQuession } from "@ui";

function Quessionpage() {
  const [data] = useState([
    {
      key: '1',
      question_name: 'What is your favorite color?',
      options: [
        { option: 'Red' },
        { option: 'Blue' },
        { option: 'Green' },
      ],
    },
    {
      key: '2',
      question_name: 'What is your favorite animal?',
      options: [
        { option: 'Cat' },
        { option: 'Dog' },
        { option: 'Elephant' },
      ],
    },
    {
      key: '3',
      question_name: 'What is your favorite city?',
      options: [
        { option: 'New York' },
        { option: 'London' },
        { option: 'Sydney' },
      ],
    },
  ])

  interface OptionType {
    option: string;
  }
  
  interface QuestionType {
    key: string;
    question_name: string;
    options: OptionType[];
  }
  
  const columns: TableProps<QuestionType>['columns'] = [
    {
      title: 'Question',
      dataIndex: 'question_name',
      key: 'question_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, __) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  


  return (
    <>
      <div style={{display: 'flex', justifyContent: 'end'}}>
        <AddQuession/>
      </div>
      <QuessionTable data={data} columns={columns}/>
    </>
  )
}

export default Quessionpage