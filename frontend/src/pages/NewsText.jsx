import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";

const NEWSID_QUERY = gql`
  query ($id: MongoID!) {
    newsId(_id: $id) {
      title
      shortDes
      body
      image
      startDate
      endDate
    }
  }
`;

export const NewsText = () => {
  const { id } = useParams();

  const { data: newsData } = useQuery(NEWSID_QUERY, {
    variables: {
      id,
    },
  });
  const convertDate = (date) => {
    if (newsData) {
      const monthName = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];
      return [date[2], monthName[parseInt(date[1])], parseInt(date[0]) + 543];
    }
  };
  const dateStart = useMemo(() => {
    return convertDate(newsData?.newsId?.startDate.split("T")[0].split("-"));
  }, [newsData]);
  const dateEnd = useMemo(() => {
    return convertDate(newsData?.newsId?.endDate.split("T")[0].split("-"));
  }, [newsData]);

  return (
    // <div className="container">
    //     <h1 className="mt-3 mb-3 fw-bold">{newsData?.newsId.title}</h1>
    //     <div className="mb-3 text-end">ตั้งแต่วันที่ {dateStart ? dateStart[0] : ""} {dateStart ? dateStart[1] : ""} {dateStart ? dateStart[2] : ""} ถึง {dateEnd ? dateEnd[0] : ""} {dateEnd ? dateEnd[1] : ""} {dateEnd ? dateEnd[2] : ""}</div>
    //     <div className="w-100 text-center">
    //         <img src={newsData?.newsId.image} alt="" width="70%" />
    //     </div>
    //     <div className="fs-5 mt-5">{newsData?.newsId.body}</div>
    // </div>

    <div className="container justify-content-center">
      <div className="row p-4" style={{ backgroundColor: "white" }}>
        <div className="col-12">
          <h3 className="mt-3 mb-3">{newsData?.newsId.title}</h3>
          <div className="mb-3">
            ตั้งแต่วันที่ {dateStart ? dateStart[0] : ""}{" "}
            {dateStart ? dateStart[1] : ""} {dateStart ? dateStart[2] : ""} -{" "}
            {dateEnd ? dateEnd[0] : ""} {dateEnd ? dateEnd[1] : ""}{" "}
            {dateEnd ? dateEnd[2] : ""}
          </div>
          <div className="justify-content-center text-center">
          <Image src={newsData?.newsId.image} width={700}></Image>
          </div>
          <h4>รายละเอียด</h4>
          <div className="fs-5 mt-1">{newsData?.newsId.body}</div>
        </div>
      </div>
    </div>
  );
};
