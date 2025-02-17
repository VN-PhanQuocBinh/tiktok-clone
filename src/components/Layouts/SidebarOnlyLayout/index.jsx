import Sidebar from "../components/Sidebar"

export default function SidebarOnlyLayout({children}) {
   return (
      <>
         <div className="container">
            <Sidebar/>
            <main>
               {children}
            </main>
         </div>
      </>
   )
}