// components/CustomTable.jsx
import React, { useMemo, useState, useCallback, useEffect, memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { MOBILE_BREAKPOINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

/**
 * Responsive table component that adapts to screen size
 * @param {Object} props Component props
 * @param {Array} props.columns Column definitions for the table
 * @param {Array} props.data Data to display in the table
 * @param {Function} props.renderActions Optional callback to render action buttons
 */

const CustomTable = ({ columns, data, renderActions }) => {
  const navigate = useNavigate();
  // Determine if viewport is mobile
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const headerCells = useMemo(
    () => (
      <>
        {columns.map((column) => (
          <TableCell key={column.key}>{column.label}</TableCell>
        ))}
        {renderActions && <TableCell>Actions</TableCell>}
      </>
    ),
    [columns, renderActions]
  );
  return (
    <TableContainer>
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>{headerCells}</TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => navigate(`/projects/${row?.id}`)}
              sx={{ cursor: "pointer" }}
            >
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.key}`}>
                  {row[column.key]}
                </TableCell>
              ))}
              {renderActions && <TableCell>{renderActions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderActions: PropTypes.func,
};

export default memo(CustomTable);
