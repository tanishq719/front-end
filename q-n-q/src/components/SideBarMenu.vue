<template>
    <div id="menu">
        <svg  @click="sidebarOn = !sidebarOn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/></svg>
        <div v-if="sidebarOn === true">
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Settings</li>
                <li>Subscribed To</li>
                <li>Notification</li>
                <li>Help</li>
                <li>Feedback</li>
                <li>Bookmarks</li>
                <li>Log out</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : "SideBarMenu",
    data : function() {
       return {
           sidebarOn : false
       }
    }
};
</script>

<style scoped>
    svg{
        min-width: 32px;
        max-width:32px;
    }
    #menu{
        padding:5px;
        width:fit-content;
        position:absolute;
    }
    ul{
        list-style: none;
        padding:2vh;
        margin:0%;
    }
</style>