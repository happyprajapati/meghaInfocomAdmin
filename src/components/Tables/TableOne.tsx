import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import UserOne from '../../images/slider1.jpg';
import { useContext, useEffect, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { CgRemoveR } from 'react-icons/cg';
import { RiSendPlaneFill } from 'react-icons/ri';

import FDialog from './../dialog.jsx';
import { Bounce, toast } from 'react-toastify';
import { tableContext, searchContext } from './../../context/context.jsx';
import Inquiry from '../../pages/inquiry.jsx';
import { IoClose } from "react-icons/io5";

const TableOne = ({ name }) => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');
  const [editFlage, setEditFlage] = useState(false);
  const [productNames, setProductNames] = useState({});
  const [editedCat, setEditedCat] = useState('');
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const table = useContext(tableContext);
  const value = useContext(searchContext);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    let newUrl = '';

    if (value.search != '' && name === 'selectProd') {
        newUrl = `${import.meta.env.VITE_BASE_URL}/api/products/search?search=${
          value.search
        }&page=${page}&size=10`;
    } else if (value.search != '' && name === 'user') {
      newUrl = `${import.meta.env.VITE_BASE_URL}/api/admin/user/search?search=${
        value.search
      }&page=${page}&size=10`;
    } else if (value.search === '' && name === 'images') {
      newUrl = `${import.meta.env.VITE_BASE_URL}/api/slider/`;
    } else if (value.search === '' && name === 'employee') {
      newUrl = `${
        import.meta.env.VITE_BASE_URL
      }/api/admin/employees?page=${page}&size=10`;
    } else if (value.search === '' && name === 'category') {
      newUrl = `${import.meta.env.VITE_BASE_URL}/api/category/?page=${page}&size=10`;
    } else if (value.search === '' && name === 'product') {
      newUrl = `${import.meta.env.VITE_BASE_URL}/api/products/?page=${page}&size=10`;
    } else if (value.search === '' && name === 'selectProd') {
      newUrl = `${import.meta.env.VITE_BASE_URL}/api/products/featured?page=${page}&size=10`;
    } else if (value.search === '' && name === 'user') {
      newUrl = `${
        import.meta.env.VITE_BASE_URL
      }/api/admin/allusers?page=${page}&size=10`;
    } else if (value.search === '' && name === 'inquiry') {
      newUrl = `${import.meta.env.VITE_BASE_URL}/api/admin/requests/?page=${page}&size=10`;
    }

    console.log(name);
      setUrl(newUrl);
  }, [name, table.table, value.search, page]);

  useEffect(() => {
    console.log(url);
    // if (value.search != '') {
    //   setTimeout(() => {
    //     fetch(`${url}`, {
    //       method: 'GET',
    //     })
    //       .then((res) => res.json())
    //       .then((res) => {
    //         if (res.success) {
    //           console.log(value.search);
    //           setData(res.data);
    //           console.log(res.data);
    //         }
    //       });
    //   }, 1000);
    // } else {
    fetch(`${url}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
          console.log(res.data);
          console.log(value.search);
        }
      });
        // }
  }, [url, table.table]);

  const totalPages = data.totalPages;

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page < 3) {
        pages = [0, 1, 2, 3, '...', totalPages - 1];
      } else if (page > totalPages - 4) {
        pages = [0, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
      } else {
        pages = [0, '...', page - 1, page, page + 1, '...', totalPages - 1];
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const getProductName = async () => {
    try {
      const productIds = [...new Set(data?.content.map((item) => item?.id?.productId))];
      console.log(productIds)

      // Fetch names for all unique product IDs
      const fetches = productIds.map((id) =>
        fetch(`${import.meta.env.VITE_BASE_URL}/api/products/id/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }).then((res) => res.json()),
      );

      const responses = await Promise.all(fetches);

      // Map responses to product names
      const newProductNames = responses.reduce((acc, res) => {
        if (res.success) {
          acc[res.data.id] = res.data.title;
        }
        return acc;
      }, {});

      setProductNames(newProductNames);
    } catch (err) {
      console.log('An error occurred while fetching product names.');
    }
  };

  useEffect(() => {
        if(name === 'inquiry'){
          getProductName();
        }
  }, [data]);

  const handleAddFeaturedProd = (id) => {
    console.log(id);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products/mark-featured/${id}`, {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        // Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQyNDI4MjMsImV4cCI6MTcyNDMyOTIyMywicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.kk1jzV4O61PF5AxMkli48WLuam_bbor5xZbKxz0SHKvFS8bA9MqICMNa4_Y4XhcS`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // console.log(table.table)
          table.setTable(!table.table);
          // console.log(table.table)
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else {
          console.log(res.message);
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      });
  };

  const handleRemoveFeaturedProd = (id) => {
    console.log(id);
    fetch(
      `${import.meta.env.VITE_BASE_URL}/api/products/remove-featured/${id}`,
      {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          // Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQyNDI4MjMsImV4cCI6MTcyNDMyOTIyMywicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.kk1jzV4O61PF5AxMkli48WLuam_bbor5xZbKxz0SHKvFS8bA9MqICMNa4_Y4XhcS`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // console.log(table.table)
          table.setTable(!table.table);
          // console.log(table.table)
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else {
          console.log(res.message);
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      });
  };

  const handleUpdateCat = () => {
    console.log(editedCat);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/category/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: editedCat }),
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        // Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQyNDI4MjMsImV4cCI6MTcyNDMyOTIyMywicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.kk1jzV4O61PF5AxMkli48WLuam_bbor5xZbKxz0SHKvFS8bA9MqICMNa4_Y4XhcS`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // console.log(table.table)
          table.setTable(!table.table);
          // console.log(table.table)
          setEditFlage(false);
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else {
          console.log(res.message);
          setEditFlage(false);
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      });
  };

  const handleDeleteCat = (id) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/category/${id}`, {
      method: 'DELETE',
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        // Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQyNDI4MjMsImV4cCI6MTcyNDMyOTIyMywicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.kk1jzV4O61PF5AxMkli48WLuam_bbor5xZbKxz0SHKvFS8bA9MqICMNa4_Y4XhcS`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          table.setTable(!table.table);
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else {
          console.log(res.message);
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      });
  };

  const handleDeleteUser = (id) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/deleteuser/${id}`, {
      method: 'DELETE',
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        // Authorization: `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQyNDI4MjMsImV4cCI6MTcyNDMyOTIyMywicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.kk1jzV4O61PF5AxMkli48WLuam_bbor5xZbKxz0SHKvFS8bA9MqICMNa4_Y4XhcS`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          table.setTable(!table.table);
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else {
          console.log(res.message);
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      });
  };

  const handleDeleteProd = (id) => {
    console.log(id);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        // 'Authorization': `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQxNTkwMjQsImV4cCI6MTcyNDI0NTQyNCwicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.vXihWnXeR0pEC7LgU2B8Yd-Lb6AdR7txyLrWQ8iHsN9l3QxHuVq_TnKtlGwYKBY_`,
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log(res.message);
          table.setTable(!table.table);
          // console.log(res.data)
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else {
          console.log(res.message);
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      });
  };

  const handleDeleteSliderImg = (id) => {
    console.log(id);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/slider/${id}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        // 'Authorization': `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQxNTkwMjQsImV4cCI6MTcyNDI0NTQyNCwicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.vXihWnXeR0pEC7LgU2B8Yd-Lb6AdR7txyLrWQ8iHsN9l3QxHuVq_TnKtlGwYKBY_`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log(res.message);
          table.setTable(!table.table);
          // console.log(res.data)
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else {
          console.log(res.message);
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      });
  };

  return (
    <>
      {name == 'category' && (
        <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col overflow-x-auto">
            <table>
              <tr className="text-center rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  No.
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Name
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Edit
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Delete
                </th>
              </tr>

              {data?.content?.map((cat, key) => (
                <tr className="text-center" key={key}>
                  <td className="p-2.5 xl:p-5">
                    <p>{key + 1}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    {editFlage && id == cat.id && 
                      <input
                        type="text"
                        placeholder="Enter Category"
                        className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={editedCat}
                        onChange={(e) => {
                          setEditedCat(e.target.value);
                        }}
                      />}
                      {!editFlage && <p>{cat.name}</p>}
                  </td>
                  <td className="p-2.5 xl:p-5">
                    {editFlage ? (
                      <button
                        className="bg-blue-500 px-8 text-white px-3 py-2 rounded-lg"
                        onClick={handleUpdateCat}
                      >
                        Update
                      </button>
                    ) : (
                      <button>
                        <FiEdit
                          className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6"
                          onClick={() => {
                            setId(cat.id);
                            setEditFlage(true);
                          }}
                        />
                      </button>
                    )}
                  </td>
                  <td className="p-2.5 xl:p-5">
                  {editFlage ? (
                      <button
                        className="bg-blue-500 px-8 text-white px-3 py-2 rounded-lg"
                        onClick={()=> setEditFlage(false)}
                      >
                        cancle
                      </button>
                    ) : (
                    <button onClick={() => handleDeleteCat(cat.id)}>
                      <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" />
                    </button>
                    )}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}

      {name == 'employee' && (
        <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col overflow-x-auto">
            <table>
              <tr className="text-center rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Name
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  City
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Contact
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Delete
                </th>
              </tr>

              {data?.content?.map((user, key) => (
                <tr className="text-center" key={key}>
                  <td className="p-2.5 xl:p-5">
                    <p>{user.name}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p>{user.city}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p>{user.phone}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <button onClick={() => handleDeleteUser(user.id)}>
                      <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}

      {name == 'images' && (
        <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col overflow-x-auto">
            <table>
              <tr className="text-center rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Image
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Delete
                </th>
              </tr>

              {data?.map((img, key) => (
                <tr className="text-center" key={key}>
                  <td className="p-2.5 xl:p-5">
                    <img
                      src={`${
                        import.meta.env.VITE_BASE_URL
                      }/api/user/product/image/${img.name}`}
                    />
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button onClick={() => handleDeleteSliderImg(img.id)}>
                      <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}

      {name == 'product' && (
        <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col overflow-x-auto">
            <table>
              <tr className="text-center rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Name
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Model No.
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Category
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Description
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  images
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Update
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Delete
                </th>
              </tr>
              {data.length <= 0 && (
                <tr className="text-center">
                  <td className="p-2.5 xl:p-5" colSpan="7">
                    <p>No product found.</p>
                  </td>
                </tr>
              )}
              {data?.content?.map((prod, key) => (
                <tr className="text-center" key={key}>
                  <td className="p-2.5 xl:p-5">
                    <p>{prod.title}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p>{prod.modelNo}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p>{prod.category.name}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p className=' max-w-42 max-h-24 overflow-y-auto'>{prod.description}
                    </p>
                  </td>

                  <td className="p-2.5 xl:p-5 max-w-36">
                    <Swiper
                      effect={'cards'}
                      grabCursor={true}
                      modules={[EffectCards]}
                      className="mySwiper"
                    >
                      {prod.imageNames.map((img, key) => (
                        <SwiperSlide key={key}>
                          <img
                            src={`${
                              import.meta.env.VITE_BASE_URL
                            }/api/products/image/${img}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button>
                      <FiEdit
                        className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6"
                        onClick={() => {
                          handleOpen();
                          setId(prod.id);
                        }}
                      />
                    </button>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button>
                      <RiDeleteBin6Line
                        className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6"
                        onClick={() => handleDeleteProd(prod.id)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <FDialog
            name={'Product'}
            id={id}
            handleOpen={handleOpen}
            open={open}
          />
        </div>
      )}

      {name == 'user' && (
        <>
          <div className="w-full flex items-center space-x-2 my-3 mx-auto text-lg">
            <IoClose onClick={()=> value.setSearch('')} className='absolute right-7 md:right-10 lg:right-12 xl:right-14 w-5 h-5 cursor-pointer'/>
            <input
              placeholder="Search here..."
              value={value.search} 
              onChange={(e) => value.setSearch(e.target.value)}
              className="block w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-md md:text-md lg:text-lg dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              type="text"
            />
          </div>
          <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col overflow-x-auto">
              <table>
                <tr className="text-center rounded-sm bg-gray-2 dark:bg-meta-4">
                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    Name
                  </th>
                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    Contact
                  </th>

                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    City
                  </th>

                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    Delete
                  </th>
                </tr>

                {data?.content?.map((user, key) => (
                  <tr className="text-center" key={key}>
                    <td className="p-2.5 xl:p-5">
                      <p>{user.name}</p>
                    </td>

                    <td className="p-2.5 xl:p-5">
                      <p>{user.phone}</p>
                    </td>

                    <td className="p-2.5 xl:p-5">
                      <p>{user.city}</p>
                    </td>

                    <td className="p-2.5 xl:p-5">
                      <button onClick={() => handleDeleteUser(user.id)}>
                        <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </>
      )}

      {name == 'selectProd' && (
        <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col overflow-x-auto">
            <table>
              <tr className="text-center rounded-sm bg-gray-2 dark:bg-meta-4">
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  {' '}
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Name
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Serial No.
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Category
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Description
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  images
                </th>
              </tr>

              {/* {data.length <= 0 && 
                <tr className="text-center">
                  <td className="p-2.5 xl:p-5" colSpan="7">
                    <p>No product found.</p>
                  </td>
                </tr>
                  } */}
              {data?.content?.map((prod, key) => (
                <tr className="text-center" key={key}>
                  {value.search != '' ? (
                    <td className="p-2.5 xl:p-5">
                      <MdOutlineAddBox
                        className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6 cursor-pointer"
                        onClick={() => handleAddFeaturedProd(prod.id)}
                      />
                    </td>
                  ) : (
                    <td className="p-2.5 xl:p-5">
                      <CgRemoveR
                        className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6 cursor-pointer"
                        onClick={() => handleRemoveFeaturedProd(prod.id)}
                      />
                    </td>
                  )}
                  <td className="p-2.5 xl:p-5">
                    <p>{prod.title}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p>{prod.modelNo}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p>{prod.category.name}</p>
                  </td>

                  <td className="p-2.5 xl:p-5">
                    <p>{prod.description}</p>
                  </td>

                  <td className="p-2.5 xl:p-5 max-w-36">
                    <Swiper
                      effect={'cards'}
                      grabCursor={true}
                      modules={[EffectCards]}
                      className="mySwiper"
                    >
                      {prod.imageNames.map((img, key) => (
                        <SwiperSlide key={key}>
                          <img
                            src={`${
                              import.meta.env.VITE_BASE_URL
                            }/api/products/image/${img}`}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}

      {name == 'inquiry' && (
        <>
          <div className="w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col overflow-x-auto">
              <table>
                <tr className="text-center rounded-sm bg-gray-2 dark:bg-meta-4">
                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    User Name
                  </th>
                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    User Contact
                  </th>

                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    Product Name
                  </th>

                  <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                    send
                  </th>
                </tr>

                {data?.content?.map((inquiry, key) => (
                  <tr className="text-center" key={key}>
                    <td className="p-2.5 xl:p-5">
                      <p>{inquiry.user?.name}</p>
                    </td>

                    <td className="p-2.5 xl:p-5">
                      <p>{inquiry.user?.phone}</p>
                    </td>

                    <td className="p-2.5 xl:p-5">
                      <p>{productNames[inquiry.id?.productId]}</p>
                    </td>

                    <td className="p-2.5 xl:p-5">
                        <a
                          href={`https://wa.me/${inquiry.user?.phone}/?text=Product name: electronics`}
                          // onClick={() => handleDeleteUser(user.id)}
                          className="flex justify-center text-bt font-bold"
                        >
                        <RiSendPlaneFill className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" />
                        </a>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </>
      )}

      {name != 'images' && data?.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            disabled={page === 0 ? true : false}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => setPage(page - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
            Pre
          </button>
          <div className="flex items-center gap-2">
          {pageNumbers.map((num, index) => (
          <button
            key={index}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
              page === num
                ? 'shadow-md shadow-gray-900/10 bg-black text-white'
                : 'text-gray-900'
            }`}
            onClick={() => typeof num === 'number' && setPage(num)}
            disabled={typeof num === 'string'}
          >
            {num === '...' ? '...' : num + 1}
          </button>
        ))}
          </div>
          <button
            disabled={data.totalPages == page + 1}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => setPage(page + 1)}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default TableOne;
