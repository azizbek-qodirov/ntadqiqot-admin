import { Table, Radio } from 'antd';
import './style.scss'


function Index({data, columns}:any) {
  return (
   <>
     <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <Radio.Group>
            {record?.options
              ?.sort((a:any, b:any) => a.option.localeCompare(b.option))
              .map((opt:any, index:any) => (
                <Radio key={index} value={opt.option}>
                  {String.fromCharCode(65 + index)}. {opt.option}
                </Radio>
              ))}
          </Radio.Group>
        ),
      }}
    />
   </>
  )
}

export default Index
