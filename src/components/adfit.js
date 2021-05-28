import React from "react"
import { Helmet } from "react-helmet"
const adfit = () => {
    let content = `
          <ins class="kakao_ad_area" style="display:none;"
             data-ad-unit    = "DAN-8kcwh9PkiEKCxwsq"
             data-ad-width   = "728"
             data-ad-height  = "90"></ins>
            `
    if ( window.matchMedia( '( max-width: 727px )' ).matchs === true ) {
        content = `
          <ins class="kakao_ad_area" style="display:none;"
             data-ad-unit    = "DAN-PwPSwG3YNqBWNa85"
             data-ad-width   = "320"
             data-ad-height  = "50"></ins>
             `
    }

    return (
        <div>
        <Helmet>
          <script type="text/javascript" async src="//t1.daumcdn.net/kas/static/ba.min.js"></script>
        </Helmet>
        <div
            style={{
                textAlign:"center"
            }}
            dangerouslySetInnerHTML={{
                __html: content
            }}/>
        </div>
    )
}
export default adfit
