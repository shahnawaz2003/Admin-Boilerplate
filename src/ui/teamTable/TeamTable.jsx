import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Spinner,
} from "@material-tailwind/react";

const DynamicTable = ({
  tableTitle,
  columns,
  data,
  onDelete,
  isLoading,
  onEdit,
  open,
}) => {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-8 mt-8 p-6 flex justify-between items-center"
      >
        <Typography variant="h6" color="white">
          {tableTitle}
        </Typography>
        <Button color="blue" size="sm" onClick={open}>
          Add
        </Button>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner className="h-12 w-12 text-blue-blue-500" />
          </div>
        ) : (
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="border-b border-blue-blue-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-blue-400"
                    >
                      {col.replace("_", " ")}
                    </Typography>
                  </th>
                ))}
                <th className="border-b border-blue-blue-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-blue-400"
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-blue-blue-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-3 px-5">
                      {col === "image" && row[col] ? (
                        <Avatar
                          src={row[col]}
                          alt={row.name}
                          size="sm"
                          variant="rounded"
                        />
                      ) : col === "social_links" && Array.isArray(row[col]) ? (
                        row[col].map((link, i) => (
                          <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-500 underline"
                          >
                            {link}
                          </a>
                        ))
                      ) : (
                        <Typography className="text-xs font-semibold text-blue-blue-600">
                          {row[col] || "N/A"}
                        </Typography>
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-5 flex gap-2">
                    <Button
                      variant="text"
                      size="sm"
                      color="red"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="text"
                      size="sm"
                      color="blue"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>
  );
};

export default DynamicTable;
