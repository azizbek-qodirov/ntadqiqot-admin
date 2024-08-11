import { QuessionTable } from "@ui"
import { Button, Space } from "antd";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";
import { AddQuession } from "@ui";
import { MenuIds } from "@store";
import http from "../../config";
import { toast, ToastContainer } from "react-toastify";

function Quessionpage() {
    const {menu_id}:any = MenuIds()
    const [datas, setDatas] = useState([])
    

    async function getQuession(){
      if(menu_id){
        try {
          const response = await http.get(`/questions/${menu_id}`)
          setDatas(response?.data?.question || [])

          console.log(response);
        } catch (error) {
          console.error(error)
        }
      }
    }


    useEffect(() => {
      getQuession()
    }, [menu_id])
  

  interface OptionType {
    option: string;
  }
  
  interface QuestionType {
    key: string;
    question_name: string;
    options: OptionType[];
  }

  async function handleDelete(id:any){
    try {
      const response = await http.delete(`/question/${id}`)
      if(response?.status == 200){
        getQuession()
        toast.success('Savol muvaffaqiyatli ochirilid !')
      }
    } catch (error) {
        toast.error("Savol o'chirilishda qandaydir muommo yuzaga keldi", {autoClose: 1600})
      console.error(error)
    }
  }
  
  const columns: TableProps<QuestionType>['columns'] = [
    {
      title: 'Savol nomlari',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Amallar',
      key: 'action',
      render: (_, record:any) => (
        <Space size="middle">
          <Button type="link">O'zgartirish</Button>
          <Button onClick={() => handleDelete(record?.id)} type="link" danger>
            O'chirish
          </Button>
        </Space>
      ),
    },
  ];
  


  return (
    <>
    <ToastContainer/>
      <div style={{display: 'flex', justifyContent: 'end'}}>
        <AddQuession/>
      </div>
      <QuessionTable data={datas} columns={columns}/>
    </>
  )
}

export default Quessionpage