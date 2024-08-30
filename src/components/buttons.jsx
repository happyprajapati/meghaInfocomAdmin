import { useState } from "react";
import FDialog from "./dialog";

export default function Buttons({name}){
    const [open, setOpen] = useState(false);    

    const handleOpen = () => setOpen(!open);

    return(
        <>
            {name == "Employee" && 
            <>
            <div className="w-full flex items-center justify-center my-3">
            <button
              className="w-fit my-1 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleOpen}
              variant="gradient"
            >
              Add {name}
            </button>
          </div>
          <FDialog name={"Employee"} id={''} handleOpen={handleOpen} open={open} /></>}

          {name == "Product" && 
            <>
            <div className="w-full flex items-center justify-center my-3">
            <button
              className="w-fit my-1 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleOpen}
              variant="gradient"
            >
              Add {name}
            </button>
          </div>
          <FDialog name={"Product"} id={''} handleOpen={handleOpen} open={open} /></>}
        </>
    )
}