import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { City } from 'country-state-city';
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import { Bounce, toast } from 'react-toastify';
import { HiMiniXMark } from 'react-icons/hi2';
import { tableContext } from '../context/context';

export default function FDialog({ name, handleOpen, open, id }) {
  const [city, setCity] = useState([]);
  const [message, setMsg] = useState('');
  const [images, setImages] = useState([]);
  const [cat, setCat] = useState([]);
  const [prod, setProd] = useState([
    { title: '', modelNo: '', description: '', category: { id: '', name: '' } },
  ]);
  const [prodEdit, setProdEdit] = useState(false);
  const table = useContext(tableContext);
  const initialState = {
    name: '',
    city: '',
    phone: '',
    password: '',
  };
  const [empData, setEmpData] = useState(initialState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // const onFileSelect = (e) => {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (!images.some((e) => e.name == files[i].name)) {
  //       setImages((pre) => [
  //         ...pre,
  //         {
  //           name: files[i].name,
  //           url: URL.createObjectURL(files[i]),
  //         },
  //       ]);
  //     }
  //   }
  // };

  // const { register, handleSubmit } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (!images.some((e) => e.name == files[i].name)) {
        setImages((pre) => [
          ...pre,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
    setSelectedFiles(files);
  };

  const handleRemoveImg = (index) => {
    // console.log("fileToRemove: ",fileToRemove)
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i != index));
    setImages((pre) => pre.filter((_, i) => i != index));
    // console.log(selectedFiles)
    // console.log(images)
  };

  useEffect(() => {
    // console.log(images);
    console.log(selectedFiles);
    console.log(images);
  }, [images]);

  useEffect(() => {
    console.log(id);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/category/`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setCat(res.data.content);
      });

    setCity(City.getCitiesOfState('IN', 'GJ'));
  }, []);

  useEffect(() => {
    console.log(id);
    if (id === '') {
      setProdEdit(false);
    } else {
      console.log(name);
      console.log('hello form inside');
      setProdEdit(true);
      fetch(`${import.meta.env.VITE_BASE_URL}/api/products/id/${id}`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data.category.id);
          setProd(res.data);
        });
    }
  }, [id]);

  // const removeImage = (index) => {
  //   console.log(index);
  //   setImages((pre) => pre.filter((_, i) => i != index));
  //   console.log(register('images'));
  // };

  const handleProdChange = (e) => {
    setProd({
      ...prod,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmpChange = (e) => {
    setEmpData((emp) => ({
      ...emp,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    // fetch("https://universal-workflow-management-production.up.railway.app/api/manager/room/", {
    //   method: "POST",
    //   body: JSON.stringify(empData),
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.success) {
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
    handleOpen();
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

  const handleAddEmp = (e) => {
    e.preventDefault();
     fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/addemp`, {
       method: 'POST',
       body: JSON.stringify(empData),
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
           console.log(table.table);
           setEmpData(initialState);
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
           handleOpen();
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
           handleOpen();
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
         handleOpen();
       });
  };

  //  const handleRemoveImg = (formData) =>{
  //    console.log("formData")
  //    console.log(formData)
  //  }

  const handleProduct = (formData) => {
    const productData = new FormData();

    productData.append('title', formData.title);
    productData.append('modelNo', formData.modelNo);
    productData.append('category.id', formData.category);
    productData.append('description', formData.description);

    selectedFiles.forEach((file) => {
      productData.append('images', file);
    });

    fetch(
      prodEdit
        ? `${import.meta.env.VITE_BASE_URL}/api/products/${prod.id}`
        : `${import.meta.env.VITE_BASE_URL}/api/products/`,
      {
        method: prodEdit ? 'PUT' : 'POST',
        body: productData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          // 'Content-Type': prodEdit ? 'application/json' : '',
          'Access-Control-Allow-Origin': '*',
          // "type": "formData"
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          reset({ ...formData });
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
          handleOpen();
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
          handleOpen();
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
        handleOpen();
      });
  };

  return (
    <>
      {name == 'Employee' && (
        <>
          <Dialog open={open} handler={handleOpen} className="dark:bg-boxdark">
            <DialogHeader className="flex justify-center dark:text-gray">
              Add {name}
            </DialogHeader>
            <DialogBody>
              {message && (
                <div className="flex justify-center w-full my-2 p-2 border border-[#dc2626] bg-[#fecaca] rounded-md">
                  <span className="text-[#16a34a]">{message}</span>
                </div>
              )}
              <form className="w-full lg:px-5 md:px-5 dark:text-gray">
                <div className="flex flex-col gap-y-1 my-2">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    onChange={handleEmpChange}
                  />
                </div>
                <div className="flex flex-col gap-y-1 my-2">
                  <span>Name</span>
                  <select
                    name="city"
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    onChange={handleEmpChange}
                  >
                    <option className="py-2">Select City</option>
                    {city.map((city, key) => (
                      <option value={city.name} key={key} className="py-2" >
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-y-1 my-2">
                  <span>Contact</span>
                  <input
                    type="tel"
                    name="phone"
                    pattern="[0-9]{10}"
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    onChange={handleEmpChange}
                  />
                </div>
                <div className="flex flex-col gap-y-1 my-2">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    onChange={handleEmpChange}
                  />
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    type="submit"
                    className="bg-blue-500 px-8 text-white px-3 py-2 rounded-lg"
                    onClick={handleAddEmp}
                  >
                    Add
                  </button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
        </>
      )}

      {name == 'Product' && (
        <>
          <Dialog
            open={open}
            handler={handleOpen}
            className="h-screen overflow-y-auto dark:bg-boxdark"
          >
            <DialogHeader className="flex justify-center pb-2 dark:text-gray">
              Add {name}
            </DialogHeader>
            <DialogBody>
              <form
                className="w-full lg:px-5 md:px-5 dark:text-gray"
                encType="multipart/form-data"
                onSubmit={handleSubmit(handleProduct)}
              >
                <div className="flex flex-col gap-y-1">
                  <span>Title</span>
                  <input
                    {...register('title')}
                    type="text"
                    name="title"
                    value={prod.title}
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    onChange={handleProdChange}
                  />
                </div>
                <div className="flex flex-col gap-y-1 my-2">
                  <span>model No.</span>
                  <input
                    {...register('modelNo')}
                    type="text"
                    name="modelNo"
                    value={prod.modelNo}
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    onChange={handleProdChange}
                  />
                </div>
                <div className="flex flex-col gap-y-1 my-2">
                  <span>Category</span>
                  <select
                    {...register('category')}
                    value={prod?.category?.id}
                    name="category"
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <option className="py-2">Select Category</option>
                    {cat.map((cat, key) => (
                      <option value={cat.id} key={key} className="py-2">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-y-1 my-2">
                  <span>Description</span>
                  <textarea
                    {...register('description')}
                    rows={5}
                    cols={30}
                    value={prod.description}
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="description"
                    onChange={handleProdChange}
                  />
                </div>
                <div className="flex flex-col gap-y-1 my-2">
                  <span>Add Image</span>
                  {/* <input
                  {...register("images")}
                    type="file"
                    name="images"
                    className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    multiple
                    onChange={onFileSelect}
                    title=" "
                  /> */}
                  <span className="relative cursor-pointer rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                    Choose File
                    <input
                      id="images"
                      {...register('images')}
                      type="file"
                      name="images"
                      className="absolute opacity-0 left-0 top-0"
                      multiple
                      onChange={onFileSelect}
                    />
                  </span>
                  {/* <label htmlFor="images" className="rounded-lg border border-stroke bg-white p-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                    Choose File
                  </label>
                  <input
                    id="prod_img"
                    {...register('prod_img')}
                    type="file"
                    name="prod_img"
                    // className="hidden"
                    multiple
                    onChange={onFileSelect}
                  /> */}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {images &&
                    images.map((image, index) => (
                      <div key={index} className="">
                        <div className="flex flex-row justify-between px-2">
                          <p>{image.name}</p>
                          <HiMiniXMark
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                              handleRemoveImg(index);
                            }}
                          />
                        </div>
                        <img
                          src={image.url}
                          alt="preview"
                          className="h-30 mx-auto object-contain mb-2"
                        />
                      </div>
                    ))}
                  {prod.imageNames &&
                    prod.imageNames.map((image, index) => (
                      <div key={index} className="">
                        <div className="flex flex-row justify-between px-2">
                          <p>{image}</p>
                          <HiMiniXMark
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => {
                              handleRemoveImg(index);
                            }}
                          />
                        </div>
                        <img
                          src={`${
                            import.meta.env.VITE_BASE_URL
                          }/api/products/image/${image}`}
                          alt="preview"
                          className="h-30 mx-auto object-contain mb-2"
                        />
                      </div>
                    ))}
                </div>
                <div className="flex justify-center my-5">
                  {prodEdit ? <button
                    // type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 px-8 text-white px-3 py-2 rounded-lg disabled:bg-[#38bdf8] disabled:cursor-not-allowed"
                  >
                  {isSubmitting
                        ? 'Updating...'
                        : 'Update'}
                  </button>
                  :
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 px-8 text-white px-3 py-2 rounded-lg disabled:bg-[#38bdf8] disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? 'Adding...'
                      : 'Add'}
                  </button>}
                </div>
              </form>
            </DialogBody>
          </Dialog>
        </>
      )}
    </>
  );
}
