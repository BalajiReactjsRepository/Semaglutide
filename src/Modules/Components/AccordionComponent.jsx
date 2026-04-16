import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../PatientInfo/PatientDetails.module.css";
import moment from "moment";

const AccordionComponent = ({ data }) => {
  return (
    <Accordion defaultActiveKey='0'>
      {data.map((item, index) => (
        <Accordion.Item eventKey={index}>
          <Accordion.Header>
            <div className='d-flex flex-column'>
              <div className='date'>{item.logDate}</div>
              <div className='status mt-1'>
                BMI (Average):{" "}
                {item.avgValue > 0 ? (
                  <span>
                    {item.avgValue} kg/m<sup>2</sup>
                  </span>
                ) : (
                  "NA"
                )}
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
                        <div className='logTime'>
                          BMI: {log?.bmi || 0} kg/m<sup>2</sup>
                        </div>
                      </div>

                      <div className='logRange'>
                        <span>Height: {log?.height || 0} cm</span> {" · "}
                        <span>Weight: {log?.weight || 0} kg</span>
                      </div>

                      <div className='logRange'>
                        <span>Waist: {log?.waistCircumference || 0} cm</span>{" "}
                        {" · "}
                        <span>Hip: {log?.hipCircumference || 0} cm</span>
                      </div>
                    </div>

                    <div className='logTime'>
                      <span>
                        Date:{" "}
                        {log?.createdAt
                          ? moment(log.createdAt, "DD-MM-YYYY HH:mm:ss").format(
                              "Do MMM",
                            )
                          : "--"}
                      </span>
                      <br />
                      <span>
                        Time:{" "}
                        {log?.createdAt
                          ? log.createdAt.split(" ")[1].slice(0, 5)
                          : "--"}
                      </span>
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
