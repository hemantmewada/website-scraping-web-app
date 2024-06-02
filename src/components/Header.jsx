import React from 'react'

const Header = ({url, setUrl, handleSubmit, loading}) => {
  return (
    <>
    <nav className="bg-white border-gray-200 shadow-lg shadow-gray-500/5">
      <div className="bg-white max-w-screen-2xl flex flex-wrap items-center justify-start mx-auto p-4">
        <form className="flex items-start bg-white" onSubmit={handleSubmit}>   
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='col-span-2 md:col-span-1'>
                    <div className="relative w-full bg-white">
                        <div className="bg-transparent absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg color='#6B7280' className="w-4 h-4 text-gray-" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input value={url} onChange={(e) => setUrl(e.target.value)} style={{ width: '350px' }}  placeholder="Enter domain name" type="url" id="voice-search" className="bg-[#F9FAFB] outline-none border border-[#E5E7EB] text-gray-900 text-sm block w-full ps-10 p-2.5 rounded-md" required />
                    </div>
                </div>
                <div className='col-span-2 md:col-span-1'>
                {
                    loading ? (
                        <button type="submit" className="flex flex-row items-center py-0 px-3 ms-2 w-full text-sm text-[#6C2BD9] bg-[#EDE5FF] rounded-md">
                            Please wait... <img src='/icons/spinner.gif' width={"40"} alt='loading state' className='bg-transparent' />
                        </button>
                    ) : (
                        <button type="submit" className="items-center py-2.5 px-3 ms-2 w-full text-sm text-[#6C2BD9] bg-[#EDE5FF] rounded-md">
                            Fetch & Save Details 
                        </button>
                    )
                }
                </div>
            </div>
        </form>
      </div>
    </nav>
    </>
  )
}

export default Header