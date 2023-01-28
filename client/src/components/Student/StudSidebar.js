import React from 'react'
import "../../assets/styles/css/StudSidebar.module.css"

const StudSidebar = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_toggle}>
          <i class="fas fa-bars"></i>    
        </div>  
      </header>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <div>
            <a href="" className={styles.nav_logo}></a>
          </div>
        </nav>        
      </aside>
    </>
  )
}

export default StudSidebar