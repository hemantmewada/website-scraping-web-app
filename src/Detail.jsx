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
                            <p>{data.phone ? data.phone : "NA"}</p>
                        </div>
                        <div>
                            <div className='flex flex-row gap gap-2 items-center'>
                                <img src="/icons/mail-search.svg" alt="" />
                                Email
                            </div>
                            <p>{data.email ? data.email : "NA"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div className="flex flex-col w-full px-2 mt-2 mx-2 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-4">
                {/* first */}
                <div className="col-span-2 md:col-span-1 pt-0 mt-4 mr-1">
                    <div className='w-full bg-white border-gray-200 p-4 mt-2 mx-2 rounded-lg'>
                        <h1 className='font-bold text-xl'>Company Details</h1>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/globe.svg" alt="" />
                                Website
                            </div>
                            <p>{data.url}</p>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/detail.svg" alt="" />
                                Description
                            </div>
                            <p>{data.description}</p>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/mail-search.svg" alt="" />
                                Email
                            </div>
                            <p>{data.email}</p>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/facebook-1.svg" alt="" />
                                Facebook
                            </div>
                            <p>{data.fb}</p>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/instagram.svg" alt="" />
                                Instagram
                            </div>
                            <p>{data.insta}</p>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/twitter-1.svg" alt="" />
                                Twitter
                            </div>
                            <p>{data.twitter}</p>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/linkedin-1.svg" alt="" />
                                Linkedin
                            </div>
                            <p>{data.linkedin}</p>
                        </div>
                        <div className='mt-4 pb-2'>
                            <div className='flex flex-row gap gap-2 items-center text-[#778599]'>
                                <img src="/icons/location-marker.svg" alt="" />
                                Address
                            </div>
                            <p>{data.address}</p>
                        </div>
                    </div>
                </div>
                {/* second */}
                <div className="col-span-2 md:col-span-2 pt-0 mt-4">
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