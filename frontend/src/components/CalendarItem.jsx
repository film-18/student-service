import { Badge, Calendar } from "antd";
import { gql, useQuery, useMutation } from "@apollo/client"
const queryUpdateNews = gql`
query{
    news {
      title,
      shortDes,
      body,
      image,
      startDate,
      endDate,
    }
  }`;

function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}

function getListData(value) {
    const { data: news, refetch: refetchNews } = useQuery(queryUpdateNews);
    

    // console.log(yearStartDate,monthStartDate,dateStartDate)
    // console.log(yearEndDate,monthEndDate,dateEndDate)

    



    news?.news.forEach(element => {
        const startDate = new Date(element.startDate)
        const yearStartDate = startDate.getFullYear()
        const monthStartDate = startDate.getMonth()+1
        const dateStartDate = startDate.getDay()
        const endDate = new Date(element.endDate)
        const yearEndDate = endDate.getFullYear()
        const monthEndDate = endDate.getMonth()+1
        const dateEndDate = endDate.getDay()
        const title = element.title

        

    });
    
    const calendar_lists = {
        "2021" : {
            "5" : {
                "1" : [
                    {type: "error", content: "testt"},
                    {type: "warning", content: "testt"},
                ],
                "5" : [
                    {type: "success", content: "testt"},
                    {type: "error", content: "testt"},
                ]
            }
        }
    }

    let listYearData = calendar_lists[value.year()]

    let listMonthData
    if (listYearData){
        listMonthData = listYearData[value.month() + 1]
    }

    let listData
    if (listMonthData){
        listData = listMonthData[value.date()]
    }

    return listData || [];
}

function dateCellRender(value,lists) {
  const listData = getListData(value,lists);
  return (
    <div className="events">
      {listData.map((item, index) => (
        <li key={item.content + index}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </div>
  );
}

export const CalendarItem = (props) => {
    return (
        <Calendar onPanelChange={onPanelChange} dateCellRender={(data)=>dateCellRender(data,props.lists)} />
    )
}