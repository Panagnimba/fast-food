<template>
     <!-- HOME    FOODS    CART  AND CONTACT INFO-->
    <div class="flex justify-evenly items-center w-2/4 menuBar text-primary h-14" id="mediaMenu">
        <ul v-for="(item, i) in menu.items" :key="i" class="flex h-full items-center">
            <li class="relative text-primary h-full flex items-center first">
                <router-link class="font-bold text-xl flex justify-between items-center" :to="item.url">{{ item.text }}<span v-if="item.childrens.length > 0" class="m-1">&#8250;</span></router-link>
                <ul class="z-20 sub-menu-1 bg-white" v-if="item.childrens.length > 0">
                    <li class="relative w-full" v-for="(level1,i) in item.childrens" :key="i">
                        <router-link class="font-bold item w-full flex justify-between items-center" :to="level1.url">{{ level1.text }}<span v-if="level1.childrens.length > 0" >&#8250;</span></router-link>
                            <ul class="z-20 bg-white child" v-if="level1.childrens.length > 0">
                                <li class="relative w-full" v-for="(child,ii) in level1.childrens" :key="ii">
                                    <router-link class=" font-bold item w-full flex justify-between items-center" :to="child.url">{{ child.text }}<span v-if="child.childrens.length > 0" >&#8250;</span></router-link>
                                        <ul class="z-20 bg-white child" v-if="child.childrens.length > 0">
                                            <li class="relative w-full" v-for="(child,ii) in child.childrens" :key="ii">
                                                <router-link class=" font-bold item w-full flex justify-between items-center" :to="child.url">{{ child.text }}<span v-if="child.childrens.length > 0" >&#8250;</span></router-link>
                                                 <ul class="z-20 bg-white child" v-if="child.childrens.length > 0">
                                                    <li class="relative w-full" v-for="(child,ii) in child.childrens" :key="ii">
                                                        <router-link class=" font-bold item w-full flex justify-between items-center" :to="child.url">{{ child.text }}<span v-if="child.childrens.length > 0" >&#8250;</span></router-link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                </li>
                            </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            menu: this.$settings.sections.header.menu,
        }
    }
}
</script>
<style scoped>
 @media screen and (max-width: 1250px){
        #mediaMenu{
            display: none;
        }
    }

    /* MENU STYLE */
    .menuBar{
        font-family: "Rubik";
    }
.menuBar .first :hover > span {
    transform: rotate(90deg);
}
.menuBar ul li .item {
    min-width: 100%;
    height: 100%;
    text-align: center;
    padding: 10px;
}

.menuBar ul li ul li:hover > .item{
     background-color: var(--primary-color);
     color:white;
}
.menuBar .item{
    border-bottom: 1px solid rgb(247, 244, 244);
}
.sub-menu-1 ,
.child{
    min-width: 100%;
    width: 150px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    /* gap: 10px; */
    list-style-type: none;
    position: absolute;
    display: none;
    border: 1px solid rgb(224, 223, 223);
    background-color: white;
}
.menuBar .sub-menu-1{
    left: 0;
    top: 100%;
}
.menuBar .child{
    top: 0%;
    left: 100%;
}

.menuBar li:hover>.sub-menu-1 {
    display: flex;
}
.menuBar li:hover>.child {
    display: flex;
}
</style>