<template>
    <section>
        <!-- HELLO WORLD -->

        <button
            class="auth-btn"
            @click="modalStore.showModal('AuthModal')"
        >

            Auth modal


        </button>
    </section>
</template>



<script setup>

import { useModalStore } from '@/store/modal-store';


const modalStore = useModalStore();







</script>


<style lang="scss">

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