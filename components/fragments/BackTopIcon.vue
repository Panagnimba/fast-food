<template>
    <div id="back_top">
        <a id="back_top_button" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path fill="white" d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"/>
            </svg>
        </a>
    </div>
</template>
<script>
export default {
   
   mounted(){

      let icon = document.querySelector("#back_top");
      window.addEventListener('scroll', (e)=>{
            if(window.scrollY > 300){
                icon.classList.add('show');
            }else{
                icon.classList.remove('show');
            }
      });
    },
}
</script>
<style scoped>

.show{

    background: var(--primary-color);
    border-radius: 100%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-transition: visibility 500ms ease-in-out;
    transition: visibility 500ms ease-in-out;
    
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 10;
    overflow: hidden;

    visibility: visible;
}
.show:hover{
    background-color: #253237;
    box-shadow: 2px 0px 20px #fff;
}
#back_top a{
    height: 100%;
    color: #fff;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* font-weight: bold; */
}


</style>