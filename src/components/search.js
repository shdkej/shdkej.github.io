import React from "react"
import { Helmet } from "react-helmet"
const search = () => {
  return (
    <div>
      <Helmet>
        <style>{`
                .gsc-control-cse {
                    background-color: #2a2a2a !important;
                    border: none !important;
                    box-shadow: none !important;
                    margin-top: 1em !important;
                }
            `}</style>
        <script
          async
          src="https://cse.google.com/cse.js?cx=006752884906682281203:76xbe9wsd8h"
        ></script>
      </Helmet>
      <div className="gcse-search"></div>
    </div>
  )
}
export default search
