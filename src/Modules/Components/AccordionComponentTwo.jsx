import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../PatientInfo/PatientDetails.module.css";
import moment from "moment";

const AccordionComponent = ({ data }) => {
  console.log(data);
  return (
    <Accordion defaultActiveKey='0'>
      {data.map((item, index) => (
        <Accordion.Item key={index} eventKey={index}>
          <Accordion.Header>
            <div className='d-flex flex-column'>
              <div className='date'>{item.logDate}</div>
              {/* <div className='status mt-1'>
                {item.avgValue > 0 ? (
                  <div className='d-flex gap-2'>
                    <span>{item?.logs[0]?.sugarLevel} mg/dL</span>
                    <span>{item?.logs[0]?.whenRecorded}</span>
                  </div>
                ) : (
                  "NA"
                )}
              </div> */}
              <div className='logTime'>
                Time:{" "}
                {item?.createTime
                  ? moment(item?.createTime).format("YYYY-MM-DD")
                  : "--"}
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className={styles.cardBody}>
              {item?.logs?.length > 0 ? (
                item.logs.map((log, i) => (
                  <div key={i} className={styles.logCard}>
                    <div className={styles.logLeft}>
                      <div className={styles.logName}>
                        <div className='logTime'>{log?.testTime || "NA"}</div>
                      </div>

                      <div className='logRange'>
                        <span>{log?.sugarLevel || 0} mg/dL</span> {" · "}
                        <span>{log?.whenRecorded || "NA"}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='ms-4'>"No records to display"</div>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
