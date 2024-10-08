// @ts-nocheck
import { useState, useEffect, useContext, useRef } from 'react';
import { Bounce, toast } from 'react-toastify';
import slider from './../images/slider1.jpg';
import { tableContext } from '../context/context';

export default function OneFormField({ name }) {
  const fileInputRef = useRef(null);
  const [catName, setCatName] = useState('');
  const [sliderImg, setSliderImg] = useState('');
  const [title, setTitle] = useState('');
  const [data, setData] = useState([]);
  const [preview, setPreview] = useState('');
  const table = useContext(tableContext);

  useEffect(() => {
    // fetch(
    //   "#",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       // authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.success) {
    //       setCatName(res.data);
    //     } else {
    //       setMsg(res.message);
    //     }
    //   }).catch((err) => {
    //     console.log(err);
    //     setMsg(`Error Occured : ${err}`);
    //   });
    // fetch(
    //   "#",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       // authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.success) {
    //       setData(res.data);
    //     } else {
    //       setMsg(res.message);
    //     }
    //   }).catch((err) => {
    //     console.log(err);
    //     setMsg(`Error Occured : ${err}`);
    //   });
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_BASE_URL}/api/category/`, {
      method: 'POST',
      body: JSON.stringify({ name: catName }),
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
          setCatName('');
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

  const handleAddTitle = (e) => {
    e.preventDefault();

    // fetch("https://universal-workflow-management-production.up.railway.app/api/manager/room/", {
    //   method: "POST",
    //   body: JSON.stringify({title: title}),
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.success) {
      table.setTable(!table.table)
    toast.success('res.message', {
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
    // } else {
    //   toast.error(res.message, {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    // });
    // }
    // })
    // .catch((err) => {
    //   setMsg(err);
    // });
  };

  const handleAddSliderImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', sliderImg);

    fetch(`${import.meta.env.VITE_BASE_URL}/api/slider/`, {
      method: 'POST',
      body: formData,
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        // "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        // "type": "formData"
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          table.setTable(!table.table);
          fileInputRef.current.value = '';
          setPreview('')
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
        setMsg(err);
      });
  };

  return (
    <>
      {name == 'category' && (
        <div className="w-full flex items-center justify-center my-3 gap-x-3">
          <input
            type="text"
            placeholder="Enter Category"
            className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={catName}
            onChange={(e) => {
              setCatName(e.target.value);
            }}
          />
          <button
            className="w-fit my-1 px-4 py-2 bg-blue-500 text-white rounded-md"
            variant="gradient"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      )}

      {name == 'title' && (
        <div className="w-full flex items-center justify-around justify-center my-3 gap-x-3 rounded-md border border-gray-400 border-stroke p-2">
          <label className="flex flex-col sm:flex-row md:flex-row gap-x-2 mb-1 ml-1 font-medium text-lg text-black dark:text-white">
            {/* <p>Current Title: </p><p>{name}</p> */}
            <p>Current Title: </p>
            <p>Top Trending</p>
          </label>
          <div>
            <input
              type="text"
              placeholder="Enter Title"
              className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <button
              className="w-fit mx-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              variant="gradient"
              onClick={handleAddTitle}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {name == 'images' && (
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={handleAddSliderImg}
        >
          <div className="w-full flex items-center justify-center my-3 gap-x-3">
            <input
              type="file"
              // value={sliderImg}
              ref={fileInputRef}
              className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={(e) => {
                setPreview(URL.createObjectURL(e.target.files[0]));
                setSliderImg(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
            <button
              className="w-fit my-1 px-4 py-2 bg-blue-500 text-white rounded-md"
              variant="gradient"
              type="submit"
              // onClick={handleAddSliderImg}
            >
              Add
            </button>
          </div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-40 w-full mx-auto object-contain mb-2"
            />
          )}
        </form>
      )}
    </>
  );
}
