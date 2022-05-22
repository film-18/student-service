import { Badge, Calendar } from "antd";

function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}

function getListData(value) {
    
    const calendar_lists = {
        "2022" : {
            "3" : {
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

function dateCellRender(value) {
  const listData = getListData(value);
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

export const CalendarItem = () => {
    return (
        <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
    )
}