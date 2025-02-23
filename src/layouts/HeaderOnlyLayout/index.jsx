import Header from "../components/Header"

export default function DefaultLayout({children}) {
   return (
      <>
         <div className="container">
            <Header/>
            <main>
               {children}
            </main>
         </div>
      </>
   )
}