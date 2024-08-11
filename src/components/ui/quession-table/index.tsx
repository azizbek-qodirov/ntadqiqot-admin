  import { Table, Radio } from 'antd';
  import './style.scss'

  const defaultOptions = [
    { option: 'Har doim' },
    { option: 'Odatda' },
    { option: 'Tez-tez' },
  ];

  function Index({ data, columns }: any) {

    const dataWithKey = data.map((item: any, index: number) => ({
      ...item,
      key: item.id || index,
    }));


    return (
      <>
        <Table
          columns={columns}
          dataSource={dataWithKey}
          pagination={false}
          expandable={{
            expandedRowRender: (_, i) => {
              const allOptions = [...defaultOptions];
              
              return (
                <Radio.Group key={i+1}>
                  {allOptions
                    ?.sort((a: any, b: any) => a.option.localeCompare(b.option))
                    ?.map((opt: any, index: any) => (
                      <Radio key={index} value={opt.option}>
                        {String.fromCharCode(65 + index)}. {opt.option}
                      </Radio>
                    ))}
                </Radio.Group>
              );
            },
          }}
        />
      </>
    );
  }

  export default Index;
