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
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [isAddMode, setIsAddMode] = useState(false);

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

  const handleAddUser = () => {
    setEditRow({ name: "", company: "", orderValue: "", orderDate: "", status: "" });
    setIsAddMode(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isAddMode) {
      const newId = (Math.max(...data.map(item => parseInt(item.id)), 0) + 1).toString();
      const newUser = { ...editRow, id: newId };
      setData(prevData => [...prevData, newUser]);
    } else {
      setData(prevData =>
        prevData.map(item =>
          item.id === editRow.id ? { ...editRow } : item
        )
      );
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setData(prevData => prevData.filter(item => item.id !== editRow.id));
    setShowModal(false);
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
                  onClick={handleAddUser}
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

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white w-120 rounded-xl p-6 shadow-xl relative">
            <span
              className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              ✕
            </span>

            <h2 className="text-black mb-10 font-bold text-2xl">
              {isAddMode ? "THÊM KHÁCH HÀNG" : "THÔNG TIN KHÁCH HÀNG"}
            </h2>

            <div className="text-left pl-10 mb-4">
              <label className="text-black mr-10">Customer name:</label>
              <input
                type="text"
                value={editRow.name || ""}
                onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
                className="text-gray-700 border border-gray-500 rounded-sm"
              />
            </div>

            <div className="text-left pl-10 mb-4">
              <label className="text-black mr-10">Company:</label>
              <input
                type="text"
                value={editRow.company || ""}
                onChange={(e) => setEditRow({ ...editRow, company: e.target.value })}
                className="text-gray-700 border border-gray-500 rounded-sm ml-11"
              />
            </div>

            <div className="text-left pl-10 mb-4">
              <label className="text-black mr-10">Order Value:</label>
              <input
                type="text"
                value={editRow.orderValue || ""}
                onChange={(e) => setEditRow({ ...editRow, orderValue: e.target.value })}
                className="text-gray-700 border border-gray-500 rounded-sm ml-7"
              />
            </div>

            <div className="text-left pl-10 mb-4">
              <label className="text-black mr-10">Order Date:</label>
              <input
                type="text"
                value={editRow.orderDate || ""}
                onChange={(e) => setEditRow({ ...editRow, orderDate: e.target.value })}
                className="text-gray-700 border border-gray-500 rounded-sm ml-8"
              />
            </div>

            <div className="text-left pl-10 mb-4">
              <label className="text-black mr-10">Status:</label>
              <input
                type="text"
                value={editRow.status || ""}
                onChange={(e) => setEditRow({ ...editRow, status: e.target.value })}
                className="text-gray-700 border border-gray-500 rounded-sm ml-17"
              />
            </div>

            <div className="text-center mt-6">
              {!isAddMode && (
                <button
                  className="m-1 px-6 py-2 rounded text-white"
                  style={{ backgroundColor: "#F08080" }}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
              <button
                className="m-1 px-6 py-2 rounded text-white"
                style={{ backgroundColor: "#00BFFF" }}
                onClick={handleSave}
              >
                {isAddMode ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
