import React,{ useState } from 'react'
import { useQuery } from 'react-query'
import Products from './components/Products'
import getMessage from './fetching/getMessage'
import Header from './Header'



const App = (props) => {
  
  const [inStockOnly,setInStockOnly] = useState(false);
  
  const toggleInStockOnly = () => { setInStockOnly((state) => !state)}


  const { isLoading,data,isError,error } = useQuery("message",getMessage,{
    select: (data)=> data.data.message
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error.message}</div>
  }

  return <div className="bg-blue-200 h-screen flex flex-col overflow-hidden">
    <Header message={data} className=" flex justify-center py-4 text-6xl" />
    <div className="bg-blue-100 m-4 rounded-lg shadow-blue-200 p-4 flex justify-center items-center">
      <span className="mr-2">Only Buyable?</span>
      <input type="checkbox" onChange={toggleInStockOnly} value={inStockOnly} className="accent-orange-300 flex justify-center items-center" />
    </div>
    <Products inStockOnly={inStockOnly} /></div>
}

export default App
