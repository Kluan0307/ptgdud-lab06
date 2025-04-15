import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import './Dashboard.css';
import create from "../assets/img/create.png";
import datail from "../assets/img/File text 1.png";
import moveup from "../assets/img/Move up.png";
import download from "../assets/img/Download.png";

const columns = (handleEdit) => [
  { name: "Customer Name", selector: row => row.name, sortable: true },
  { name: "Company", selector: row => row.company, sortable: true },
  { name: "Order Value", selector: row => row.orderValue, sortable: true },
  { name: "Order Date", selector: row => row.orderDate, sortable: true },
  {
    name: "Status",
    selector: row => row.status,
    cell: row => (
      <span className={`status-badge ${row.status?.toLowerCase()}`}>
        {row.status}
      </span>
    ),
  },
  {
    name: "Edit",
    cell: (row) => (
      <button onClick={() => handleEdit(row.id)} style={{ backgroundColor: "white" }}>
        <img src={create} alt="create-img" />
      </button>
    ),
  },
];

function Dashboard() {
  const [data, setData] = useState([]);
 


  useEffect(() => {
    fetch("https://67f021af2a80b06b88970595.mockapi.io/dataTable")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleEdit = (id) => {
    const row = data.find(item => item.id === id);
    setSelectedRow(row);
    setEditRow({ ...row });
    setIsAddMode(false);
    setShowModal(true);
  };


  
  const handleExport = async () => {
    try {
      // Duyệt qua từng item để gửi lên API
      await Promise.all(
        data.map(async (item) => {
          const method = "PUT"; // chỉ cập nhật
          const url = `https://67f021af2a80b06b88970595.mockapi.io/dataTable/${item.id}`;
          await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        })
      );
  
      // Fetch lại dữ liệu sau khi cập nhật
      const res = await fetch(
        `https://67f021af2a80b06b88970595.mockapi.io/dataTable?timestamp=${new Date().getTime()}`
      );
      const updatedData = await res.json();
      setData(updatedData);
  
      alert("Dữ liệu đã được cập nhật và làm mới!");
    } catch (error) {
      console.error("Lỗi khi export:", error);
      alert("Export thất bại.");
    }
  };
  

  return (
    <div>
      <div className='flex mt-10'>
        <img src={datail} alt="overview-img" className='pl-10'/>
        <p className='text-black font-bold text-xl ml-5'>Detailed report</p>
        <div className="mt-1 ml-115">
            <div>
                <span
                  className="text-pink-400 border-2 border-pink-400 p-2 mr-2 rounded-lg cursor-pointer hover:bg-pink-400 hover:text-white font-bold"                
                >
                  Add user
                </span>
                <span className="text-pink-400 border-2 border-pink-400 p-2 mr-2 rounded-lg cursor-pointer hover:bg-pink-400 hover:text-white font-bold">
                  <img src={download} alt="" style={{ display: 'inline', verticalAlign: 'middle' }}/> Import
                </span>
                <span className="text-pink-400 border-2 border-pink-400 p-2 rounded-lg cursor-pointer hover:bg-pink-400 hover:text-white font-bold">
                  <img src={moveup} alt="" style={{ display: 'inline', verticalAlign: 'middle' }} onClick={handleExport}/> Export
                </span>
            </div>
        </div>
      </div>

      <div className="a dashboard-container">
        <DataTable
          columns={columns(handleEdit)}
          data={data}
          pagination
          paginationComponentOptions={{
            noRowsPerPage: true,
            selectAllRowsItem: false,
          }}
          paginationPerPage={6}
          selectableRows
          noDataComponent="No data available"
          persistTableHead
          className="border border-gray-200"
        />
      </div>


    </div>
  );
}

export default Dashboard;
