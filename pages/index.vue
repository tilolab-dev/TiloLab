<template>
    <section class="index_page">
        <!-- HELLO WORLD -->
         <!-- <SharedTransparentBtn
            @click="console.log('ololo')"
         >accent btn</SharedTransparentBtn>

        <button
            class="auth-btn"
            @click="modalStore.showModal('AuthModal')"
        >

            Auth modal


        </button> -->
        <IndexHero/>
        <IndexCategories/>
        <IndexBanner/>
        <IndexCta/>
    </section>
</template>



<script setup>

import { useModalStore } from '@/store/modal-store';


const modalStore = useModalStore();







</script>


<style lang="scss">

    // .index_page .accent_btn{
    //     width: 100% ;
    // }

.auth-btn{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid black;
    padding-inline: 1rem;
    cursor: pointer;
}

</style>