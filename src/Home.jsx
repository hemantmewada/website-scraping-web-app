import Header from "./components/Header";
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";
import axios from 'axios';
import config from "./config/config";
import { toast } from "react-toast";
import { Link } from "react-router-dom";

const CustomSocial = ({row}) => {
  return (
    <>
        <a href={row.fb}><img src="/icons/Facebook.svg" alt="fb icon" width={30} /></a>
        <a href={row.twitter} target="_blank"><img src="/icons/Twitter.svg" alt="twitter icon" width={30} /></a>
        <a href={row.linkedin} target="_blank"><img src="/icons/LinkedIn.svg" alt="linkedin icon" width={30} /></a>
    </>
  )
}


const Company = ({row}) => {
  return (
    <>
        <Link to={`/detail/${row._id}`} className="flex flex-row">
            <div className="w-8">
                <img src={row?.icon} alt="" width={30} />
            </div>
            {row.title}
        </Link>
    </>
  )
}

const columns = [
	{
		name: 'COMPANY',
		selector: row => row.title,
        sortable: true,
        // maxWidth: '200px',
        cell: row => <Company row={row} />,
	},
	{
		name: 'SOCIAL PROFILES',
		selector: row => "all social data",
        sortable: true,
        cell: row => <CustomSocial row={row} />,
	},
	{
		name: 'DESCRIPTION',
		selector: row => row.description,
        sortable: true,
	},
	{
		name: 'ADDRESS',
		selector: row => "some address",
        sortable: true,
	},
	{
		name: 'PHONE NO.',
		selector: row => row.phone,
        sortable: true,
	},
	{
		name: 'EMAIL',
		selector: row => row.email,
        sortable: true,
	},
];

const Home = () => {
    // const [selectedRows, setSelectedRows] = React.useState([]);
    // const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [getDataLoading, setGetDataLoading] = useState(false);
    
    const [data, setData] = useState([]);
    const handleClearRows = () => {
      setToggleClearRows(!toggledClearRows);
    }
    // const handleChange = ({ selectedRows }) => {
    //   // You can set state or dispatch with something like Redux so we can use the retrieved data
    //   console.log('Selected Rows: ', selectedRows);
    // };
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        setGetDataLoading(true);
        const {data} = await axios.get(`${config.API_URL}/website-scrape-list`);
        setData(data?.data);
        setGetDataLoading(false);
      } catch (error) {
        setGetDataLoading(false);
        console.log(`Error ----${error}`);
      }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        scrapeWebsite();
    }
    const scrapeWebsite = async () => {
        setLoading(true);
        try {
            const { data: apiData } =  await axios.post(`${config.API_URL}/website-scrape`,{url});
            setData([...data, apiData?.data]);
            setUrl("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(`Error in api call ${error}`);
            toast.hideAll();
            toast.error(error.response?.data.message);
        }
    }
    
  return (
    <>
        <Header url={url} setUrl={setUrl} handleSubmit={handleSubmit} loading={loading} />
        <nav className="bg-white border-gray-200 shadow-lg shadow-gray-500/5 p-4 mt-2 mx-2 rounded-lg">
            <div className="bg-white flex flex-wrap items-center justify-start mx-auto">
                <div className="flex flex-row bg-white gap-10 items-center">
                    <div className="bg-white"><p className="bg-white text-[#334155]">0 selected</p></div>
                    <div className="flex flex-row gap-5 bg-white">
                        <button className="border-2 border-[#ECECEC] px-4 py-2 rounded-md text-[#A2A2A2]">Delete</button>
                        <CSVLink className="bg-white" data={data} filename="website-scrapes-data.csv">
                            <button className="flex flex-row items-center gap-2 border-2 border-[#ECECEC] px-4 py-2 rounded-md text-[#A2A2A2]">
                                    <img className="bg-white" src="/icons/list-plus.svg" alt="" />Export as CSV
                            </button>
                        </CSVLink>
                        {/* {selectedRows?.length > 0 && <button className="border-2 border-[#ECECEC] px-4 py-2 rounded-md text-[#A2A2A2]">CLEAR</button>} */}
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className='bg-white main-table'>
                    {/* <button onClick={handleClearRows}>Clear Selected Rows</button> */}
                    {
                      getDataLoading ? (
                        <div className="w-full text-center flex justify-center ">
                          <img src="/icons/spinner.gif" width={"5%"} alt="" />
                        </div>
                      ) : (
                        <DataTable
                            columns={columns}
                            data={data}
                            // selectableRows
                            // onSelectedRowsChange={handleChange}
                            pagination
                            // clearSelectedRows={toggledClearRows}
                            // expandableRows
                            // expandableRowsComponent={ExpandedComponent}
                        />
                      )
                    }
                </div>
            </div>
        </nav>
    </>
  )
}

export default Home