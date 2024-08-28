import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from "react-icons/fi";
import UserOne from '../../images/slider1.jpg';
import { useContext, useEffect, useState } from 'react';

import FDialog from "./../dialog.jsx";
import { Bounce, toast } from 'react-toastify';
import { tableContext } from './../../context/context.jsx'

const TableOne = ({ name }) => {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])

  const [open, setOpen] = useState(false);    
  const [id, setId] = useState('');    
  const table = useContext(tableContext)

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if(name === 'category'){
      fetch('https://meghainfocom-production.up.railway.app/api/category/', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setCategories(res.data)
            console.log(res.data)
          }})
    }else if(name === 'product'){
      fetch('https://meghainfocom-production.up.railway.app/api/products/', {
        method: 'GET',
        headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Authorization': `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQzMzc2NjUsImV4cCI6MTcyNDQyNDA2NSwicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.mF-Ie84XD5iD0FhvVmZ-Fo5qGjhY8KXodJwFe_X-z_J_rFMWTGqpKygNWJRt2xIy`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            console.log(res.data)
            setProducts(res.data.content)
            console.log(res.data)
          }})
    }else if(name === 'user'){
      fetch('https://meghainfocom-production.up.railway.app/api/admin/users?page=0&size=10', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            console.log(res.data)
            setUsers(res.data.content)
            console.log(res.data)
          }})
    }
    
  }, [table.table])

  const handleDeleteProd = (id) => {
    console.log(id)
    fetch(`https://meghainfocom-production.up.railway.app/api/products/${id}`, {
      method: 'DELETE',
      headers: {
      // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        // 'Authorization': `Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjQxNTkwMjQsImV4cCI6MTcyNDI0NTQyNCwicGhvbmUiOiIxMjM0NTY3ODkwIiwiYXV0aG9yaXRpZXMiOiJST0xFX1VTRVIifQ.vXihWnXeR0pEC7LgU2B8Yd-Lb6AdR7txyLrWQ8iHsN9l3QxHuVq_TnKtlGwYKBY_`,
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log(res.message)
          table.setTable(!table.table)
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
        }else {
          console.log(res.message)
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
        }})
  }
  
  return (
    <>
      {name == 'category' && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  No.
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Delete
                </h5>
              </div>
            </div>

            {categories.map((cat, key) => (
              <div
                className={`grid grid-cols-3 border-b border-stroke dark:border-strokedark`}
                key={key}
              >
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p>{key + 1}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p>{cat.name}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <button>
                    <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" />
                  </button>
                </div>
              </div>
            ))}
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
                  Contact
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Email
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Delete
                </th>
              </tr>

              {users.map((user, key) => (
                <tr className="text-center">
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
                    <button>
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

              {users.map((user, key) => (
                <tr className="text-center">
                  <td className="p-2.5 xl:p-5">
                    <p>{user.name}</p>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button>
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

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Update
                </th>

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Delete
                </th>
              </tr>
              {products.length <= 0 && 
                <tr className="text-center">
                  <td className="p-2.5 xl:p-5" colSpan="7">
                    <p>No product found.</p>
                  </td>
                </tr>
                  }
              {products.map((prod, key) => (
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
                        <img src={`https://meghainfocom-production.up.railway.app/api/products/image/${img}`} />
                      </SwiperSlide>
                      ))}
                    </Swiper>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button>
                      <FiEdit className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" onClick={()=> {handleOpen(); setId(prod.id)}}/>
                    </button>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button>
                      <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" onClick={() => handleDeleteProd(prod.id)} />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <FDialog name={"Product"} id={id} handleOpen={handleOpen} open={open} />
        </div>
      )}

      {name == 'user' && (
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

              {users.map((user, key) => (
                <tr className="text-center">
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
                    <button>
                      <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
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

                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase xsm:text-base">
                  Delete
                </th>
              </tr>

              {products.length <= 0 && 
                <tr className="text-center">
                  <td className="p-2.5 xl:p-5" colSpan="7">
                    <p>No product found.</p>
                  </td>
                </tr>
                  }
              {products.map((prod, key) => (
                <tr className="text-center" key={key}>
                  <td className="p-2.5 xl:p-5">
                    <input type="checkbox" className="h-4 w-4" checked />
                  </td>
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
                        <img src={`https://meghainfocom-production.up.railway.app/api/products/image/${img}`} />
                      </SwiperSlide>
                      ))}
                    </Swiper>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button>
                      <FiEdit className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" onClick={()=> {handleOpen(); setId(prod.id)}}/>
                    </button>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <button>
                      <RiDeleteBin6Line className="h-5 w-5 xl:h-6 xl:w-6 lg:h-6 lg:w-6" onClick={() => handleDeleteProd(prod.id)} />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default TableOne;
