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



export const CalendarItem = (props) => {
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}

function getListData(value) {
    const { data: news, refetch: refetchNews } = useQuery(queryUpdateNews);
    

    // console.log(yearStartDate,monthStartDate,dateStartDate)
    // console.log(yearEndDate,monthEndDate,dateEndDate)


    // let calendar_lists = {
    //     "2022" : {
    //         "5" : {
    //             "26" : [
    //                 {type: "error", content: "testt"},
    //                 {type: "warning", content: "testt"},
    //             ],
    //             "5" : [
    //                 {type: "success", content: "testt"},
    //                 {type: "error", content: "testt"},
    //             ]
    //         }
    //     }
    // }
    let calendar_lists = {}

    news?.news.forEach(element => {
        const startDate = new Date(element.startDate)
        const yearStartDate = startDate.getFullYear()
        const monthStartDate = startDate.getMonth()+1
        const dateStartDate = startDate.getDate()
        const endDate = new Date(element.endDate)
        const yearEndDate = endDate.getFullYear()
        const monthEndDate = endDate.getMonth()+1
        const dateEndDate = endDate.getDate()
        const title = element.title

        // console.log({
        //   startDate,
        //   yearStartDate,
        //   monthStartDate,
        //   dateStartDate,
        //   endDate,
        //   yearEndDate,
        //   monthEndDate,
        //   dateEndDate,
        //   title,
        // });
        // console.log(startDate);
        // console.log(endDate);

        let newCalendar_lists = {}

        function setCalenderList(year, month, date, status){
          if (calendar_lists[year]){
            if (calendar_lists[year][month]){
              if (calendar_lists[year][month][date]){
                newCalendar_lists = {
                  [year] : {
                    ...calendar_lists[year],
                    [month] : {
                      ...calendar_lists[year][month],
                        [date] : [
                          ...calendar_lists[year][month][date],
                            {type: status, content: title}
                        ]
                      } 
                  }
                }
              }
              else {
                newCalendar_lists = {
                  [year] : {
                    ...calendar_lists[year],
                    [month] : {
                      ...calendar_lists[year][month],
                        [date] : [
                            {type: status, content: title}
                        ]
                      } 
                  }
                }
              }
            }
            else{
                newCalendar_lists = {
                  [year] : {
                    ...calendar_lists[year],
                    [month] : {
                        [date] : [
                            {type: status, content: title}
                        ]
                      } 
                  }
                }
            }
          }
          else {
            newCalendar_lists = {
                [year] : {
                  [month] : {
                      [date] : [
                          {type: status, content: title}
                      ]
                  }
              }
            }
          }
        }


        // console.log(title);
        // console.log(startDate);
        setCalenderList(yearStartDate, monthStartDate, dateStartDate, "success")
        // console.log(endDate);
        calendar_lists = {
          ...calendar_lists,
          ...newCalendar_lists
        }
        // console.log(startDate != endDate);
        if (startDate.getTime() !== endDate.getTime()){
          setCalenderList(yearEndDate, monthEndDate, dateEndDate, "error")
        }
        
        calendar_lists = {
          ...calendar_lists,
          ...newCalendar_lists
        }
        // console.log(calendar_lists);

        // calendar_lists = {
        //   ...calendar_lists,
        //   [yearEndDate] : {
        //         [monthEndDate] : {
        //             [dateEndDate] : [
        //                 {type: "success", content: title}
        //             ]
        //         }
        //     }
        // }
      });


    let listYearData = calendar_lists[value.year()]

    let listMonthData
    if (listYearData){
        listMonthData = listYearData[value.month() + 1]
    }

    let listData
    if (listMonthData){
        listData = listMonthData[value.date()]
    }

    // console.log(listData);

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
    return (
        <Calendar onPanelChange={onPanelChange} dateCellRender={(data)=>dateCellRender(data,props.lists)} />
    )
}