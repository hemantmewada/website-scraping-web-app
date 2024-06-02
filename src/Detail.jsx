import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './components/Header';
import axios from 'axios';
import { toast } from 'react-toast';
import config from './config/config';
import { CSVLink } from 'react-csv';
import { short } from './helpers/commonHelper';

const Detail = () => {
    const {_id} = useParams();
    // console.log(_id);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        scrapeWebsiteSingle();
    }, [_id])
    
    const scrapeWebsiteSingle = async () => {
        setLoading(true);
        try {
            const { data: apiData } =  await axios.get(`${config.API_URL}/website-scrape-single/${_id}`);
            setData(apiData?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(`Error in api call ${error}`);
            toast.hideAll();
            toast.error(error.response?.data.message);
        }
    }

  return (
    <div className='detail'>
        <Header url={url} setUrl={setUrl} handleSubmit={handleSubmit} loading={loading} />
        <nav className="bg-white border-gray-200 p-4 mt-2 mx-2 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-4">
                <div className="col-span-3 md:col-span-1">
                    <img src={data.icon} alt="" width={100} />
                </div>
                <div className="col-span-3 md:col-span-3 border-r border-[#ECECEC]">
                    <div className='pr-5'>
                        <h1 className='text-[#374151] font-bold text-3xl'>{data.title}</h1>
                        <div className='flex flex-row gap gap-2 items-center'>
                            <img src="/icons/detail.svg" alt="" />
                            Description
                        </div>
                        <p>{short(data.description, 150)}</p>
                    </div>
                </div>
                <div className="col-span-3 md:col-span-5">
                    <div className='mt-10 md:pl-5 flex flex-col gap-5'>
                        <div>
                            <div className='flex flex-row gap gap-2 items-center'>
                                <img src="/icons/phone-call.svg" alt="" />
                                Phone
                            </div>
                            <p>{data.phone}</p>
                        </div>
                        <div>
                            <div className='flex flex-row gap gap-2 items-center'>
                                <img src="/icons/mail-search.svg" alt="" />
                                Email
                            </div>
                            <p>{data.email ? data.email : "Not Available"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div className="flex flex-col w-full pt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-4">
                {/* first */}
                <div className="col-span-2 md:col-span-1 pt-0 mt-8">
                    <div className='w-full bg-white border-gray-200 p-4 mt-2 mx-2 rounded-lg'>
                        <h1 className='font-bold text-xl'>Company Details</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam sunt non fugiat dolores obcaecati commodi soluta fugit placeat, a explicabo voluptatum, architecto quibusdam voluptatem optio, rerum deleniti ipsum. Quis, dicta?
                        Vero perferendis ex vel,  voluptatum officia veniam ratione modi natus hic expedita dolorem nostrum dolor quis ducimus perspiciatis asperiores eveniet. Voluptate numquam in alias modi totam provident nulla! Minima!
                        Distinctio porro accusamus laboriosam autemetur adipisicing elit. Quisquam sunt non fugiat dolores obcaecati commodi soluta fugit placeat, a explicabo voluptatum, architecto quibusdam voluptatem optio, rerum deleniti ipsum. Quis, dicta?
                        Vero perferendis ex vel,  voluptatum officia veniam ratione modi natus hic expedita dolorem nostrum dolor quis ducimus perspiciatis asperiores eveniet. Voluptate numquam in alias modi totam provident nulla! Minima!
                        Distinctio porro accusamus laboriosam autemetur adipisicing elit. Quisquam sunt non fugiat dolores obcaecati commodi soluta fugit placeat, a explicabo voluptatum, architecto quibusdam voluptatem optio, rerum deleniti ipsum. Quis, dicta?
                        Vero perferendis ex vel,  voluptatum officia veniam ratione modi natus hic expedita dolorem nostrum dolor quis ducimus perspiciatis asperiores eveniet. Voluptate numquam in alias modi totam provident nulla! Minima!
                        Distinctio porro accusamus laboriosam autemetur adipisicing elit. Quisquam sunt non fugiat dolores obcaecati commodi soluta fugit placeat, a explicabo voluptatum, architecto quibusdam voluptatem optio, rerum deleniti ipsum. Quis, dicta?
                        Vero perferendis ex vel,  voluptatum officia veniam ratione modi natus hic expedita dolorem nostrum dolor quis ducimus perspiciatis asperiores eveniet. Voluptate numquam in alias modi totam provident nulla! Minima!
                        Distinctio porro accusamus laboriosam autemetur adipisicing elit. Quisquam sunt non fugiat dolores obcaecati commodi soluta fugit placeat, a explicabo voluptatum, architecto quibusdam voluptatem optio, rerum deleniti ipsum. Quis, dicta?
                        Vero perferendis ex vel,  voluptatum officia veniam ratione modi natus hic expedita dolorem nostrum dolor quis ducimus perspiciatis asperiores eveniet. Voluptate numquam in alias modi totam provident nulla! Minima!
                        Distinctio porro accusamus laboriosam autem sequi! Suscipit ipsam, enim repellat iusto esse quae eveniet provident earum dicta accusamus, ad tenetur harum magni illo obcaecati, rem ratione. Necessitatibus autem officia ab!</p>
                    </div>
                </div>
                {/* second */}
                <div className="col-span-2 md:col-span-2 pt-0 mt-8">
                    <div className='w-full bg-white border-gray-200 p-4 mt-2 mx-2 rounded-lg'>
                        <div className='flex flex-row gap-2'>
                            <img src="/icons/camera.svg" alt="" />
                            <h1 className='font-bold text-xl'>Screenshot of Webpage</h1>
                        </div>
                        <iframe src={data.url} width={"100%"} frameborder="0" height={1000}></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Detail