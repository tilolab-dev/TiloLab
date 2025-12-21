<template>

    <section class="index_banner">

        <div class="container">

            <div class="banner_content">

                <h3 class="banner_title">
                    тут буде якийсь рекламний <br/> банер або просто картинка
                </h3>

                <span class="banner_description"> 
                    Щоб розбавити сторінку
                </span>

            </div>


        </div>



    </section>



</template>



<script setup>



</script>


<style lang="scss">

    .index_banner {
        width: 100%;
        height: 100dvh;
        position: relative;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('../public/images/index-img/banner.webp') lightgray 50% / cover no-repeat;

    }

    .banner_content{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
    }

    .banner_title {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        color: var(--text-color);

        @media screen and (max-width: 1024px) {
            font-size: 1.75rem;
        }

        @media screen and (max-width: 768px) {
            font-size: clamp(1.5rem, 3vw, 1.75rem);
        }

        @media screen and (max-width: 480px) {
            font-size: clamp(.9rem , 5vw, 1.5rem);
        }

    }

    .banner_description {
        color: var(--text-color);
        font-family: Montserrat;
        font-size: 1.125rem ;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: 0.36px;

        @media screen and (max-width: 768px) {
            font-size: 1.0625rem;
        }

        @media screen and (max-width: 480px) {
            font-size: .875rem;
        }
    }





</style>