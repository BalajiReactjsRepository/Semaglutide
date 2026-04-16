import React from "react";
import DataTable from "react-data-table-component";
import Loader from "../../utils/Loader";

const DatatableComponent = ({
  columns,
  data,
  loading,
  totalRows,
  perPage,
  onChangePage,
  onChangeRowsPerPage,
  customStyles: propStyles,
  innerTable = false,
}) => {
  const defaultStyles = {
    headRow: {
      style: {
        backgroundColor: "#fff",
        fontWeight: "600",
        fontSize: "14px",
        minHeight: "40px",
      },
    },
    rows: {
      style: {
        minHeight: "36px",
        "&:hover": {
          backgroundColor: "#f9fafb",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const appliedStyles = innerTable ? propStyles : defaultStyles;

  return (
    <DataTable
      key={perPage}
      columns={columns}
      data={data}
      progressPending={loading}
      progressComponent={<Loader />}
      pagination
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
      noDataComponent={<div style={{ padding: "20px" }}>No Data Available</div>}
      fixedHeader
      // fixedHeaderScrollHeight='400px'
      customStyles={appliedStyles}
      paginationServer
      paginationTotalRows={totalRows}
      paginationPerPage={perPage}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  );
};

export default DatatableComponent;
