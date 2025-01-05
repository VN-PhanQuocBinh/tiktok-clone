import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function DefaultLayout({children}) {
   return (
      <>
         <div className="container">
            <Header/>
            <Sidebar/>
            {children}
         </div>
      </>
   )
}